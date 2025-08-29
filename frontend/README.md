# MeerStyle Frontend (CRA)

## Setup

- Node 18+
- Install deps:

```
npm ci
```

- Run dev server:

```
npm start
```

- Build:

```
npm run build
```

## Environment

- API base URL: set `REACT_APP_API_URL` (default: http://localhost:4000/api/v1)
- Optional: `REACT_APP_GOOGLE_ANALYTICS_ID`

## Notes

- Replaced Next.js-specific imports with React Router.
- Context providers are composed in `src/context/core/RootProvider.jsx` and wrapped in `src/index.js`.