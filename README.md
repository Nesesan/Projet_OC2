# TéléSport - Dashboard des Jeux Olympiques

## Description

Le projet **TéléSport** est une application front-end dédiée à la visualisation des données des précédents Jeux Olympiques. 
L'objectif est de fournir un **dashboard interactif** sur le site de TéléSport afin d'accompagner leurs reportages durant les Jeux Olympiques à venir. 
Ce dashboard permet aux utilisateurs de consulter des informations détaillées, comme le nombre de médailles par pays, les performances des athlètes, et bien plus.

**Fonctionnalités principales :**
- Visualiser les statistiques des Jeux Olympiques précédents.
- Afficher le nombre de médailles par pays.
- Interface interactive, responsive (adaptée aux ordinateurs et aux appareils mobiles).
- Application développée avec **Angular CLI 18**, respectant les bonnes pratiques du framework.

## Prérequis

Avant de lancer l'application, vous devez disposer des éléments suivants :

- **Node.js** (version 16 ou supérieure) – [Télécharger Node.js](https://nodejs.org/).
- **Angular CLI 18** – Installer via npm :  npm install -g @angular/cli@18

## Installation

1 - Cloner le projet : git clone https://github.com/Nesesan/Projet_OC2.git

2 - Naviguer dans le répertoire du projet : cd Projet_OC2

3 - Installer les dépendances : npm install

4 - Lancer l'application : 

- Démarrer le serveur de développement avec la commande : ng serve

- Ouvrir l'application dans votre navigateur à l'adresse suivante : http://localhost:4200

5 - Accéder à l'application :
L'application sera automatiquement disponible dans votre navigateur. Vous pouvez désormais interagir avec le dashboard pour explorer les données des Jeux Olympiques précédents. 

## Structure du projet
src/app/services/ : Services Angular pour gérer les appels HTTP (utilisant HttpClient et RxJS).
src/app/components/ : Composants représentant différentes sections du dashboard (médaille par pays, graphiques, etc.).
src/app/models/ : Modèles pour typer les données récupérées via les API.
src/assets/ : Contient les images et fichiers statiques utilisés dans l'application.

## Bonnes pratiques

Ce projet respecte les bonnes pratiques Angular suivantes :

- Utilisation de services pour effectuer des appels HTTP, favorisant la réutilisabilité du code.
- RxJS et Observables utilisés pour la gestion des flux de données asynchrones.
- Unsubscription des observables dans les composants pour éviter les fuites de mémoire.
- Typage strict du code, en évitant l'utilisation de any.

## Développement & Contribution

Si vous souhaitez contribuer à ce projet, voici la procédure à suivre :

- Fork ce projet.
- Créez une branche pour votre fonctionnalité (git checkout -b feature-nom-de-fonctionnalité).
- Faites vos changements, puis commitez-les (git commit -am 'Ajout de la fonctionnalité').
- Poussez votre branche (git push origin feature-nom-de-fonctionnalité).
- Ouvrez une pull request.

## License
Ce projet est sous licence MIT.

