# FLAG REPOSITORY

Application de Drapeaux du Monde

## DESCRIPTION

FlagRepository est une application web moderne et interactive qui permet d'explorer les drapeaux de tous les pays du monde. L'application offre une interface utilisateur élégante avec des fonctionnalités de recherche, de filtrage et de tri avancées.

Les données sont récupérées depuis l'API REST Countries et affichées de manière claire et organisée.

## INSTALLATION

Pour installer et lancer le projet localement, suivez ces étapes :

### Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt depuis GitHub** :
```bash
   git clone https://github.com/Maxaldo/projets_pays.git
   cd projets_pays
```

2. **Installer les dépendances** :
```bash
   npm install
```

3. **Créer le fichier `.env`** :
   - À la racine du projet, créez un fichier `.env`
   - Copiez le contenu du fichier `.env.example`   et ajoutez votre Api


4. **Lancer le serveur de développement** :
```bash
   npm run dev
```

5. **Ouvrir l'application** :
   - L'application sera accessible à l'adresse `http://localhost:5173`

### Commandes disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production optimisée

## TECHNOLOGIES UTILISÉES

- **React 19.2.0** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router DOM** - Gestion de la navigation et des routes
- **Vite** - Outil de build et serveur de développement
- **REST Countries API** - API pour récupérer les données des pays
- **CSS3** - Styles modernes avec animations et responsive design

## FONCTIONNALITÉS

### Affichage des drapeaux
- Liste complète de tous les pays du monde
- Cartes de pays avec drapeau, nom, capitale, région et population
- Design responsive et moderne

### Recherche
- Barre de recherche en temps réel
- Recherche par nom de pays
- Filtrage instantané des résultats

### Filtrage par couleur
- Filtrage des drapeaux par couleur dominante
- 7 couleurs disponibles : Rouge, Bleu, Vert, Jaune, Blanc, Noir, Orange
- Sélection multiple possible

### Tri
- Tri par nom (A-Z)
- Tri par population (croissante ou décroissante)
- Tri par continent/région

### Pagination
- Affichage de 20 pays par page
- Navigation avec boutons Précédent/Suivant
- Indicateur de page actuelle

### Page détail
- Page dédiée pour chaque pays
- Informations complètes : drapeau, nom officiel, capitale, population, région, sous-région, langues parlées, monnaies
- Navigation facile avec bouton retour

### Statistiques
- Affichage du nombre total de pays
- Affichage du nombre de pays filtrés/affichés


## NOMS
- TSIELA Cheridanh
- SOGBOSSI Max Ronaldo
- BOUKEROUI Adam
- GHINIA Aymen
