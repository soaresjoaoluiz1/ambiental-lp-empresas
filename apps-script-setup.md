# Setup Google Apps Script — Integração Form da Ambiental Higiene

## 1. Abrir o Apps Script da planilha

1. Abre a planilha: https://docs.google.com/spreadsheets/d/1zIRtsuXblI98I7uJMtoiDTOipeqxg375gxgeQT6L4Mg/edit
2. Menu **Extensões → Apps Script**
3. Vai abrir uma aba nova com o editor

## 2. Colar o código abaixo

Apaga tudo que tiver lá (geralmente vem `function myFunction() {}` em branco) e cola **EXATAMENTE** este código:

```javascript
// ============= CONFIG =============
const SHEET_NAME = 'LANDING PAGE EMPRESAS';

// ============= ENDPOINT POST (recebe form do site) =============
function doPost(e) {
  try {
    // Body chega como string JSON (Content-Type: text/plain do fetch no-cors)
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a aba se nao existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Se primeira linha vazia, adiciona headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora',
        'Nome',
        'Empresa',
        'WhatsApp',
        'Cidade / Bairro',
        'Funcionarios',
        'Produtos',
        'Origem'
      ]);
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#027B36');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Timestamp brasileiro
    const timestamp = Utilities.formatDate(
      new Date(),
      'America/Sao_Paulo',
      'dd/MM/yyyy HH:mm:ss'
    );

    sheet.appendRow([
      timestamp,
      data.nome || '',
      data.empresa || '',
      data.whatsapp || '',
      data.cidade || '',
      data.funcionarios || '',
      data.produtos || '',
      data.origem || 'LP Empresas'
    ]);

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
    .createTextOutput('Ambiental Higiene · Form endpoint ativo ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. Salvar

- Ctrl+S (ou ícone do disquete)
- Nome do projeto: **Ambiental Higiene Leads**

## 4. Deploy como Web App

1. No topo direito, clica em **Implementar** (Deploy) → **Nova implementação**
2. Engrenagem ao lado de "Selecionar tipo" → **App da Web** (Web app)
3. Configurações:
   - **Descrição:** `Form Ambiental v1`
   - **Executar como:** **Eu** (seu email)
   - **Quem tem acesso:** **Qualquer pessoa** (Anyone) ⚠️ ISSO É CRÍTICO
4. Clica **Implementar** (Deploy)
5. Vai aparecer um popup pedindo autorização:
   - Clica **Autorizar acesso**
   - Escolhe sua conta Google
   - Pode aparecer "Google não verificou este app" → **Avançado → Acessar Ambiental Higiene Leads (não seguro)**
   - Aceita as permissões (acesso à planilha)
6. Depois mostra a **URL do app implantado** (algo tipo `https://script.google.com/macros/s/AKfycb.../exec`)
7. **Copia essa URL** e me passa

## 5. Teste rápido (opcional, mas recomendado)

Cola a URL no browser. Deve mostrar: **"Ambiental Higiene · Form endpoint ativo ✓"**

Se mostrar isso, tá funcionando. Se der erro, alguma config tá errada.

## 6. Me passa a URL

Quando passar a URL, eu coloco no HTML do site e dou o `git push` final. Aí o form começa a salvar tudo na sua aba **LANDING PAGE EMPRESAS** automaticamente.

---

## Estrutura final da aba

Cada lead vai cair como uma linha nova com estas colunas:

| Data/Hora | Nome | Empresa | WhatsApp | Cidade / Bairro | Funcionários | Produtos | Origem |
|---|---|---|---|---|---|---|---|
| 16/06/2026 15:30:12 | João Silva | Restaurante X | (11) 99999-9999 | Vila Mariana | 11-50 | papel toalha, sabonete | LP Empresas |

Header verde brand já com fundo branco no texto e primeira linha congelada.

---

## Se quiser revisar/atualizar o script depois

Sempre que mudar o código:
1. Salva (Ctrl+S)
2. **Implementar → Gerenciar implementações**
3. Clica no lápis (editar) da versão ativa
4. **Versão → Nova versão** + descrição
5. **Implementar**

A URL **NÃO muda**. Continua a mesma. Só precisa de "nova versão" quando alterar o código.
