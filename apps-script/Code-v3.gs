/**
 * ENTRADA DE LEADS - AMBIENTAL HIGIENE | DROS AGENCIA  (v3 - com CRM Dros)
 * Fluxo: Site (empresas.ambientalhigiene.com.br) -> Apps Script -> Planilha + CRM Dros
 *
 * DIFERENCA v3 vs v2:
 *  - Agora envia pro CRM Dros (v2 so gravava na planilha)
 *  - Adiciona 2 colunas: CRM status + CRM resposta (pra debug)
 *  - Tags automaticas no CRM por Funcionarios e Produtos
 *  - source_detail rico no card do lead (Empresa | Funcionarios | Produtos | Cidade)
 *
 * DEPLOY:
 *  1. Abre a planilha "ENTRADA DE LEADS - AMBIENTAL HIGIENE"
 *  2. Extensoes -> Apps Script
 *  3. Substitui todo Code.gs por este
 *  4. Salva (Ctrl+S)
 *  5. Deploy -> Gerenciar deploys -> editar deploy atual -> Nova versao
 *  6. URL do web app permanece igual, so troca a versao interna
 */

// ============= CONFIG =============
var SHEET_NAME = 'LANDING PAGE EMPRESAS';

// SLUG do CRM Dros — confirmar rodando no VPS Dros:
// sqlite3 /root/crm/server/data/crm.db "SELECT id, name, slug FROM accounts WHERE name LIKE '%ambiental%';"
var CRM_URL   = 'https://drosagencia.com.br/crm/api/webhooks/sheets/ambiental-comercio-servicos-e-locacao-de-equipamentos-ltda';
var CRM_TOKEN = ''; // /sheets nao exige token
var LEAD_TAG  = 'LP Empresas';

// Ordem das colunas (key bate com o JSON enviado pelo site)
var COLUMNS = [
  // === DADOS DO FORM ===
  { key: 'timestamp', label: 'Data/Hora' },
  { key: 'nome', label: 'Nome' },
  { key: 'empresa', label: 'Empresa' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'cidade', label: 'Cidade / Bairro' },
  { key: 'funcionarios', label: 'Funcionarios' },
  { key: 'produtos', label: 'Produtos' },
  { key: 'origem', label: 'Origem' },
  // === ATRIBUIÇÃO UTM ===
  { key: 'utm_source', label: 'UTM Source' },
  { key: 'utm_medium', label: 'UTM Medium' },
  { key: 'utm_campaign', label: 'UTM Campaign' },
  { key: 'utm_content', label: 'UTM Content' },
  { key: 'utm_term', label: 'UTM Term' },
  { key: 'utm_id', label: 'UTM ID' },
  // === CLICK IDs (anúncios) ===
  { key: 'fbclid', label: 'Facebook (fbclid)' },
  { key: 'gclid', label: 'Google Ads (gclid)' },
  { key: 'gbraid', label: 'Google (gbraid)' },
  { key: 'wbraid', label: 'Google (wbraid)' },
  { key: 'ttclid', label: 'TikTok (ttclid)' },
  { key: 'msclkid', label: 'Microsoft (msclkid)' },
  { key: 'li_fat_id', label: 'LinkedIn (li_fat_id)' },
  { key: 'twclid', label: 'Twitter/X (twclid)' },
  // === COOKIES DE TRACKING ===
  { key: 'fbp', label: 'Facebook _fbp' },
  { key: 'fbc', label: 'Facebook _fbc' },
  { key: 'ga_cid', label: 'GA Client (_ga)' },
  { key: 'gcl_au', label: 'Google _gcl_au' },
  // === META PIXEL ===
  { key: 'fb_event_id', label: 'Meta Event ID' },
  // === ATRIBUIÇÃO DE PÁGINA ===
  { key: 'first_referrer', label: 'First Referrer' },
  { key: 'first_landing_url', label: 'First Landing URL' },
  { key: 'first_visit_at', label: 'First Visit At' },
  { key: 'current_url', label: 'Current URL' },
  { key: 'current_referrer', label: 'Current Referrer' },
  // === BROWSER ===
  { key: 'user_agent', label: 'User Agent' },
  { key: 'language', label: 'Language' },
  { key: 'screen', label: 'Screen Resolution' },
  { key: 'timezone', label: 'Timezone' },
  { key: 'submit_at', label: 'Submit At (Cliente)' },
  // === CRM DROS (v3 - NOVO) ===
  { key: 'crm_status', label: 'CRM status' },
  { key: 'crm_response', label: 'CRM resposta' }
];

var CRM_STATUS_COL = COLUMNS.length - 1; // 38 (indice + 1)
var CRM_BODY_COL   = COLUMNS.length;     // 39

// ============= ENDPOINT POST (recebe form do site) =============
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = ensureSheet_();

    // Timestamp servidor (horario BR)
    data.timestamp = Utilities.formatDate(
      new Date(),
      'America/Sao_Paulo',
      'dd/MM/yyyy HH:mm:ss'
    );

    // Monta row (CRM fields ficam vazios, sao preenchidos apos envio)
    var row = COLUMNS.map(function(c) {
      var v = data[c.key];
      return (v === null || v === undefined) ? '' : String(v);
    });

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    // Envia pro CRM Dros
    var crmResult = sendToCRM_(data);
    sheet.getRange(lastRow, CRM_STATUS_COL).setValue(crmResult.status);
    sheet.getRange(lastRow, CRM_BODY_COL).setValue(crmResult.body);

    return jsonOut_({ ok: true, lead_id: lastRow, crm: crmResult });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err), stack: err.stack });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Ambiental Higiene · Form endpoint ativo ✓ (v3 - CRM Dros integrado)')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ============= GARANTE ABA + CABECALHO (auto-adiciona colunas CRM se faltar) =============
function ensureSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  // Planilha nova: cria headers do zero
  if (sheet.getLastRow() === 0) {
    var headers = COLUMNS.map(function(c) { return c.label; });
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#027B36');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, headers.length, 140);
    return sheet;
  }

  // Migracao: adiciona colunas CRM se faltam
  var lastCol = sheet.getLastColumn();
  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  if (currentHeaders.indexOf('CRM status') === -1) {
    sheet.getRange(1, lastCol + 1).setValue('CRM status').setFontWeight('bold').setBackground('#027B36').setFontColor('#ffffff');
    Logger.log('[migracao] Adicionada coluna "CRM status" na pos ' + (lastCol + 1));
    lastCol++;
  }
  if (currentHeaders.indexOf('CRM resposta') === -1) {
    sheet.getRange(1, lastCol + 1).setValue('CRM resposta').setFontWeight('bold').setBackground('#027B36').setFontColor('#ffffff');
    Logger.log('[migracao] Adicionada coluna "CRM resposta" na pos ' + (lastCol + 1));
  }

  return sheet;
}

// ============= ENVIO PRO CRM DROS =============
// CRM /sheets endpoint aceita: name, phone, email, city, state, empresa, cpf_cnpj
// + source, source_detail, tag, tags, utm_*, gclid, fbclid, fbp, fbc, page_url, user_agent
// Auto-marca trabalha_anuncio=1 se detectar sinais de ad (fbclid, gclid, utm paid)
function sendToCRM_(data) {
  if (!CRM_URL) return { status: 'sem_url', body: '' };

  var telClean = (data.whatsapp || '').replace(/\D/g, '');

  // Origem normalizada pra source do CRM
  var origem = detectSource_(data);

  // source_detail com qualificadores da LP Empresas (aparece no card do CRM)
  var detailBits = [];
  if (data.funcionarios) detailBits.push('Funcionarios: ' + data.funcionarios);
  if (data.produtos)     detailBits.push('Produtos: ' + data.produtos);
  if (data.cidade)       detailBits.push('Cidade: ' + data.cidade);
  if (data.origem)       detailBits.push('LP: ' + data.origem);

  // Tags automaticas
  var tags = [LEAD_TAG];
  if (data.funcionarios) {
    tags.push('Funcionarios: ' + data.funcionarios);
  }
  if (data.produtos) {
    // Se veio como array/CSV, quebra em multiplas tags
    var produtos = String(data.produtos).split(/[,;]/).map(function(s){return s.trim()}).filter(Boolean);
    produtos.forEach(function(p) { tags.push('Produto: ' + p); });
  }

  // Separa cidade/bairro se tiver "/"
  var cidade = data.cidade || '';
  var bairro = '';
  if (cidade.indexOf('/') !== -1) {
    var parts = cidade.split('/').map(function(s){return s.trim()});
    cidade = parts[0];
    bairro = parts.slice(1).join(' / ');
  }

  var payload = {
    name: data.nome || '',
    phone: telClean,
    email: data.email || '', // form nao pede email, fica vazio
    city: cidade,
    state: '', // form nao pede estado, deixa vazio
    empresa: data.empresa || '',
    // bairro/complemento vai no source_detail
    source: origem,
    source_detail: detailBits.join(' | ') + (bairro ? ' | Bairro: ' + bairro : ''),
    tag: LEAD_TAG,
    tags: tags,
    // Tracking Meta/Google
    utm_source:   data.utm_source || '',
    utm_medium:   data.utm_medium || '',
    utm_campaign: data.utm_campaign || '',
    utm_content:  data.utm_content || '',
    utm_term:     data.utm_term || '',
    gclid:        data.gclid || '',
    fbclid:       data.fbclid || '',
    fbp:          data.fbp || '',
    fbc:          data.fbc || '',
    page_url:     data.current_url || data.first_landing_url || '',
    user_agent:   data.user_agent || ''
  };

  var headers = { 'Content-Type': 'application/json' };
  if (CRM_TOKEN) headers['Authorization'] = 'Bearer ' + CRM_TOKEN;

  try {
    var resp = UrlFetchApp.fetch(CRM_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      followRedirects: true
    });
    return {
      status: resp.getResponseCode(),
      body: (resp.getContentText() || '').substring(0, 500)
    };
  } catch (err) {
    return { status: 'erro', body: String(err) };
  }
}

// ============= NORMALIZACAO DA FONTE =============
function detectSource_(d) {
  var src = (d.utm_source || '').toLowerCase();
  var med = (d.utm_medium || '').toLowerCase();
  var ref = (d.current_referrer || d.first_referrer || '').toLowerCase();
  var hasFbclid = !!d.fbclid;
  var hasGclid = !!d.gclid;

  if (hasGclid || (src.indexOf('google') !== -1 && (med === 'cpc' || med === 'paid'))) return 'google pago';

  var isPaidMeta = hasFbclid || (med === 'paid' || med === 'cpc' || med === 'paid_social') ||
    src === 'ig' || src === 'fb' || src === 'facebook' || src === 'instagram' || src === 'meta';
  if (isPaidMeta) {
    if (src === 'ig' || src === 'instagram') return 'instagram pago';
    if (src === 'fb' || src === 'facebook') return 'facebook pago';
    return 'meta pago';
  }

  if (ref.indexOf('whatsapp') !== -1 || ref.indexOf('wa.me') !== -1) return 'whatsapp';
  if (ref.indexOf('instagram.com') !== -1) return 'instagram organico';
  if (ref.indexOf('facebook.com') !== -1) return 'facebook organico';
  if (ref.indexOf('google.') !== -1 && !hasGclid) return 'google organico';
  if (!ref && !src && !hasGclid && !hasFbclid) return 'direto';
  if (ref) {
    try {
      var host = ref.replace(/^https?:\/\//, '').split('/')[0];
      return 'referral: ' + host;
    } catch (_) { return 'referral'; }
  }
  return src || 'lp_empresas';
}

// ============= HELPER JSON RESPONSE =============
function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============= RETROATIVO: envia leads antigos pro CRM =============
// Percorre linhas 2+ da planilha e envia pro CRM os leads que ainda nao
// tem CRM status preenchido. Preenche CRM status/resposta ao final.
// Roda uma vez pra popular os leads historicos que ficaram so na planilha.
function enviarLeadsAntigos() {
  var sheet = ensureSheet_();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2) {
    Logger.log('Sem leads pra enviar');
    return;
  }

  // Le todos os headers pra mapear coluna -> key
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var headerToKey = {};
  COLUMNS.forEach(function(c) { headerToKey[c.label] = c.key; });

  // Le todas as linhas
  var allData = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  var enviados = 0, pulados = 0, falhas = 0;
  allData.forEach(function(rowValues, idx) {
    var sheetRow = idx + 2; // linha real na planilha

    // Constroi objeto data a partir dos headers
    var data = {};
    headers.forEach(function(h, i) {
      var key = headerToKey[h];
      if (key) data[key] = rowValues[i];
    });

    // Ja tem CRM status? Skip
    var crmStatusIdx = headers.indexOf('CRM status');
    var currentStatus = crmStatusIdx !== -1 ? rowValues[crmStatusIdx] : '';
    if (currentStatus && String(currentStatus).trim() !== '') {
      pulados++;
      return;
    }

    // Envia
    Logger.log('[retroativo] Linha ' + sheetRow + ': ' + data.nome + ' / ' + data.empresa);
    var result = sendToCRM_(data);

    // Grava status/resposta na planilha
    if (crmStatusIdx === -1) {
      // Coluna nao existe, cria (edge case: deveria ja ter sido criada pelo ensureSheet_)
      sheet.getRange(1, lastCol + 1).setValue('CRM status');
      sheet.getRange(1, lastCol + 2).setValue('CRM resposta');
      crmStatusIdx = lastCol;
      lastCol += 2;
    }
    sheet.getRange(sheetRow, crmStatusIdx + 1).setValue(result.status);
    sheet.getRange(sheetRow, crmStatusIdx + 2).setValue(result.body);

    if (result.status === 200 || result.status === '200' || (typeof result.status === 'number' && result.status < 300)) {
      enviados++;
    } else {
      falhas++;
    }

    // Pausa 500ms entre envios pra nao rate-limit
    Utilities.sleep(500);
  });

  Logger.log('[retroativo] Concluido: ' + enviados + ' enviados, ' + pulados + ' pulados (ja tinham CRM), ' + falhas + ' falhas');
}

// ============= TESTE MANUAL =============
function testLead() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        nome: 'Teste Dros v3',
        empresa: 'Dros Agencia Teste',
        whatsapp: '(11) 99999-9999',
        cidade: 'Sao Paulo / Vila Mariana',
        funcionarios: '11-50',
        produtos: 'Papel Toalha, Sabonete',
        origem: 'LP Empresas',
        utm_source: 'instagram',
        utm_medium: 'paid',
        utm_campaign: 'teste_v3_crm',
        fbclid: 'AbCdEfGhIj',
        current_url: 'https://empresas.ambientalhigiene.com.br/',
        current_referrer: 'https://instagram.com/',
        user_agent: 'GoogleAppsScript-TestV3'
      })
    }
  };
  var res = doPost(fake);
  Logger.log(res.getContent());
}
