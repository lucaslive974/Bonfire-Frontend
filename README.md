# 🔥 Bonfire Monorepo — Municipal Infractions, Fines, and Registries

Bonfire is a modern, high-performance, and visually stunning government platform designed to manage consortiums, public transport lines, active fleet vehicles, traffic infractions, and administrative recourses (1st and 2nd instances).

Built on a **unified design system with glassmorphism and premium micro-animations**, Bonfire consolidates municipal workflows into a world-class user experience.

---

## 🎨 Visual Showcase

### 🖥️ Dashboard (Main Control Panel)
A dark-mode municipal traffic command center featuring active fleet metrics, real-time alert logs, and passenger volume analytics.

![Bonfire Dashboard Mockup](/apps/main/public/dashboard_mockup.png)

---

### 📥 Import Panel
A clean, modern, and auditable import panel that processes infraction and recourse CSV uploads, providing instant execution logs and status indicators.

![Bonfire Import Panel Mockup](/apps/main/public/import_mockup.png)

---

### 🔑 Secure Login Portal
A government access portal designed with vibrant orange/amber gradients and fully responsive, secure input fields.

![Bonfire Login Mockup](/apps/main/public/login_mockup.png)

---

## 🚀 Monorepo Architecture (Turborepo & Turbopack)

The project is structured as a modular, highly optimized monorepo using **Turborepo**, **Turbopack**, and **npm Workspaces**:

```mermaid
graph TD
    A[apps/main - Next.js 16 Portal] --> B[@bonfire/core - Services & Auth]
    A --> C[@bonfire/ui - Shared Visual Components]
    B --> D[Axios / SWR / NextAuth v5]
    C --> E[Design Tokens / Radix Components]
```

### 📁 Directory Layout
* **[`apps/main`](file:///home/lucaslima/Trabalho/Bonfire/frontend/apps/main)**: The primary operator portal built with **Next.js 16 (App Router)**, compiled at lightning speed in local development using **Turbopack** (`next dev --turbo`).
* **[`packages/core`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/core)**: Shared business logic, isomorphic HTTP clients (Axios/SWR), and authentication drivers (NextAuth v5 / Auth.js).
* **[`packages/ui`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/ui)**: The unified design system housing reusable UI components (React 19), responsive form layouts, dialog overlays, and shared design tokens.

---

## 💠 Design System Spotlight: The `SideBar` Component

The **[sidebar.tsx (packages/ui/src/components/ui)](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/ui/src/components/ui/sidebar.tsx)** is a highly responsive, collapsible sidebar component built with Radix primitives. It features smooth hover transition animations (`hover:translate-x-1`), full theme support (`bg-white/95 backdrop-blur-md dark:bg-zinc-950/95`), and active state highlighting using a tailored orange/amber styling:

```tsx
// Reusable Active Item Highlight Styles in the SideBar Component
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

## 🔒 Security Layer & Authentication Abstraction

To ensure the production application remains clean, modular, and completely decoupled from framework-specific authentication locks, all integrations with **NextAuth v5** and **Keycloak** are abstracted under **[`@bonfire/core`](file:///home/lucaslima/Trabalho/Bonfire/frontend/packages/core)**:

### 1. Cryptographic Token Encoding
* Houses secure encoding utilities mapped to modern NextAuth v5 token generation standards.
* Encrypts sessions as high-entropy **JWE (JSON Web Encryption)** payloads using derived keys via **HKDF (sha256)** from the application secret.

### 2. Edge-Compliant Middleware Validation
* Centralizes the core `authMiddleware` logic inside the shared package.
* The Next.js app imports the middleware directly from `@bonfire/core/src/services/auth/middleware`, ensuring complete compatibility with the strict **Next.js Edge Runtime** constraints without pulling in heavy Node.js-specific modules (avoiding build-time errors).

### 3. Claim Mapping & Session Decoding
* Implements isomorphic token decoders to decode claims (such as municipal roles, e.g., `Operador`) and expose them reactively to the React 19 frontend SWR drivers.

---

## 🧪 End-to-End Test Suite (Playwright)

We implemented a robust, ultra-fast E2E test suite validating all primary administrative dashboards (including consortia grids, vehicle additions, line registers, infractions, and recourses) with full reactive assertions:

* **Session Cookie Injection**: In authenticated specs, the test runner programmatically generates a secure session cookie (`next-auth.session-token`) cryptographically signed in **A256CBC-HS512** and derived via **HKDF** matching the production encryption standard.
* **Isomorphic Execution**: Gathers and injects cookies directly into the browser context. The encryption helper runs in isolated Playwright Node.js ESM processes using `@panva/hkdf` and `jose`, completely bypassing the infamous ESM `next/server` subpath resolution error without requiring brittle patches or volatile hacks in `node_modules`.

---

## 🛠️ Tech Stack

* **Main Framework**: Next.js 16 (React 19 & App Router)
* **Local Development Compiler**: Turbopack (`--turbo`) for near-instant compilation
* **Monorepo Manager**: Turborepo & npm Workspaces
* **Styling & Transitions**: Vanilla CSS (TailwindCSS in UI library) & Framer Motion for micro-interactions
* **Data Fetching**: Axios isomorphic instance & SWR (Stale-While-Revalidate) for reactive state updates
* **Identity & Session**: NextAuth.js v5 & Keycloak (OAuth2 / OIDC)
* **Validation & Forms**: Zod (equipped with automatic coercion to support native React 19 form submissions)
* **Testing Engine**: Playwright Test (running on native Google Chrome instances)

---

## 💻 Running the Project

All tasks, development servers, and test runs can be executed directly from the **monorepo root directory** using Turborepo:

### 📥 1. Start Development Server
Launches the Next.js portal and packages concurrently, boosted by **Turbopack**:
```bash
npm run dev
```

### 📦 2. Production Compilation (Build)
Compiles all workspace packages and builds the optimized Next.js bundle:
```bash
npm run build
```

### 🧪 3. Run E2E Test Suite (Playwright)

#### Route A: Background Headless Execution
Perfect for rapid local verifications and CI/CD pipelines:
```bash
npm run test:e2e
```

#### Route B: Interactive Visual UI Mode
Opens Playwright's visual dashboard showing step-by-step DOM snapshots, network inspector, and live runner logs:
```bash
npm run test:e2e:ui
```

#### Route C: Headed Window Execution
Opens a visible Google Chrome window, allowing you to watch the automated interactions in real time:
```bash
npm run test:e2e:headed
```