# Documentação do Projeto (Astro + Tailwind CSS)

Visão Geral
Este projeto utiliza o framework Astro com estrutura modular, componentes reutilizáveis e integração com Tailwind CSS. A organização de pastas facilita manutenção, escalabilidade e adição de novas páginas e componentes.

---
## Estrutura do Projeto

```text
base_template/
├── src/
│   ├── components/            # Componentes de UI
│   │   ├── layout/
│   │   │   └── header/        # Header da aplicação
│   │   │   └── sidebar/       # Sidebar (menu lateral)
│   ├── layouts/
│   │   └── Layout.astro   # Layout base para todas as páginas
│   ├── pages/
│   │   └── index.astro    # Página inicial (Dashboard)
│   └── styles/
│       └── base.css       # Estilos base do Tailwind
│
├── astro.config.mjs       # Configuração do Astro (integrações, etc.)
├── tailwind.config.cjs     # Configuração do Tailwind (tema, plugins)
├── package.json            # Dependências, scripts e metadata
└── tsconfig.json           # Configurações TypeScript
```
---
## Componentes Principais

### Header (src/components/layout/header)
- ``Header.astro:`` Cabeçalho principal da aplicação.
- ``Search.astro:`` Campo de busca com debounce.
- ``ThemeToggle.astro:`` Alterna entre tema claro e escuro.
- ``ActionsMenu.astro:`` Menu personalizável de ações.
- ``types.ts:`` Definições de tipos TypeScript para ações do Header.

## Sidebar (src/components/sidebar)
- ``index.astro:`` Sidebar principal, com logo, navegação e link de documentação.
- ``menu-link.astro:`` Item individual de menu, com ícone, label e tooltip.
- ``menu-data.ts:`` Lista de itens do menu (label, ícone, link, seção).
- ``types.ts:`` Interfaces e tipos para itens do menu.
- ``constants.ts:`` Constantes compartilhadas.
- ``controller.ts:`` Lógica de colapsar/expandir sidebar e persistir estado.

## Layout (src/layouts)
- ``Layout.astro:`` Layout base. Envolve páginas com Header e Sidebar.

## Páginas (src/pages)
- ``index.astro:`` Página inicial usando ``Layout.astro``, exibindo Sidebar e Header.

---

## Estilização e Temas
- Estilização com Tailwind CSS (base.css contém ``@tailwind base``, ``@tailwind components``, ``@tailwind utilities``).
- Sidebar em tema escuro (bg-gray-900) e restante do layout em tons claros.
- Fonte principal: Inter.
- Responsividade garantida pelo uso de utilitários Tailwind.

---

## Configurações
- ``astro.config.mjs:`` Integrações do Astro (Tailwind, etc.).
- ``tailwind.config.cjs:`` Ajustes do tema, fontes e plugins Tailwind.
- ``package.json:`` Dependências, scripts de build, dev e lint.
- ``tsconfig.json:`` Escopo, alvo e configurações do TypeScript.

---

## Funcionamento da Sidebar

A Sidebar exibe itens de navegação divididos em seções (main, system, footer). Pode ser colapsada, exibindo tooltips nos itens. O estado (colapsado/expandido) é persistido.

Exemplo de tipo para itens do menu (``menu-data.ts``):

```typescript
interface MenuItem {
  label: string;
  href: string;
  icon: string;
  section: 'main' | 'system' | 'footer';
}
```

---
## Conclusão
A combinação de Astro e Tailwind oferece um setup simples, escalável e fácil de manter. A arquitetura clara e modular permite adicionar páginas, componentes e funcionalidades com agilidade, mantendo o código organizado.
___

## Documentação do Componente Header

### Visão Geral
O Header é um componente Astro reutilizável que fornece:
- Barra de busca com debounce
- Alternância de tema (claro/escuro)
- Menu de ações personalizável (ícones, labels, cores)
- Eventos para lidar com busca, tema e ações

### Estrutura

```bash
src/components/layout/header/
├── Header.astro        # Componente principal
├── Search.astro        # Campo de busca
├── ThemeToggle.astro   # Alterna entre tema claro e escuro
├── ActionsMenu.astro   # Menu de ações personalizável
└── types.ts            # Definições de tipos e enums
```

### Uso Básico

```astro
---
import Header from '../components/layout/header/Header.astro';
---

<Header searchPlaceholder="Search..." class="sticky top-0 z-50" />
```

### Customização do Menu de Ações
1. Adicione a nova ação em ``types.ts`` (enum e objeto).
2. Inclua a ação no array de ``ActionsMenu.astro``.

Exemplo de nova ação "Settings":

```typescript
// types.ts
export const enum HeaderAction {
  Settings = 'settings'
}

export const HeaderActions = {
  Settings: 'settings'
} as const;
```

```astro
<!-- ActionsMenu.astro -->
const actions = [
  {
    action: HeaderActions.Settings,
    icon: `<path d="..."/>`,
    label: "Settings",
    color: "#666"
  }
];
```

### Eventos Disponíveis
- ``header:search:`` Emite o termo buscado.
- ``header:themeChange:`` Emite o tema atual (light ou dark).
- ``header:action:`` Emite a ação selecionada.

Exemplo em JavaScript:

```javascript
window.addEventListener('header:search', (e) => {
  console.log('Busca:', e.detail.query);
});

window.addEventListener('header:action', (e) => {
  if (e.detail.action === 'settings') {
    abrirSettings();
  }
});
```

### Estilização
- Base em Tailwind.
- Suporte a temas claro/escuro via classes e variáveis CSS.
- Ícones SVG integrados, podendo ser personalizados.

### Acessibilidade
- Labels ARIA
- Navegação por teclado
- Alto contraste
- Suporte a leitores de tela

## Documentação do Componente Sidebar

### Visão Geral

A ``Sidebar`` é um componente Astro responsável pela navegação lateral da aplicação. Ela exibe um conjunto de itens de menu organizados por seções (principal, sistema e rodapé), possui um botão para colapsar/expandir a área, persiste o estado atual (colapsado ou não) e oferece tooltips quando colapsada.

### Estrutura do Componente

```css
src/components/sidebar/
├── index.astro       # Componente principal da Sidebar
├── menu-link.astro   # Item individual do menu, exibindo ícone, label e tooltip
├── menu-data.ts      # Lista de itens do menu (label, ícone, link, seção)
├── types.ts          # Definições de tipos e interfaces do menu
├── constants.ts      # Constantes reutilizáveis (cores, classes, etc.)
└── controller.ts     # Lógica de colapso/expansão da sidebar e persistência de estado
```

### Responsabilidades de Cada Arquivo

- ``index.astro:``
    - Renderiza a estrutura principal da sidebar.
    - Exibe o logo, o botão de colapso e renderiza os itens de menu.
    - Gerencia estilos globais da sidebar, aplicando tema escuro (bg-gray-900, texto claro).
    - Organiza os itens do menu em seções (main, system, footer).

- ``menu-link.astro:``
    - Representa um item individual do menu.
    - Exibe ícone e label.
    - Mostra um tooltip ao passar o mouse, útil quando a sidebar está colapsada.

- ``menu-data.ts:``
    - Define um array de itens, cada um com label, href, ícone e seção.
    -  Segue a interface MenuItem descrita em types.ts.

- ``types.ts:``
    - Define a interface MenuItem e outros tipos relacionados.
    - Garante tipagem consistente para itens do menu e facilita manutenção.

- ``constants.ts:``
    - Armazena constantes reutilizáveis.
    - Pode incluir cores padrão, classes comuns ou chaves para local storage da sidebar.

- ``controller.ts:``
    - Lógica para controlar o estado (colapsado/expandido) da sidebar.
    - Persiste o estado no localStorage ou outro meio, para manter a preferência do usuário entre sessões.

### Interface do Menu
Exemplo de tipo definido em ``types.ts:``

```typescript
interface MenuItem {
  label: string;                   // Texto a ser exibido no menu
  href: string;                    // URL do link
  icon: string;                    // Ícone (SVG ou classe CSS)
  section: 'main' | 'system' | 'footer'; // Seção do menu
}
```

As seções podem ser:
- ``main:`` Navegação principal (ex.: Dashboard, Calendário)
- ``system:`` Itens de gerenciamento ou configuração do sistema
- ``footer:`` Links secundários (ex.: documentação)

### Customização do Menu
1. Adicionando um novo item de menu:
- Inclua o novo item em menu-data.ts, seguindo a interface MenuItem.

Exemplo:

```typescript
{
  label: 'Relatórios',
  href: '/reports',
  icon: 'icon-report',
  section: 'main'
}
```

2. Removendo um item:
- Basta removê-lo de ``menu-data.ts``.

3. Alterando ícone ou label:
- Edite as propriedades do item correspondente em ``menu-data.ts``.

### Persistência do Estado

A sidebar pode estar expandida ou colapsada. Esse estado é controlado por ``controller.ts`` que:
- Escuta eventos ou cliques no botão de colapso.
- Atualiza a classe CSS da sidebar conforme o estado.
- Persiste a preferência do usuário (por exemplo, usando ``localStorage``).

### Eventos e Interações
- Colapso/Expansão:
Ao clicar no botão de colapso, o estado é alternado. Itens do menu continuam funcionais, mas exibem tooltips quando a sidebar está colapsada.

- Tooltips:
Ao passar o mouse sobre um item da sidebar colapsada, um tooltip mostra o label do item, garantindo usabilidade.

### Estilização
- Tema principal em tom escuro (bg-gray-900, texto em cinza claro e branco).
- Uso de Tailwind CSS para responsividade, espaçamentos e cores.
- Ícones podem ser gerenciados como SVG inline ou classes de fontes de ícones.

### Acessibilidade
- Oferece tooltips para auxiliar usuários em layouts colapsados.
- Itens possuem rótulos textuais (visíveis quando não colapsado).
- Pode-se adicionar atributos ARIA para aprimorar a navegabilidade por leitores de tela.

### Exemplo de Uso
Em Layout.astro, por exemplo:

```astro
---
import Sidebar from '../components/sidebar/index.astro';
import Header from '../components/layout/header/Header.astro';
---

<Sidebar slot="sidebar" />
<Header slot="header" />
<main class="p-4">
  <!-- Conteúdo da página -->
</main>
```

A sidebar será renderizada no slot ``"sidebar"`` definido pelo layout, permitindo que a página principal seja exibida ao lado.
