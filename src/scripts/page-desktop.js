// IT_ Importare funzioni. | EN_ Import functions.
import { createImage, createSimpleContent, tabulaRasa } from './functions';
// IT_ Importare immagini. | EN_ Import images.
import qrCode from '../img/qrcode.png';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

export function noDesktop() {
    tabulaRasa("content");
    const pageDesktop = document.createElement("section");
    pageDesktop.setAttribute("id", "page-desktop");
    pageDesktop.className = "page-desktop";
    pageDesktop.appendChild(createSimpleContent("h1", "This is a Mobile App Simulation"));
    pageDesktop.appendChild(createSimpleContent("p", "Use a smartphone. QR code can be helpful."));
    pageDesktop.appendChild(createImage(qrCode, 300, 373, "QR Code"));
    document.getElementById("content").appendChild(pageDesktop);
}