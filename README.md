# 🔥 Bonfire Monorepo — Infrações, Multas e Cadastros Municipais

Bonfire é uma plataforma governamental moderna, de alta performance e visualmente deslumbrante, projetada para gerenciar consórcios, linhas de transporte público, veículos da frota ativa, infrações de trânsito e recursos administrativos (1ª e 2ª instâncias).

Construído sobre um **design system com glassmorfismo e micro-animações premium**, o Bonfire unifica os fluxos municipais em uma experiência de usuário de nível internacional.

---

## 🎨 Galeria Visual (Showcase)

### 🖥️ Painel Principal (Dashboard)
Uma central de comando de trânsito municipal em modo escuro com indicadores da frota, alertas em tempo real e gráficos analíticos de volume de passageiros.

![Bonfire Dashboard Mockup](/apps/main/public/dashboard_mockup.png)

---

### 📥 Painel de Importação (Import Panel)
Um painel de importação limpo, moderno e auditável que gerencia uploads de CSV de infrações ou recursos e gera relatórios de processamento instantâneos.

![Bonfire Import Panel Mockup](/apps/main/public/import_mockup.png)

---

### 🔑 Tela de Autenticação Segura (Login)
Um portal de acesso governamental com gradientes vibrantes em tons de laranja/âmbar e campos de entrada totalmente responsivos e seguros.

![Bonfire Login Mockup](/apps/main/public/login_mockup.png)

---

## 🚀 Arquitetura do Monorepo (Turborepo)

O projeto está estruturado como um monorepo modular e otimizado utilizando **Turborepo** e **npm Workspaces**:

```mermaid
graph TD
    A[apps/main - Portal Next.js] --> B[@bonfire/core - Serviços & Auth]
    A --> C[@bonfire/ui - Componentes Visuais]
    B --> D[Axios / SWR / NextAuth]
    C --> E[Design Tokens / Componentes Radix]
```

### 📁 Estrutura de Diretórios
* **[`apps/main`](file:///home/lucaslima/Trabalho/Bonfire/frontend/apps/main)**: Aplicação Next.js 14 (App Router) que serve como o portal principal do operador municipal.
* **[`packages/core`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/core)**: Abstrações de lógica de negócios, clientes HTTP (Axios/SWR) e segurança da informação.
* **[`packages/ui`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/ui)**: Design System unificado, contendo componentes compartilhados de UI, formulários, modais, headers de página e tokens visuais.

---

## 💠 Destaque do Design System: Componente de Menu Lateral (`SideBar`)

O **[sidebar.tsx (packages/ui/src/components/ui)](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/ui/src/components/ui/sidebar.tsx)** é um componente altamente customizável e responsivo, construído com suporte a itens colapsáveis (`Collapsible`), animações suaves de transição no hover (`hover:translate-x-1`), temas claros/escuros (`bg-white/95 backdrop-blur-md dark:bg-zinc-950/95`) e destaque estilizado na cor laranja/âmbar quando ativo:

```tsx
// Exemplo de Estilização Reutilizável de Menu Ativo no SideBar
const sidebarItemStyles = {
  link: (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
      active
        ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 shadow-sm border-l-2 border-orange-500 rounded-l-none pl-2.5'
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-100 hover:translate-x-1'
    }`
}
```

---

## 🔒 Camada de Segurança e Abstrações de Autenticação

Para garantir que o código das aplicações permaneça 100% limpo, modular e desacoplado de dependências de terceiros, todas as integrações com o **NextAuth** e **Keycloak** foram abstraídas dentro de **[`@bonfire/core`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/core)**:

### 1. Criptografia de Cookies (`tokenEncoder.ts`)
* Define a interface genérica `ITokenEncoder` e a classe concreta `NextAuthTokenEncoder` para gerar e criptografar tokens em formato JWE utilizando a assinatura secreta do sistema.
* Utilizado de forma isolada pelas suítes de teste Playwright para plantar cookies reais e seguros no navegador.

### 2. Validação do Middleware (`middleware.ts`)
* Centraliza o `authMiddleware` na camada de core.
* As aplicações Next.js importam o middleware de forma direta e isolada (`@bonfire/core/src/services/auth/middleware`), garantindo compatibilidade absoluta com o **Next.js Edge Runtime** sem importar bibliotecas pesadas de terceiros (prevenindo erros de Webpack em tempo de build).

### 3. Decodificação de Tokens (`tokenDecoder.ts`)
* Implementa o `Base64TokenDecoder` para ler e injetar claims municipais (como cargo/role) diretamente na sessão ativa do usuário no frontend.

---

## 🧪 Suíte de Testes End-to-End (Playwright)

Implementamos uma suíte de testes ponta a ponta que valida de forma 100% fiel e rápida todas as páginas administrativas do Bonfire utilizando **Session Cookie Injection** (Injeção de Cookie de Sessão Criptografado):

* O arquivo de testes gera um token NextAuth JWE assinado de forma idêntica à de produção.
* O cookie `next-auth.session-token` is injetado diretamente no contexto do navegador.
* O middleware real de produção valida o cookie e libera as rotas. **Zero modificações de teste no código de produção!**

---

## 🛠️ Tecnologias Utilizadas

* **Framework Principal**: Next.js 14 (React 18 & App Router)
* **Gerenciamento do Monorepo**: Turborepo & npm Workspaces
* **Estilização & Design**: Vanilla CSS (TailwindCSS integrado em UI) & Framer Motion
* **Consumo de APIs**: Axios HTTP Client & SWR (Stale-While-Revalidate)
* **Segurança & Sessão**: NextAuth.js & Keycloak (OAuth2 / OIDC)
* **Validação de Schemas**: Zod
* **Testes End-to-End**: Playwright Test (Engine de execução Google Chrome)

---

## 💻 Como Rodar o Projeto

Todos os scripts de desenvolvimento e testes podem ser executados diretamente a partir do **diretório raiz do monorepo** utilizando o Turborepo:

### 📥 1. Iniciar Ambiente de Desenvolvimento
Roda todos os apps e pacotes em modo de desenvolvimento simultaneamente:
```bash
npm run dev
```

### 📦 2. Compilar para Produção (Build)
Compila todos os pacotes e gera os bundles Next.js otimizados:
```bash
npm run build
```

### 🧪 3. Executar Testes E2E (Playwright)

#### Rota A: Execução em Background (Headless)
Ideal para validações rápidas de terminal e pipelines CI/CD:
```bash
npm run test:e2e
```

#### Rota B: Depurador Visual Interativo (UI Mode)
Abre o painel visual oficial do Playwright com depurador de DOM, rastreador de rede e logs de tempo real:
```bash
npm run test:e2e:ui
```

#### Rota C: Execução Visível (Headed Mode)
Abre uma janela visível do Google Chrome para assistir aos cliques e testes sendo executados em alta velocidade:
```bash
npm run test:e2e:headed
```