[![DevSecOps Pipeline](https://github.com/BaayMeissa/Pipeline-DevSecOps-avec-GitHub-Actions/actions/workflows/security.yml/badge.svg)](https://github.com/BaayMeissa/Pipeline-DevSecOps-avec-GitHub-Actions/actions/workflows/security.yml)

# 🔒 DevSecOps Pipeline – Secure Node.js Application

## 📌 Description

Ce projet a pour objectif de mettre en place un pipeline **DevSecOps complet** avec **GitHub Actions** afin de :

* Automatiser la détection des vulnérabilités
* Sécuriser une application Node.js
* Implémenter les bonnes pratiques de sécurité (OWASP Top 10)
* Empêcher le déploiement de code vulnérable

---

## 🎯 Objectifs

✅ Mettre en place un pipeline CI/CD sécurisé
✅ Détecter les vulnérabilités automatiquement (SAST, SCA, Secrets, Container Scan, DAST)
✅ Corriger les failles de sécurité
✅ Appliquer les principes DevSecOps

---

## 🏗️ Architecture du projet

```
devsecops-lab/
│── src/
│   ├── server.js
│   └── package.json
│── .github/workflows/
│   └── security.yml
│── Dockerfile
│── .env.example
│── README.md
```

---

## 🚀 Pipeline DevSecOps

Le pipeline est déclenché à chaque :

* `push`
* `pull_request`

### 🔹 Étapes du pipeline

| Étape              | Outil          | Description             |
| ------------------ | -------------- | ----------------------- |
| 🏗 Build           | Docker         | Construction de l’image |
| 🔍 SAST            | Semgrep        | Analyse du code source  |
| 📦 SCA             | npm audit      | Scan des dépendances    |
| 🔐 Secrets         | Gitleaks       | Détection de secrets    |
| 🐳 Container Scan  | Trivy          | Scan image Docker       |
| ⚡ DAST (optionnel) | OWASP ZAP      | Scan dynamique          |
| 📊 Report          | GitHub Actions | Rapport global          |

---

## ⚠️ Vulnérabilités initiales

Avant correction, l’application contenait :

❌ Secrets hardcodés (API keys, DB)
❌ Mot de passe en clair (`admin/admin`)
❌ Aucune validation des entrées
❌ Endpoint `/debug` exposant des données sensibles
❌ Dépendances vulnérables
❌ Image Docker non sécurisée
❌ Absence de rate limiting

---

## 🛠️ Corrections appliquées

### 🔐 Gestion des secrets

* Suppression des secrets du code
* Utilisation de variables d’environnement (`.env`)
* Stockage sécurisé dans GitHub Secrets

---

### 🔑 Authentification sécurisée

* Utilisation de `JWT_SECRET` sécurisé
* Token avec expiration (`1h`)
* Préparation pour hash bcrypt

---

### 🛡️ Sécurité applicative

* Ajout de `helmet` (headers HTTP sécurisés)
* Validation des entrées avec `express-validator`
* Limitation de taille des requêtes

---

### 🚫 Protection brute force

* Rate limiting sur `/login`
* Blocage après plusieurs tentatives

---

### 🧼 Suppression des fuites

* Suppression du `/debug` en production
* Endpoint `/health` sécurisé

---

### 📦 Dépendances

* Mise à jour vers versions sécurisées
* Ajout de packages sécurité

---

### 🐳 Docker sécurisé

* Image `node:alpine`
* Utilisateur non-root
* Nettoyage cache npm
* Healthcheck

---

## 🔐 Variables d’environnement

Créer un fichier `.env` :

```
JWT_SECRET=your-super-secret-key-min-32-chars
ADMIN_USER=admin
ADMIN_PASS=strong-password
NODE_ENV=production
```

⚠️ Ne jamais commit `.env`

---

## 🔑 GitHub Secrets

Configurer dans :

`Settings > Secrets and variables > Actions`

| Nom        | Description       |
| ---------- | ----------------- |
| JWT_SECRET | Clé JWT sécurisée |
| ADMIN_USER | Nom admin         |
| ADMIN_PASS | Mot de passe fort |

---

## ▶️ Lancer le projet en local

```bash
# Installer dépendances
cd src
npm install

# Lancer serveur
node server.js
```

Accès :

```
http://localhost:3000
```

---

## 🐳 Docker

```bash
# Build
docker build -t secure-app .

# Run
docker run -p 3000:3000 secure-app
```

---

## 📊 Résultats du pipeline

### Avant correction ❌

* SAST : FAIL
* SCA : FAIL
* Secrets : FAIL
* Container Scan : FAIL

### Après correction ✅

* SAST : PASS
* SCA : PASS
* Secrets : PASS
* Container Scan : PASS

---

## 🧪 Tests de sécurité

### SAST

* Détection XSS, injections, mauvaises pratiques

### SCA

* CVE dans les dépendances npm

### Secrets

* Détection des clés API

### Container Scan

* Vulnérabilités OS/Docker

### DAST (optionnel)

* Scan dynamique avec OWASP ZAP

---

## 📈 Métriques

| Type                     | Avant | Après |
| ------------------------ | ----- | ----- |
| Vulnérabilités critiques | 5+    | 0     |
| Secrets exposés          | 3     | 0     |
| Dépendances vulnérables  | Oui   | Non   |

---

## 📚 Leçons apprises

* Ne jamais stocker de secrets dans le code
* Toujours valider les entrées utilisateur
* Mettre à jour les dépendances régulièrement
* Automatiser la sécurité dans le pipeline
* Appliquer le principe du moindre privilège
* Sécuriser les conteneurs Docker

---

## 🔒 Bonnes pratiques DevSecOps

✔ Security by Design
✔ Shift Left (sécurité dès le développement)
✔ Automatisation des scans
✔ Defense in Depth
✔ Zero Trust

---

## 📌 Améliorations possibles

* Ajouter bcrypt pour le hash des mots de passe
* Implémenter 2FA
* Ajouter WAF
* Monitoring (SIEM)
* CI/CD vers production sécurisée

---

## 🏁 Conclusion

Ce projet démontre l’importance d’intégrer la sécurité dans le cycle de développement logiciel.
Grâce au pipeline DevSecOps, les vulnérabilités sont détectées et corrigées automatiquement avant le déploiement.

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’un TP DevSecOps.

---

## 📎 Badge Pipeline

Ajoute ce badge :

```
![Security](https://github.com/<user>/<repo>/workflows/DevSecOps%20Pipeline/badge.svg)
```
