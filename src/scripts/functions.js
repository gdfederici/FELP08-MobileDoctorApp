import { createPageMain } from './page-main';
import { createPageDoctor } from './page-doctor';

// IT_ Crea l'elemento immagine da inserire. | EN_ Create the image element to insert.
export function createImage(imgSrc, imgWidth, imgHeight, imgAlt, imgClass) {
    const newImage = new Image();
    newImage.className = imgClass;
    newImage.src = imgSrc;
    newImage.width = imgWidth;
    newImage.height = imgHeight;
    newImage.loading = "lazy";
    newImage.alt = imgAlt;
    return newImage;
}

// IT_ Crea un semplice contenuto testuale (titolo o paragrafo) a cui non devono essere applicati classi o altro. | EN_ 
export function createSimpleContent(tag, text) {
    let isContent = document.createElement(tag);
    isContent.appendChild(document.createTextNode(text));
    return isContent;
}

// IT_ Simula collegamento #. | EN_
export function goHere() {
    console.log("Do nothing");
}

export function goMain(servicesList, medicalStaff) {
    document.getElementById("content").appendChild(createPageMain(servicesList, medicalStaff));
}

export function goDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff) {
    document.getElementById("content").appendChild(createPageDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff));
}