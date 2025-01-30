# RestApiCICD

Antunes Daniel Project

&#x20;

API REST minimaliste pour gérer une To-Do List, avec des tests unitaires et end-to-end (E2E), CI/CD, et documentation automatique.

---

## **🛠️ Fonctionnalités**

- Création, consultation, mise à jour et suppression de tâches (CRUD).
- Stockage local simulé avec un fichier JSON.
- Documentation interactive avec Swagger.
- Tests unitaires (Jest) et end-to-end (Playwright).
- Pipeline CI/CD avec GitHub Actions.

---

## **🚀 Démarrage rapide**

### **1. Prérequis**

- Node.js version **18.x** ou supérieure
- npm installé avec Node.js
- GitHub CLI ou accès à un dépôt GitHub

### **2. Cloner le projet**

```bash
git clone https://github.com/yewolf1/RestApiCICD.git
cd RestApiCICD
```

### **3. Installer les dépendances**

```bash
npm install
```

### **4. Démarrer le serveur**

```bash
npm start
```

Le serveur démarre sur [http://localhost:3000](http://localhost:3000).

---

## **📚 Documentation**

La documentation de l'API est accessible via Swagger à l'adresse :\
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

---

## **🔍 Points d'API**

| Méthode | Endpoint         | Description                    |
| ------- | ---------------- | ------------------------------ |
| GET     | `/api/tasks`     | Récupère toutes les tâches     |
| GET     | `/api/tasks/:id` | Récupère une tâche par ID      |
| POST    | `/api/tasks`     | Crée une nouvelle tâche        |
| PUT     | `/api/tasks/:id` | Met à jour une tâche existante |
| DELETE  | `/api/tasks/:id` | Supprime une tâche par ID      |

---

## **🫠 Tests**

### **Tests unitaires (Jest)**

```bash
npm test
```

### **Tests end-to-end (Playwright)**

```bash
npx playwright test
```

---

## **🤖 Pipeline CI/CD**

Le pipeline CI/CD est défini dans le fichier `.github/workflows/ci-cd.yml`. Voici les étapes :

1. **Build** : Installation des dépendances.
2. **Tests unitaires** : Exécution des tests Jest.
3. **Tests E2E** : Exécution des tests Playwright.
4. **Déploiement** *(optionnel)*.

Pour chaque commit sur la branche `main`, GitHub Actions exécute automatiquement le pipeline.

---

## **🐄 Structure du projet**

```bash
RestApiCICD/
│
├── src/
│   ├── controllers/         # Contrôleurs de l'API
│   ├── models/              # Modèles de données
│   ├── routes/              # Définition des routes API
│   ├── services/            # Services (ex. gestion des tâches)
│   └── app.ts               # Configuration de l'application Express
│
├── tests/
│   ├── unit/                # Tests unitaires (Jest)
│   └── e2e/                 # Tests end-to-end (Playwright)
│
├── frontend/                  # Fichiers statiques (HTML, CSS, JS)
├── docs/                    # Documentation générée avec JSDoc
├── package.json             # Dépendances et scripts NPM
└── README.md                # Documentation du projet
```



