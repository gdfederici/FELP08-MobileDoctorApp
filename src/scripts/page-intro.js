import { createSimpleContent } from './functions';
import { goMain } from './functions';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

export function pageIntro(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageIntro(servicesList, medicalStaff));
}
function createPageIntro(servicesList, medicalStaff) {
    let pageIntro = document.createElement("section");
    pageIntro.setAttribute("id", "page-intro");
    pageIntro.className = "page page-intro page__show";
    pageIntro.appendChild(createSimpleContent("h1", "Choose the doctor you want"));
    pageIntro.appendChild(createSimpleContent("p", "Lorem ipsum dolor amet, consectetur adipiscing inet deli"));
    let pageIntroButton = document.createElement("button");
    pageIntroButton.className = "button button__typo1 page-intro-button";
    pageIntroButton.onclick = function() { goMain(servicesList, medicalStaff); };
    pageIntroButton.appendChild(document.createTextNode("Get started"));
    pageIntro.appendChild(pageIntroButton);
    return pageIntro;
}