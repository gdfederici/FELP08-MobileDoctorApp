// IT_ Importare funzioni. | EN_ Import functions.
import { createPageMain } from './page-main';
import { createPageDoctor } from './page-doctor';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Crea l'elemento immagine da inserire. | EN_ Create the image element to insert.
export function createImage(imgSrc, imgWidth, imgHeight, imgAlt) {
    const newImage = new Image();
    newImage.src = imgSrc;
    newImage.width = imgWidth;
    newImage.height = imgHeight;
    newImage.loading = "lazy";
    newImage.alt = imgAlt;
    return newImage;
}

// IT_ Crea un semplice contenuto testuale (titolo o paragrafo) a cui non devono essere applicati classi o altro. | EN_ Create a simple textual content (title or paragraph) to which no classes or anything else should be applied.
export function createSimpleContent(tag, text) {
    const isContent = document.createElement(tag);
    isContent.appendChild(document.createTextNode(text));
    return isContent;
}

// IT_ Simula collegamento #. | EN_ Simulate link #.
export function goHere() {
    console.log("Do nothing");
}

// IT_ Cancella tutto il contenuto. | EN_ Erase all content.
export function tabulaRasa(idReset) {
    document.getElementById(idReset).innerHTML = "";
}

// IT_ Mostra/nasconde il menu esteso. | EN_ Show/hide the extended menu.
export function magicMenu(idMenu, classMenu) {
    document.getElementById(idMenu).classList.toggle(classMenu); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}

// IT_ Link vuoti per simulazione nell'esercizio. | EN_ Empty links for simulation in the exercise.
export function createLink() {
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");
    navLink.appendChild(document.createTextNode("link"));
    navLink.onclick = function() { goHere(); }
    navItem.appendChild(navLink);
    return navItem;
}

// IT_ Per creare la pagina principale. | EN_ To create the main page.
export function goMain(servicesList, medicalStaff) {
    document.getElementById("content").appendChild(createPageMain(servicesList, medicalStaff));
}

// IT_ Per creare la pagina del singolo dottore. | EN_ To create the single doctor page.
export function goDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff) {
    document.getElementById("content").appendChild(createPageDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff));
}