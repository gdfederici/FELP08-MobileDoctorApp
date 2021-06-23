// IT_ Importare funzioni. | EN_ Import functions.
import { createSimpleContent } from './functions';
import { tabulaRasa } from './functions';
import { goMain } from './functions';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Cancella il contenuto e crea la pagina introduttiva. | EN_ Clear the content and create the introduction page.
export function pageIntro(servicesList, medicalStaff) {
    tabulaRasa("content");
    document.getElementById("content").appendChild(createPageIntro(servicesList, medicalStaff));
}
function createPageIntro(servicesList, medicalStaff) {
    const pageIntro = document.createElement("section");
    pageIntro.setAttribute("id", "page-intro");
    pageIntro.className = "page page-intro";
    pageIntro.appendChild(createSimpleContent("h1", "Choose the doctor you want"));
    pageIntro.appendChild(createSimpleContent("p", "Lorem ipsum dolor amet, consectetur adipiscing inet deli"));
    const pageIntroButton = document.createElement("button");
    pageIntroButton.className = "button button__typo1 page-intro-button";
    pageIntroButton.onclick = function() { goMain(servicesList, medicalStaff); };
    pageIntroButton.appendChild(document.createTextNode("Get started"));
    pageIntro.appendChild(pageIntroButton);
    return pageIntro;
}