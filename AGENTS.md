# AGENTS.md

Small React Router v7 course project (React 19 + TypeScript + Vite 8). No backend, no tests, no env files.

## Commands

- `npm run dev` — Vite dev server
- `npm run lint` — ESLint; single file: `npx eslint src/pages/Blogpage.tsx`
- `npm run build` — `tsc -b && vite build`; this is the only typecheck. Run it after changing types or routes, but expect the baseline errors below.
- `npm run preview` — serve `dist/`
- There is no test script or test framework; do not invent one.

## Known baseline failures

- `npm run lint` fails on `src/hoc/AuthProvider.tsx`: `react-refresh/only-export-components` because the context and provider are exported from one file.
- `npm run build` fails on pre-existing implicit-`any`/context typing errors in `BlogFilter`, `CustomLink`, `AuthProvider`, `RequireAuth`, `Blogpage`, `Singlepost`, `Createpostpage`, and `Loginpage`. Do not treat these as regressions.
- TypeScript 6.0 defaults to strict even though `tsconfig.app.json` does not set `strict`, so new untyped props/parameters will add build errors.

## Routing and architecture

- `src/main.tsx` mounts `<BrowserRouter>` around `App`.
- All routes are centralized in `src/App.tsx`; pages render inside `Layout` (`src/components/Layout.tsx`) via `<Outlet />`.
- Adding a page: create `src/pages/<Name>.tsx`, then add a child `<Route>` under the `/` route in `App.tsx`; unknown paths hit `Notfoundpage` via `path="*"`.
- `Aboutpage` demonstrates nested routes (`contacts`, `team`) with relative `<Link>`s.
- `CustomLink` derives the active class with `useMatch`; `end` is only true for `/`, so nested paths stay active.

## Auth

- Auth is client-side only: `src/hoc/AuthProvider.tsx` holds `user` in React state; consume it with `src/hook/useAuth.ts`.
- There is no persistence, validation, or API call — logging in accepts any username, and a reload logs the user out.
- Protect routes by wrapping the element in `RequireAuth` (`src/hoc/RequireAuth.tsx`), as done for `posts/new`. It redirects to `/login` with `state.from`, which `Loginpage` uses to return the user.
- Sign-in/sign-out take a callback that is invoked after the state update; follow that pattern.

## Data and filtering

- Pages fetch directly from `https://jsonplaceholder.typicode.com` (`Blogpage`, `Singlepost`); there is no data layer or env config.
- Blog filtering is URL-driven via `useSearchParams`, not local state: `post` filters by title substring and `latest` means `id >= 80`. Keep filter state in the URL and preserve the `BlogFilter` contract (`postQuery`, `latest`, `setSearchParams`).

## Conventions

- Page and child components are arrow functions (`App` is a function declaration). `Layout` is the one named export; everything else uses default exports.
- Page filenames are PascalCase but compound words are lowercase: `Homepage`, `Aboutpage`, `Blogpage`, `Singlepost`, `Createpostpage`, `Loginpage`, `Notfoundpage`. Match this when adding pages.
- `src/` code uses double quotes and semicolons; root config files (`vite.config.ts`, `eslint.config.js`) use single quotes without semicolons. Don't reformat across that boundary.
- Styling is plain global CSS in `src/styles/` (`reset.css`, `App.css`) plus `src/index.css`; no CSS modules or Tailwind.
- Most existing props are untyped, which is why the build fails. Type new code properly instead of copying untyped props; don't start a broad typing refactor unless asked. `verbatimModuleSyntax` is on, so type-only imports need `import type`.
- `main.tsx` imports `App.tsx` with the extension (allowed by `allowImportingTsExtensions`); that is valid here.
