import { createPageMain } from './page-main';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

export function pageIntro() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageIntro());
}

function createPageIntro() {
    let pageIntro = document.createElement("section");
    pageIntro.setAttribute("id", "page-intro");
    pageIntro.className = "page page-intro page__show";
    let pageIntroTitle = document.createElement("h1");
    pageIntroTitle.appendChild(document.createTextNode("Choose the doctor you want"));
    pageIntro.appendChild(pageIntroTitle);
    let pageIntroText = document.createElement("p");
    pageIntroText.appendChild(document.createTextNode("Lorem ipsum dolor amet, consectetur adipiscing inet deli"));
    pageIntro.appendChild(pageIntroText);
    let pageIntroButton = document.createElement("button");
    pageIntroButton.className = "button button__typo1 page-intro-button";
    pageIntroButton.onclick = function() { goMain(); };
    pageIntroButton.appendChild(document.createTextNode("Get started"));
    pageIntro.appendChild(pageIntroButton);
    return pageIntro;
}

function goMain() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageMain());
}