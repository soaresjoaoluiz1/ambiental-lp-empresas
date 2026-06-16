# Setup Google Apps Script — Integração Form + Tracking Completo

## ⚠️ Atualização v2

A planilha agora vai receber **36 colunas** por linha (form + UTMs + click IDs + cookies + page tracking + browser info). Se você já implantou a v1, **substitua TODO o código** e crie uma nova versão da implementação (URL não muda).

> **IMPORTANTE:** Antes de redeploy, **apague o conteúdo da aba `LANDING PAGE EMPRESAS`** (selecionar tudo → DEL) pra o script recriar o header com todas as colunas novas. Não precisa apagar a aba inteira, só limpar o conteúdo.

---

## 1. Abrir o Apps Script

1. Planilha: https://docs.google.com/spreadsheets/d/1zIRtsuXblI98I7uJMtoiDTOipeqxg375gxgeQT6L4Mg/edit
2. Menu **Extensões → Apps Script**

## 2. Substituir TODO o código pelo abaixo

```javascript
// ============= CONFIG =============
const SHEET_NAME = 'LANDING PAGE EMPRESAS';

// Ordem das colunas (key bate com o JSON enviado pelo site)
const COLUMNS = [
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
  { key: 'submit_at', label: 'Submit At (Cliente)' }
];

// ============= ENDPOINT POST (recebe form do site) =============
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Header — cria se a aba estiver vazia
    if (sheet.getLastRow() === 0) {
      const headers = COLUMNS.map(c => c.label);
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#027B36');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, headers.length, 140);
    }

    // Timestamp servidor (horario BR)
    data.timestamp = Utilities.formatDate(
      new Date(),
      'America/Sao_Paulo',
      'dd/MM/yyyy HH:mm:ss'
    );

    // Monta row na ordem das colunas (campos faltantes ficam vazios)
    const row = COLUMNS.map(c => {
      const v = data[c.key];
      return (v === null || v === undefined) ? '' : String(v);
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============= GET (teste pelo browser) =============
function doGet() {
  return ContentService
    .createTextOutput('Ambiental Higiene · Form endpoint ativo ✓ (v2 com tracking)')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. Salvar (Ctrl+S)

## 4. ⚠️ REDEPLOY como nova versão (mesma URL)

**Se você já implantou a v1 antes:**

1. **Implementar → Gerenciar implementações**
2. Clica no **lápis** (✏️) da implementação ativa
3. **Versão → Nova versão**
4. Descrição: `v2 — Tracking completo (36 colunas)`
5. Clica **Implementar**
6. URL **continua a mesma** — não precisa atualizar nada no site

**Se ainda não implantou (primeira vez):**

1. **Implementar → Nova implementação**
2. Engrenagem → **App da Web**
3. Executar como: **Eu**
4. Quem tem acesso: **Qualquer pessoa** ⚠️
5. **Implementar** → autorizar acesso
6. Copia URL `/exec` e me passa

## 5. Limpar a aba antes do primeiro teste

Pra que o script recrie o header com as 36 colunas:

1. Abre a planilha
2. Aba `LANDING PAGE EMPRESAS`
3. Seleciona tudo (Ctrl+A no body)
4. **DEL** pra apagar

Próximo lead que vier vai recriar o header automaticamente.

---

## Colunas da planilha (em ordem)

**Form (8):**
| 1. Data/Hora | 2. Nome | 3. Empresa | 4. WhatsApp | 5. Cidade / Bairro | 6. Funcionários | 7. Produtos | 8. Origem |

**Atribuição UTM (6):**
| 9. UTM Source | 10. UTM Medium | 11. UTM Campaign | 12. UTM Content | 13. UTM Term | 14. UTM ID |

**Click IDs de anúncios (8):**
| 15. Facebook (fbclid) | 16. Google Ads (gclid) | 17. Google (gbraid) | 18. Google (wbraid) | 19. TikTok (ttclid) | 20. Microsoft (msclkid) | 21. LinkedIn (li_fat_id) | 22. Twitter/X (twclid) |

**Cookies (4):**
| 23. Facebook _fbp | 24. Facebook _fbc | 25. GA Client (_ga) | 26. Google _gcl_au |

**Meta Pixel (1):**
| 27. Meta Event ID (pra dedup com Conversion API se for usar) |

**Atribuição de página (5):**
| 28. First Referrer | 29. First Landing URL | 30. First Visit At | 31. Current URL | 32. Current Referrer |

**Browser (4):**
| 33. User Agent | 34. Language | 35. Screen Resolution | 36. Timezone |

**Cliente (1):**
| 37. Submit At (Cliente) |

Total: **37 colunas** (corrigindo, contagem real).

---

## Meta Pixel — eventos disparados

| Página | Evento | Quando |
|---|---|---|
| Todas | `PageView` | Auto, no carregamento |
| index.html | `Lead` | No submit do form |
| obrigado.html | `Lead` | No carregamento (com Advanced Matching: nome, sobrenome, telefone E.164, cidade, país) |
| obrigado.html | `Lead-Empresa` (custom) | No carregamento, com `content_name`, `value`, `currency`, `empresa`, `cidade`, `funcionarios`, `produtos`, `lead_source` |

**Dedup via Event ID:** index.html gera um `eventID` no submit, salva em sessionStorage, e obrigado.html lê e usa o mesmo. Isso evita contar 2x o mesmo Lead no Gerenciador do Meta.

---

## Como atualizar o código depois

1. Edita o código no editor do Apps Script
2. Salva (Ctrl+S)
3. **Implementar → Gerenciar implementações → ✏️ → Nova versão → Implementar**
4. URL não muda
