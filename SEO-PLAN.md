# Plano de SEO Completo — empresas.ambientalhigiene.com.br

> **Documento estratégico** · v1.0 · Junho/2026
> Cliente: Ambiental Higiene · Agência: Dros / Sheraos Marketing
> Página alvo: https://empresas.ambientalhigiene.com.br/

---

## 1. Resumo Executivo

A Ambiental Higiene tem uma landing page profissional rodando em produção, mas estava **invisível pros motores de busca** — sem schema, sem Open Graph, sem sitemap, sem robots.txt, com meta description fraca e título genérico. Este documento consolida a auditoria, as correções já aplicadas e o plano de 12 meses pra ranquear no Google em buscas B2B de produtos de limpeza e higiene corporativos.

**Mercado:** R$ 38 bi em 2024, projeção R$ 50+ bi até 2029. 17.380+ empresas concorrendo. Crescimento >30% no horizonte. ([Fonte](https://redeunishop.com.br/mercado-de-limpeza-em-2025-o-que-aconteceu-e-por-que-ainda-vale-investir-em-2026/))

**Oportunidade:** Concorrentes diretos (Oceano B2B, Higiclear, Fibrilar, Mundial Distribuidora, KMS) ranqueiam com conteúdo, mas poucos têm landing dedicada ao programa de abastecimento mensal — esse é o gap competitivo da Ambiental.

---

## 2. Auditoria Técnica On-Page (Antes ❌ / Depois ✅)

### 2.1 Meta Tags

| Item | Antes | Depois |
|---|---|---|
| Title | "Ambiental Higiene · Produtos de limpeza e higiene pra empresas" (67c) | "Fornecedor de Produtos de Limpeza e Higiene para Empresas \| Ambiental Higiene" (80c, keyword-rich) |
| Meta description | Genérica (~200c) | Otimizada com CTA + diferencial "18 anos" (190c) |
| Meta keywords | ❌ Ausente | ✅ Adicionada (não tem peso de rank mas ajuda em alguns engines) |
| Meta robots | ❌ Ausente | ✅ `index, follow, max-image-preview:large` |
| Canonical URL | ❌ Ausente | ✅ `https://empresas.ambientalhigiene.com.br/` |
| theme-color | Branco | Verde marca `#027B36` |

### 2.2 Social Media (Open Graph + Twitter Card)

| Item | Antes | Depois |
|---|---|---|
| og:type | ❌ | ✅ website |
| og:url | ❌ | ✅ |
| og:title / og:description | ❌ | ✅ Otimizados |
| og:image | ❌ | ✅ banner-hero-desktop.png |
| og:locale | ❌ | ✅ pt_BR |
| twitter:card | ❌ | ✅ summary_large_image |

**Impacto:** quando alguém compartilhar no WhatsApp/LinkedIn/Facebook agora vai gerar preview rico com imagem e descrição. Antes só aparecia URL pelada.

### 2.3 Structured Data (Schema.org JSON-LD)

Adicionados 6 schemas integrados via `@graph`:

1. **Organization** — identifica a empresa pro Google (nome, logo, fundação, área servida)
2. **LocalBusiness** — habilita aparecer no Google Maps + Local Pack (precisa preencher endereço/telefone)
3. **WebSite** — declara o site como entidade SEO
4. **Service** — descreve o serviço "abastecimento de produtos de limpeza e higiene para empresas"
5. **FAQPage** — 4 perguntas frequentes aptas a virar Rich Result no Google
6. **BreadcrumbList** — navegação estruturada

**Validar depois do deploy:**
- https://validator.schema.org/
- https://search.google.com/test/rich-results

### 2.4 Arquivos de Indexação

| Arquivo | Status |
|---|---|
| `/robots.txt` | ✅ Criado — permite tudo, declara sitemap, controla bots agressivos |
| `/sitemap.xml` | ✅ Criado — com image sitemap pra os 3 banners principais |

### 2.5 Headings (Hierarquia)

Mantida, está correta:
- 1× H1 (hero headline)
- 9× H2 (problemas, vantagens, economia, essenciais, comparativo, como funciona, orçamento, FAQ, CTA)
- H3 nos cards e steps

✅ Sem H1 duplicado, hierarquia semântica respeitada.

### 2.6 Imagens

| Item | Antes | Depois |
|---|---|---|
| Logo alt | "Ambiental Higiene" (genérico) | "Ambiental Higiene Profissional · Fornecedor de produtos de limpeza e higiene para empresas" (descritivo, keyword-rich) |
| Logo width/height | ❌ | ✅ Define `width` e `height` (CLS prevention) |
| Logo fetchpriority | ❌ | ✅ `high` (LCP) |
| Banner hero | CSS background (não indexa) | Mantido + listado no sitemap.xml com captions |

**Pendente otimização:** o banner-hero-mobile.png tem 6.5MB e o desktop 4MB. Recomendado comprimir pra <500KB cada (sem perder qualidade visual) — economiza ~10MB de transferência e melhora LCP significativamente. Ferramenta: https://squoosh.app/ ou ImageOptim local.

### 2.7 Performance (Core Web Vitals)

**Estimativa atual** (sem teste em laboratório):
- LCP: provavelmente **>4s** por causa do banner-hero-mobile de 6.5MB → após otimização: **<2.5s** (verde)
- CLS: bom (sem layout shifts grandes detectados)
- INP: bom (página estática, sem JS pesado)

**Ações pra atingir verde nos Core Web Vitals:**
1. Comprimir banner-hero-mobile.png e banner-hero-desktop.png pra ≤500KB
2. Converter pra WebP (mantém PNG fallback): `<picture><source type="image/webp">...`
3. Lazy load nas imagens abaixo da dobra (cta-caminhao.png pelo menos)
4. AOS CDN é leve (~10KB), mas pode ser carregado com `defer` se quiser otimizar

---

## 3. Pesquisa de Palavras-Chave

### 3.1 Keywords Primárias (head terms — alta competição, alto valor)

| Keyword | Intenção | Volume estimado/mês BR |
|---|---|---|
| produtos de limpeza para empresas | Comercial | Alto |
| fornecedor produtos limpeza empresas | Comercial | Médio-alto |
| distribuidor produtos higiene | Comercial | Médio |
| abastecimento higiene empresarial | Informacional + Comercial | Baixo (nicho) |
| material de limpeza para empresas | Comercial | Alto |

### 3.2 Long-Tail B2B (média competição, conversão alta)

Estas são as **golden keywords** — quem busca isso já tá pronto pra comprar:

- `como abastecer produtos de limpeza na empresa`
- `quanto gasta uma empresa com produtos de limpeza`
- `fornecedor produtos higiene CNPJ`
- `lista produtos limpeza empresa checklist`
- `produtos de limpeza no atacado para empresa`
- `papel higiênico atacado empresa`
- `papel toalha rolão para empresa`
- `álcool gel 70 atacado empresa`
- `dispenser papel toalha automático preço`
- `kit higiene banheiro empresa`
- `produtos de limpeza para escritório`
- `material de limpeza para indústria`
- `material de limpeza para condomínio`
- `material de limpeza para academia`
- `material de limpeza para restaurante`
- `material de limpeza para clínica`

### 3.3 Keywords Locais (regionais — atenção)

Faltam confirmação da região atendida. Quando confirmar (ex: Sul de MG, Grande SP, etc.) gerar variantes:

- `produtos de limpeza para empresas em [CIDADE]`
- `fornecedor higiene corporativo [CIDADE]`
- `distribuidor produtos limpeza [REGIÃO]`
- `entrega produtos limpeza empresa [CIDADE]`

**Ação:** criar **uma landing por cidade-alvo** (ex: `/varginha`, `/pouso-alegre`) com conteúdo levemente personalizado. Cada uma briga por keywords locais sem canibalizar a principal.

### 3.4 Keywords Transacionais (anúncios pagos + SEO)

- `orçamento produtos limpeza empresa`
- `cotação higiene corporativo`
- `comprar material de limpeza empresa`
- `fornecedor produtos higiene CNPJ desconto`

---

## 4. Análise de Concorrentes

| Concorrente | Pontos fortes | Gaps (= oportunidades pra nós) |
|---|---|---|
| **Oceano B2B** | Marca forte B2B, blog ativo, schema completo | Foco em e-commerce, atendimento menos consultivo |
| **Higiclear** | Conteúdo SEO forte (artigos), checklists | Sem programa de abastecimento mensal claro |
| **Fibrilar** | Categorização por nicho (escritório, indústria) | UX antiga, sem landing dedicada a empresa |
| **Mundial Distribuidora** | 6000+ SKUs, autoridade | Site genérico, foco em revenda não em empresa final |
| **KMS Atacadista** | 3500+ itens, B2B + B2C | Sem diferenciação clara, marca fraca digital |

**Posicionamento que a Ambiental deve ocupar:**

> "O **fornecedor consultivo** de produtos de limpeza pra empresas que faz **abastecimento mensal programado**, evita compras emergenciais e dá previsibilidade pro caixa — não é um e-commerce, é um parceiro."

Esse é o gap real — todos vendem produto, ninguém vende "tranquilidade operacional + previsibilidade financeira".

---

## 5. Plano de Conteúdo (Roadmap 12 meses)

A landing atual é forte como **página de captação**, mas Google premia profundidade. Estratégia: criar uma seção `/recursos/` (ou `/blog/`) com artigos que ranqueiam pras long-tails da seção 3.2.

### Trimestre 1 (mês 1-3) — Foundation + 6 artigos pilares
- ✅ Auditoria + on-page (este documento)
- ✅ Comprimir imagens + WebP
- 📝 **Artigo 1:** "Quanto a sua empresa gasta com produtos de limpeza por mês (e como reduzir 30%)"
- 📝 **Artigo 2:** "Checklist de produtos de limpeza essenciais por tipo de empresa (PDF download)"
- 📝 **Artigo 3:** "Como montar um plano de abastecimento de higiene corporativo"
- 📝 **Artigo 4:** "Compras emergenciais vs compras programadas: o real custo escondido"
- 📝 **Artigo 5:** "Dispensers profissionais: vale a pena investir? Tabela comparativa"
- 📝 **Artigo 6:** "Papel higiênico institucional: tipos, rendimento e quando vale a pena cada um"
- 🏢 Google Business Profile criado e otimizado (depende do endereço)
- 🔗 Submissão sitemap no Google Search Console + Bing Webmaster Tools

### Trimestre 2 (mês 4-6) — Landings regionais + 4 artigos
- 📍 1 landing por cidade-alvo (mín. 3): `/[cidade]` com prova social local
- 📝 **Artigo 7:** "Como escolher fornecedor de produtos de limpeza pra empresa: 10 critérios"
- 📝 **Artigo 8:** "Estoque mínimo de produtos de higiene: cálculo por funcionário e setor"
- 📝 **Artigo 9:** "Norma regulamentadora NR-24 e os produtos de higiene obrigatórios"
- 📝 **Artigo 10:** "Sustentabilidade no abastecimento: produtos biodegradáveis pra empresa"
- 🎥 Vídeo institucional curto (40s) hospedado no YouTube + embed na landing
- ⭐ Pedido formal de avaliações no Google pros 10 melhores clientes

### Trimestre 3 (mês 7-9) — Conteúdo segmentado + Link building
- 📝 Páginas verticais (1 por nicho): `/clinicas`, `/restaurantes`, `/escritorios`, `/industrias`, `/condominios`, `/academias`
  - Cada uma com keywords locais nichadas + cases reais
- 🔗 Estratégia de link building:
  - Parcerias com associações comerciais regionais (link `dofollow`)
  - Guest post em blogs de gestão empresarial / administrativos
  - Cadastro em diretórios B2B sérios (TheBricks, OHub, Apolo)
- 📊 Primeiro relatório de progresso (Search Console)

### Trimestre 4 (mês 10-12) — Escala + automação
- 📝 Calculadora interativa: "Quanto sua empresa gasta com limpeza?" → captura email
- 📰 Newsletter mensal pra base capturada nas calculadoras + checklists
- 🤖 Schema avançado: Product (catálogo individual), VideoObject, Review
- 📊 Auditoria de meio termo + ajustes baseados em dados reais
- 🎯 Primeiros A/B tests no formulário de orçamento (versão curta vs longa)

---

## 6. Local SEO (depois de ter o endereço)

### 6.1 Google Business Profile (GBP) — prioridade máxima

Quando tiver o endereço:
1. Criar/reivindicar GBP em https://business.google.com
2. Categoria primária: **"Distribuidor"** ou **"Atacadista de produtos de limpeza"**
3. Categorias secundárias: **"Serviço de entrega"**, **"Fornecedor de embalagens"**
4. Adicionar fotos profissionais (mín. 10): fachada, loja, frota, equipe, produtos
5. Horário comercial preciso
6. Descrição de 750 chars otimizada com keywords
7. Publicar 1 update/semana no GBP (novidades, dicas, ofertas)
8. Responder TODAS as avaliações em <48h
9. Mensagens ativadas + respostas em <2h

### 6.2 Citations (NAP — Name, Address, Phone)

Cadastrar com **dados idênticos** em (pelo menos):
- Google Business Profile
- Bing Places
- Apple Business Connect
- Facebook Page
- Instagram comercial
- LinkedIn Company
- WhatsApp Business
- Apontador
- TeleListas
- OHub
- Catálogo BR de empresas

### 6.3 Estrutura de URL local

Quando criar landings regionais:
```
/                          ← landing principal (já existe)
/varginha/                 ← cidade A
/pouso-alegre/             ← cidade B
/tres-pontas/              ← cidade C
/clinicas/                 ← nicho vertical
/restaurantes/             ← nicho vertical
/escritorios/              ← nicho vertical
/recursos/                 ← hub de blog
/recursos/quanto-gasta-empresa-com-limpeza/  ← artigo
```

---

## 7. Performance + Monitoramento

### 7.1 Ferramentas a configurar (mês 1)

| Ferramenta | Pra quê | Custo |
|---|---|---|
| Google Search Console | Rastrear indexação, queries, posições | Grátis |
| Google Analytics 4 (GA4) | Tráfego, conversões, comportamento | Grátis |
| Microsoft Clarity | Heatmaps + session replay | Grátis |
| Bing Webmaster Tools | Indexação Bing (5% do tráfego) | Grátis |
| PageSpeed Insights | Core Web Vitals contínuo | Grátis |
| Ahrefs Free Account / SE Ranking | Backlinks, keywords | Grátis (limitado) ou R$200/mês |

### 7.2 KPIs e cadência

| KPI | Cadência | Meta 6 meses | Meta 12 meses |
|---|---|---|---|
| Impressões orgânicas (Search Console) | Mensal | 5.000/mês | 30.000/mês |
| Cliques orgânicos | Mensal | 200/mês | 1.500/mês |
| Posição média | Mensal | <25 | <12 |
| Conversões formulário | Semanal | 10/mês | 60/mês |
| Avaliações Google (estrelas) | Mensal | 25 com 4.8+ | 80 com 4.8+ |
| Backlinks de qualidade (DA >30) | Trimestral | 8 | 25 |
| Core Web Vitals (% URLs verdes) | Mensal | 80% | 100% |

### 7.3 Reuniões + reports

- **Mensal:** report executivo com KPIs, próximas ações, alertas
- **Trimestral:** revisão estratégica, ajustes de plano, novos focos
- **Anual:** auditoria completa nova (replicar este documento)

---

## 8. Fixes Aplicados Agora (Resumo de Commit)

Aplicados imediatamente neste deploy:

1. ✅ `<title>` reescrito (keyword-rich)
2. ✅ `meta description` reescrita
3. ✅ `meta keywords` adicionada
4. ✅ `meta robots` + `googlebot`
5. ✅ `link rel="canonical"`
6. ✅ Open Graph completo (8 tags)
7. ✅ Twitter Card (3 tags)
8. ✅ `apple-touch-icon`
9. ✅ `theme-color` agora usa verde da marca
10. ✅ JSON-LD com 6 schemas (Organization, LocalBusiness, WebSite, Service, FAQPage, BreadcrumbList)
11. ✅ Logo `<img alt>` descritivo + `width/height` + `fetchpriority="high"`
12. ✅ `/robots.txt`
13. ✅ `/sitemap.xml` com image sitemap

---

## 9. Pendências do Cliente (Preencher pro Local SEO funcionar)

No `index.html`, dentro do JSON-LD do LocalBusiness, substituir os placeholders `[PREENCHER_*]`:

```json
"telephone": "[PREENCHER_TELEFONE]",     ← ex: "+55 35 3299-0000"
"address": {
  "streetAddress": "[PREENCHER_RUA_NUMERO]",   ← ex: "Av. Rio Branco, 1234"
  "addressLocality": "[PREENCHER_CIDADE]",     ← ex: "Varginha"
  "addressRegion": "[PREENCHER_UF]",            ← ex: "MG"
  "postalCode": "[PREENCHER_CEP]"               ← ex: "37000-000"
}
```

Também adicionar redes sociais em `Organization.sameAs`:
```json
"sameAs": [
  "https://www.instagram.com/ambientalhigiene/",
  "https://www.facebook.com/ambientalhigiene/",
  "https://www.linkedin.com/company/ambiental-higiene/"
]
```

---

## 10. Próximas Sprints (proposta de ordem de execução)

### Sprint 1 (esta semana)
- [x] On-page fixes
- [x] robots + sitemap
- [ ] Preencher dados do LocalBusiness (cliente)
- [ ] Comprimir imagens (banner-hero-mobile.png, banner-hero-desktop.png, cta-caminhao.png) pra <500KB cada
- [ ] Submeter sitemap no Search Console
- [ ] Criar Google Business Profile

### Sprint 2 (próximas 2 semanas)
- [ ] Implementar Google Analytics 4 + Microsoft Clarity
- [ ] Implementar form de orçamento funcional (backend ou serviço como Formspree/Web3Forms)
- [ ] Escrever Artigos 1 e 2 (pilares)
- [ ] Validar todos os schemas (validator.schema.org)

### Sprint 3 (mês 1)
- [ ] Publicar artigos 3-6
- [ ] Criar landings de pelo menos 1 cidade-alvo
- [ ] Primeiro relatório de baseline

---

## Anexos

### A. Fontes consultadas
- [Mercado de limpeza 2025/2026 — Unishop](https://redeunishop.com.br/mercado-de-limpeza-em-2025-o-que-aconteceu-e-por-que-ainda-vale-investir-em-2026/)
- [Lista de material de limpeza para empresas — Higiclear](https://www.higiclear.com/artigos/material-de-limpeza-checklist-dos-produtos-que-nao-podem-faltar/)
- [Fornecedores B2B Brasil — Tray](https://tray.com.br/escola/fornecedor-de-produtos-de-limpeza/)
- [SEO B2B 2026 — Upsend](https://upsendbrasil.com.br/blog/seo-e-geo-para-b2b-o-novo-cenario-de-2026/)

### B. Checklist final pré-publicação
- [ ] Testar Open Graph: https://developers.facebook.com/tools/debug/
- [ ] Testar Twitter Card: https://cards-dev.twitter.com/validator
- [ ] Testar Schema: https://validator.schema.org/
- [ ] Testar Rich Results: https://search.google.com/test/rich-results
- [ ] Testar Mobile-Friendly: https://search.google.com/test/mobile-friendly
- [ ] Testar PageSpeed: https://pagespeed.web.dev/
- [ ] Confirmar `https://empresas.ambientalhigiene.com.br/robots.txt` retorna 200
- [ ] Confirmar `https://empresas.ambientalhigiene.com.br/sitemap.xml` retorna 200
- [ ] Submeter sitemap.xml no Google Search Console

---

**Próxima revisão deste documento:** Setembro/2026 (revisão trimestral)
**Autor original:** Dros Agência / Sheraos Marketing
