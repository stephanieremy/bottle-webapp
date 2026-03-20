# 🍷 Bottle me – Webapp

> Web application for wine cellar management, built with Angular 19.

Companion webapp to the [Bottle me](https://github.com/stephanieremy/bottleme) mobile app, built with React Native. Both consume the same Java Spring Boot backend via a REST API.

---

## ✨ Features

- 📋 **Wine list** — search and filter by type, appellation, vintage
- 🔍 **Wine detail** — full information about a bottle
- ➕ **Add / edit** — complete form to manage your cellar

---

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (Standalone Components) |
| Language | TypeScript |
| Styling | SCSS |
| State | Signals + RxJS |
| HTTP | HttpClient + Interceptor |
| Forms | Reactive Forms |
| Component library | Storybook |
| Documentation | Compodoc |
| Backend | [Bottle me API](https://github.com/stephanieremy/bottle-backend) — Java Spring Boot |
| Database | MongoDB |

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── core/                        # Singleton services, interceptors
│   │   ├── services/
│   │   └── interceptors/
│   ├── shared/                      # Reusable components, pipes and models
│   │   ├── components/
│   │   │   ├── atoms/               # Base UI components (Button, Input, Badge...)
│   │   │   ├── molecules/           # Composite components (WineCard, StatCell...)
│   │   │   └── layout/              # Header, Footer
│   │   ├── pipes/
│   │   └── models/
│   └── features/                    # Lazy-loaded feature modules
│       ├── wine-list/
│       ├── wine-detail/
│       └── wine-form/
└── styles/                          # Global SCSS variables and tokens
```

The app follows a **feature-based architecture** with lazy loading, using Angular 19 **Standalone Components**.

---

## 🚀 Getting started

### Prerequisites

- Node.js >= 22.12
- Angular CLI >= 19
- Bottle me API running on `http://localhost:8080`

### Installation

```bash
git clone https://github.com/stephanieremy/bottle-webapp
cd bottle-webapp
npm install
```

### Development

```bash
ng serve
```

App available at `http://localhost:4200`.

### Storybook

```bash
npm run storybook
```

Component library available at `http://localhost:6006`.

### Build

```bash
ng build
```

---

## 🔗 Related projects

- [Bottle me Mobile](https://github.com/stephanieremy/bottleme) — React Native app
- [Bottle me API](https://github.com/stephanieremy/bottle-backend) — Java Spring Boot backend

---
