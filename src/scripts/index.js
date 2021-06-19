import '../css/style.scss';
import categoriesJson from './categories.json';
import doctorsJson from './doctors.json';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Classe singolo dottore. | EN_ 
class Doctor {
    constructor(firstname, lastname, avatarbig, avatarsmall, specialization, workplace, phonenumber, msgnumber, videolink, about) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatarbig = avatarbig;
        this.avatarsmall = avatarsmall;
        this.specialization = specialization;
        this.workplace = workplace;
        this. phonenumber = phonenumber;
        this.msgnumber = msgnumber;
        this.videolink = videolink;
        this.about = about;
    }
}
// IT_ Importo i dati dal file Json (perché voglio utilizzare le classi). | EN_ 
function createMedicalStaff() {
    const listDoctors = doctorsJson.doctorsList;
    const listDoctorsLength = listDoctors.length;
    let medicalStaff = [];
    for (let i=0; i<listDoctorsLength; i++) {
        medicalStaff.push(new Doctor(listDoctors[i].firstname, listDoctors[i].lastname, listDoctors[i].avatarbig, listDoctors[i].avatarsmall, listDoctors[i].specialization, listDoctors[i].workplace, listDoctors[i].phonenumber, listDoctors[i].msgnumber, listDoctors[i].videolink, listDoctors[i].about));
    }
    return medicalStaff;
}

// IT_ Classe singola categoria. | EN_ 
class Service {
    constructor(catname, catimage) {
        this.catname = catname;
        this.catimage = catimage;
    }
}
// IT_ Importo i dati dal file Json (perché voglio utilizzare le classi). | EN_ 
function createServiceList() {
    const listCategories = categoriesJson.categoriesList;
    const listCategoriesLength = listCategories.length;
    let serviceList = [];
    for (let i=0; i<listCategoriesLength; i++) {
        serviceList.push(new Service(listCategories[i].catname, listCategories[i].catimage));
    }
    return serviceList;
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Crea l'elemento immagine da inserire. | EN_ Create the image element to insert.
function createImage(imgSrc, imgWidth, imgHeight, imgAlt, imgClass) {
    let newImage = document.createElement("img");
    newImage.className = imgClass;
    newImage.src = imgSrc;
    newImage.width = imgWidth;
    newImage.height = imgHeight;
    newImage.loading = "lazy";
    newImage.alt = imgAlt;
    return newImage;
}

// IT_ Simula collegamento #. | EN_
function goHere() {
    console.log("Do nothing");
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Controllo useragent per stabilire se è un dispositivo mobile (true). | EN_
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Viene mostrato in caso di accesso da desktop. | EN_
function noDesktop() {
    document.getElementById("content").innerHTML = "pippo";
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

function pageIntro(serviceList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageIntro(serviceList, medicalStaff));
}

function createPageIntro(serviceList, medicalStaff) {
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
    pageIntroButton.onclick = function() { goMain(serviceList, medicalStaff); };
    pageIntroButton.appendChild(document.createTextNode("Get started"));
    pageIntro.appendChild(pageIntroButton);
    return pageIntro;
}

function goMain(serviceList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageMain(serviceList, medicalStaff));
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

function createPageMain(serviceList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    let pageMain = document.createElement("section");
    pageMain.setAttribute("id", "page-main");
    pageMain.className = "page page-main page__show";
    pageMain.appendChild(pageMainHeader());
    pageMain.appendChild(pageMainFind());
    //pageMain.appendChild(pageMainCategories());
    //pageMain.appendChild(pageMainDoctors());
    return pageMain;
}
function pageMainHeader() {
    let mainHeader = document.createElement("header");
    mainHeader.className = "page-main-navbar navbar";
    mainHeader.appendChild(pageMainNav());
    mainHeader.appendChild(pageMainAvatar());
    return mainHeader;
}
function pageMainNav() {
    let mainNav = document.createElement("nav");
    mainNav.setAttribute("id", "hamburgerNav");
    mainNav.className = "navbar-menu";
    let mainNavMenu = document.createElement("ul");
    mainNavMenu.appendChild(mainNavSpecial());
    for (let i=0; i<3; i++) { mainNavMenu.appendChild(mainNavLink()); }
    mainNav.appendChild(mainNavMenu);
    return mainNav;
}
function mainNavSpecial() {
    let mainNavSpecialItem = document.createElement("li");
    let mainNavSpecialLink = document.createElement("a");
    mainNavSpecialLink.setAttribute("id", "hamburgerMenu");
    mainNavSpecialLink.className = "icon";
    mainNavSpecialLink.href = "javascript:void(0);"
    mainNavSpecialLink.onclick = magicHamMenu();
    mainNavSpecialLink.appendChild(createImage("img/ico_menu.svg", 27, 11, "Hamburger menu icon", ""));
    mainNavSpecialItem.appendChild(mainNavSpecialLink);
    return mainNavSpecialItem;
}
function mainNavLink() {
    let mainNavItem = document.createElement("li");
    let mainNavLink = document.createElement("a");
    mainNavLink.href = "javascript:void(0);"
    mainNavItem.appendChild(mainNavLink);
    return mainNavItem;
}
function magicHamMenu() {
    //document.getElementById("hamburgerNav").classList.toggle("navbar-menu__responsive"); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}
function pageMainAvatar() {
    let mainAvatar = document.createElement("a");
    mainAvatar.href = "javascript:void(0);"
    mainAvatar.onclick = goHere();
    mainAvatar.appendChild(createImage("img/ico_profile.svg", 43, 42, "User avatar", ""));
    return mainAvatar;
}

function pageMainFind() {
    let mainFinder = document.createElement("div");
    let mainFinderTitle = document.createElement("h1");
    mainFinderTitle.appendChild(document.createTextNode("Find your desired doctor"));
    mainFinder.appendChild(mainFinderTitle);
    mainFinder.appendChild(createMainForm());
    return mainFinder;
}
function createMainForm() {
    let mainForm = document.createElement("form");
    mainForm.className = "search-form";
    mainForm.action = "#";
    mainForm.method = "get";
    let mainFormInputLabel = document.createElement("label");
    mainFormInputLabel.className = "onlyscreenreader";
    mainFormInputLabel.htmlFor = "searchdoctors";
    let mainFormInput = document.createElement("input");
    mainFormInput.setAttribute("id", "searchdoctors");
    mainFormInput.setAttribute("type", "text");
    mainFormInput.setAttribute("name", "searchdoctors");
    mainFormInput.setAttribute("placeholder", "Search for doctors");
    mainFormInput.setAttribute("required", "required");
    let mainFormSubmit = document.createElement("input");
    mainFormSubmit.setAttribute("type", "submit");
    mainFormSubmit.setAttribute("name", "submit");
    mainFormSubmit.setAttribute("value", "");
    mainForm.appendChild(mainFormInputLabel);
    mainForm.appendChild(mainFormInput);
    mainForm.appendChild(mainFormSubmit);
    return mainForm;
}



function pageMainDoctors() {

}





/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

const medicalStaff = createMedicalStaff();
console.log(medicalStaff);
const serviceList = createServiceList();
console.log(serviceList);
isMobile() ? pageIntro(serviceList, medicalStaff) : noDesktop();
