import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis } from "./avis.js";

let pieces = window.localStorage.getItem("pieces");
if(pieces === null) {
    // Récupération des pièces depuis le fichier JSON
    // const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json());

    const reponse = await fetch("http://localhost:8081/pieces");
    const pieces = await reponse.json();

    // Tranformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}



ajoutListenerEnvoyerAvis()

//Affichage de mes éléments

function genererPieces(pieces){
    for( let i = 0; i < pieces.length; i++){

        const article = pieces[i];
        // Récupération de l'élément qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
    
        // Création d'une balise dédiée à une pièce automobile.
        const pieceElement = document.createElement("article");
    
        //On crée les éléments .
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
    
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
    
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment";
    
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
    
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        // On rattache la balise article à la section Fiches
    
        sectionFiches.appendChild(pieceElement);
    
        // On rattache les éléments aux balises article
    
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);
        pieceElement.appendChild(avisBouton);
    }
    ajoutListenersAvis();
}

genererPieces(pieces);

for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON)

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}]`);
        
        afficherAvis(pieceElement, avis);
    }
}

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort(function(a,b){
        return a.prix - b.prix;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesOrdonnes);

})

const boutonTrierDecroissant = document.querySelector(".btn-trierDecroissant");
boutonTrierDecroissant.addEventListener("click", function(){
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort(function(a,b){
        return b.prix - a.prix;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesOrdonnes);
})

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
})

const boutonFiltrerDescription = document.querySelector(".btn-filtrerDescription");
boutonFiltrerDescription.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
})

const boutonFiltrerDisponible = document.querySelector(".btn-filtrerDisponible");
boutonFiltrerDisponible.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.disponibilite == true;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
})

const boutonSupprimerFiltre = document.querySelector(".btn-supprimerFiltres");
boutonSupprimerFiltre.addEventListener("click", function(){
    document.querySelector(".fiches").innerHTML="";
    genererPieces(pieces);
})

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    })
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
})

const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function(){
    window.localStorage.removeItem("pieces");
})

afficherGraphiqueAvis();