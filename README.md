# 🍷 Vinothèque – Webapp

> Application web de gestion de cave à vin, développée avec Angular 19.

Webapp complémentaire à l'application mobile [Vinothèque](https://github.com/ton-repo/vinotheque-mobile), construite en React Native. Elle consomme le même backend Java Spring Boot via une API REST.

---

## ✨ Fonctionnalités

- 📋 **Liste de vins** — recherche et filtrage par type, appellation, millésime
- 🔍 **Fiche détail** — toutes les informations d'une bouteille
- ➕ **Ajout / édition** — formulaire complet pour gérer sa cave

---

## 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| Framework | Angular 19 (Standalone Components) |
| Langage | TypeScript |
| Style | SCSS |
| State | Signals + RxJS |
| HTTP | HttpClient + Intercepteur |
| Formulaires | Reactive Forms |
| Backend | [Vinothèque API](https://github.com/ton-repo/vinotheque-backend) — Java Spring Boot |
| Base de données | MongoDB |

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── core/                  # Services singleton, intercepteurs
│   │   ├── services/
│   │   └── interceptors/
│   ├── shared/                # Composants, pipes et modèles réutilisables
│   │   ├── components/
│   │   ├── pipes/
│   │   └── models/
│   └── features/              # Modules fonctionnels (lazy-loaded)
│       ├── wine-list/
│       ├── wine-detail/
│       └── wine-form/
└── styles/                    # Variables SCSS globales
```

L'application suit une architecture **feature-based** avec lazy loading, en utilisant les **Standalone Components** d'Angular 17+.

---

## 🚀 Lancer le projet

### Prérequis

- Node.js >= 18
- Angular CLI >= 19
- Backend Vinothèque démarré sur `http://localhost:8080`

### Installation

```bash
git clone https://github.com/ton-repo/vinotheque-webapp
cd vinotheque-webapp
npm install
```

### Développement

```bash
ng serve
```

L'application sera disponible sur `http://localhost:4200`.

### Build

```bash
ng build
```

---

## 🔗 Projets liés

- [Vinothèque Mobile](https://github.com/stephanieremy/bottleme) — Application React Native
- [Vinothèque API](https://github.com/stephanieremy/bottle-backend) — Backend Java Spring Boot

