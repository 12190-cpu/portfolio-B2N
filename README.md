# 🍔 Burger2Nuit

## Présentation

Burger2Nuit est une application web de livraison de repas de nuit développée dans le cadre de mon projet de fin d'année.

L'objectif est de permettre aux clients de consulter le menu, vérifier les secteurs de livraison et contacter directement le livreur de leur secteur via WhatsApp, Snapchat ou téléphone.

Le projet possède également une interface d'administration permettant de gérer les produits et les secteurs de livraison.

---

# Fonctionnalités

## Client

- Consultation du menu
- Recherche de produits par nom, catégorie ou ingrédient
- Navigation par catégories
  - Burgers
  - Wraps
  - Plats
  - Desserts
  - Boissons
- Consultation des secteurs de livraison
- Recherche d'une ville
- Contact direct via :
  - WhatsApp
  - Snapchat
  - Téléphone

## Administrateur

Authentification sécurisée.

Gestion complète du contenu :

- Ajouter un produit
- Modifier un produit
- Supprimer un produit

Gestion des secteurs :

- Ajouter un secteur
- Modifier un secteur
- Supprimer un secteur

---

# Technologies utilisées

## Frontend

- React
- React Router DOM
- Axios
- CSS3

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Multer

## Base de données

MongoDB

ODM :

- Mongoose

---

# Architecture du projet

```
burger2nuit
│
├── backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   │
│   ├── public
│   │    └── images
│   │
│   ├── src
│   │    ├── assets
│   │    ├── components
│   │    ├── context
│   │    ├── pages
│   │    ├── services
│   │    ├── styles
│   │    ├── App.jsx
│   │    └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## Cloner le projet

```bash
git clone https://github.com/votre-compte/burger2nuit.git
```

Entrer dans le dossier

```bash
cd burger2nuit
```

---

# Installation du Backend

```bash
cd backend

npm install
```

Créer un fichier

```
.env
```

Ajouter :

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/burger2nuit

JWT_SECRET=VotreSecretUltraSecurise
```

Lancer le serveur

```bash
npm run dev
```

---

# Installation du Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Comptes administrateur

Premier administrateur :

```
Nom d'utilisateur

admin
```

```
Mot de passe

admin123
```

*(À modifier après la première connexion.)*

---

# API REST

## Produits

```
GET /api/products
```

Retourne tous les produits.

```
GET /api/products/:id
```

Retourne un produit.

```
POST /api/products
```

Ajoute un produit.

```
PUT /api/products/:id
```

Modifie un produit.

```
DELETE /api/products/:id
```

Supprime un produit.

---

## Secteurs

```
GET /api/sectors
```

```
POST /api/sectors
```

```
PUT /api/sectors/:id
```

```
DELETE /api/sectors/:id
```

---

## Authentification

```
POST /api/auth/login
```

```
POST /api/auth/logout
```

---

# Base de données

## Collection Products

```json
{
  "name": "B2N",
  "description": "Pain brioché, Double Cheddar...",
  "price": 8,
  "category": "Burger",
  "ingredients": [
    "Pain brioché",
    "Double Cheddar",
    "Poulet"
  ],
  "image": "b2n.jpg"
}
```

---

## Collection Sectors

```json
{
  "name": "Nord IDF",
  "cities": [
    "Cergy",
    "Pontoise"
  ],
  "phone": "+33600000000",
  "whatsapp": "https://wa.me/33600000000",
  "snapchat": "burger2nuit.nord",
  "image": "nord.jpg"
}
```

---

## Collection Admins

```json
{
    "username":"admin",
    "password":"hash"
}
```

---

# Responsive

Le site est entièrement compatible avec :

- Desktop
- Tablette
- Smartphone

---

# Fonctionnalités futures

- Paiement en ligne
- Géolocalisation
- Notifications
- Programme de fidélité
- Avis clients
- Gestion des commandes
- Statistiques administrateur

---

# Auteur

Projet réalisé par **Farid Gha** dans le cadre de son projet de fin d'année.

---

# Licence

Projet réalisé à des fins pédagogiques.