
## 📁 Project Structure

```

your-amazing-app/
├── **tests**/
│   ├── ComponentA.test.js
│   ├── ComponentB.test.js
│   └── ComponentC.test.js
│
├── actions/
│   ├── auth.ts
│   ├── search.ts
│   └── order.ts
│
├── app/
│   ├── someroute/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   └── apiroute/
│   │       └── route.ts
│   │
│   ├── blog/
│   │   ├── [dynamicroute]/
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ComponentA/
│   │   └── index.tsx
│   │
│   └── Buttons/
│       ├── PrimaryButton/
│       │   └── index.tsx
│       └── SecondaryButton/
│           └── index.tsx
│
├── containers/
│   ├── home-page/
│   │   ├── hero-section/
│   │   │   └── index.tsx
│   │   └── info-section/
│   │       └── index.tsx
│   │
│   └── blog-page/
│       ├── content-section/
│       └── index.tsx
│
├── db/
│   └── client.ts
│
├── hooks/
│   └── useSomeHook.tsx
│
├── libs/
│   ├── fonts.ts
│   └── utils.ts
│
├── public/
│   ├── fonts/
│   └── images/
│
├── services/
│   └── someHelperFunction.ts
│
├── store/
│   ├── useLayoutStore.ts
│   └── useUserStore.ts
│
├── styles/
│   └── global.css
│
├── types/
│   ├── User.ts
│   ├── Blog.ts
│   ├── Product.ts
│   └── Service.ts
│
└── README.md

````


## 📌 Key Concepts


Uses **Next.js App Router**:
- `page.tsx` – Route entry points
- `layout.tsx` – Shared layouts
- `loading.tsx` – Route-level loading UI
- `not-found.tsx` – 404 handling
- `api/` – API route handlers
- Dynamic routes via `[param]`

### `components/`
Reusable, presentation-focused UI components (buttons, UI blocks).

### `containers/`
Page-level compositions that wire together multiple components and business logic.

### `actions/`
Server or business logic actions (auth, search, orders, etc.).

### `store/`
Global state management (e.g. Zustand or similar).

### `hooks/`
Reusable custom React hooks.

### `services/`
Helper and service-layer logic (API calls, utilities).

### `db/`
Database client and configuration.

### `types/`
Shared TypeScript type definitions.

### `styles/`
Global CSS and styling entry points.

### `__tests__/`
Unit and component tests.

---

