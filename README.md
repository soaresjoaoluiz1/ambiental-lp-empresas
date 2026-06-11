# Ambiental Higiene — Landing Page Revendedor

Landing page de captação para o programa de revendedor da Ambiental Higiene.

**Domínio:** revendedor.ambientalhigiene.com.br

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
Hospedado em VPS HostGator (Dros), subdomínio `revendedor.ambientalhigiene.com.br`.

Para atualizar em produção:
```bash
git pull origin main
```

---
© Ambiental Higiene · Cliente da Dros Agência
