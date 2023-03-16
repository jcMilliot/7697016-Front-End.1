# La bonne pièce

Code base du fil rouge pour le cours OpenClassrooms [Créez des pages web dynamiques avec JavaScript](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript)



## Installation

Après avoir cloné le repo vous avez plusieurs options pour lancer le projet. 

Si vous utiliser VSCode ou un autre éditeur de code avec une extersion de serveur web comme live server, vous pouvez lancer direcement votre site avec l'extension que vous utilisez habituellement. 

Dans le cas contraire vous pouvez installer les dépendances de ce projet avec `npm install` puis lancer le projet via la commande `npm start`. Vous verrez dans le termninal le lien vers le site (par defaut http://127.0.0.1:8080 )

## Détails

Le cours nous apprenait à créer un site web de pièce de voiture.
On allait chercher les informations via une API HTTP pour ensuite les afficher avec les informations que l'on voulait laisser apparaître.

Ensuite, on y ajoutait plusieurs petites fonctionnalités, des boutons pour trier par ordre ou encore afficher les produits disponibles en stock ainsi que la possibilité de laisser un avis.

On stockait et allait également chercher quand cela été possible les informations dans le local storage.

Pour finir, on affichait graphiquement les notes données par les utilisateurs à l'aide de la librairie `chart.js`.