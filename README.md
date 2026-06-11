# Ambiental Higiene — Landing Page Empresas

Landing page de captação para empresas que querem abastecimento mensal de produtos de limpeza/higiene da Ambiental Higiene.

**Domínio:** empresas.ambientalhigiene.com.br

> **Nota:** essa landing está temporariamente também rodando em revendedor.ambientalhigiene.com.br até a landing real de revendedor ficar pronta.

## Stack
- HTML5 estático
- CSS inline (mobile-first, breakpoint `@media (min-width: 960px)`)
- SVGs inline (sem dependências)
- Imagens otimizadas em `assets/`

## Estrutura
```
.
├── index.html        # página única com todas as seções
└── assets/
    ├── logo.png
    ├── hero-produtos.png
    └── cta-caminhao.png
```

## Seções
1. Header + Hero (com formulário CTA)
2. Strip de benefícios (3 pills)
3. Problemas (3 cards vermelhos)
4. Vantagens (3 cards verdes)
5. Banner de economia
6. Essenciais (catálogo de produtos)
7. Comparativo (mercado tradicional vs Ambiental)
8. Como funciona (4 etapas)
9. Formulário de orçamento
10. FAQ
11. CTA final com caminhão

## Deploy
Hospedado em VPS HostGator (Dros) via cPanel user `ambiental`.

Para atualizar em produção:
```bash
cd /home/ambiental/public_html_empresas  # ou caminho equivalente do subdomínio empresas
git pull origin main
chown -R ambiental:ambiental .git index.html README.md .gitignore assets/
```

---
© Ambiental Higiene · Cliente da Dros Agência
