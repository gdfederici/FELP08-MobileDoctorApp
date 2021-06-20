import '../css/style.scss';
import categoriesJson from './categories.json';
import doctorsJson from './doctors.json';
import icoMenuHam from '../img/ico_menu.svg';
import icoProfile from '../img/ico_profile.svg';
import icoMenuPoints from '../img/ico_points.svg';
import icoBack from '../img/ico_Back.svg';
import icoPhone from '../img/ico_phone.svg';
import icoMsg from '../img/ico_msg.svg';
import icoVideo from '../img/ico_video.svg';
import imgDocSmall1 from '../img/doc-small_1.svg';
import imgDocSmall2 from '../img/doc-small_2.svg';
import imgDocSmall3 from '../img/doc-small_3.svg';
import imgDocBig1 from '../img/doc-big_1.webp';
import imgDocBig2 from '../img/doc-big_2.webp';
import imgDocBig3 from '../img/doc-big_3.webp';



/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Classe singolo dottore. | EN_ 
class Doctor {
    constructor(firstname, lastname, avatarbig, avatarsmall, specialization, workplace, about) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatarbig = "img/" + avatarbig;
        this.avatarsmall = "img/" + avatarsmall;
        this.specialization = specialization;
        this.workplace = workplace;
        this.about = about;
    }
}
// IT_ Importo i dati dal file Json (perché voglio utilizzare le classi). | EN_ 
function createMedicalStaff() {
    const listDoctors = doctorsJson.doctorsList;
    const listDoctorsLength = listDoctors.length;
    let medicalStaff = [];
    for (let i=0; i<listDoctorsLength; i++) {
        medicalStaff.push(new Doctor(listDoctors[i].firstname, listDoctors[i].lastname, listDoctors[i].avatarbig, listDoctors[i].avatarsmall, listDoctors[i].specialization, listDoctors[i].workplace, listDoctors[i].about));
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
    let servicesList = [];
    for (let i=0; i<listCategoriesLength; i++) {
        servicesList.push(new Service(listCategories[i].name, listCategories[i].image));
    }
    return servicesList;
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Crea l'elemento immagine da inserire. | EN_ Create the image element to insert.
function createImage(imgSrc, imgWidth, imgHeight, imgAlt, imgClass) {
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
function createSimpleContent(tag, text) {
    let isContent = document.createElement(tag);
    isContent.appendChild(document.createTextNode(text));
    return isContent;
}

// IT_ Simula collegamento #. | EN_
function goHere() {
    console.log("Do nothing");
}

function goMain(servicesList, medicalStaff) {
    document.getElementById("content").appendChild(createPageMain(servicesList, medicalStaff));
}

function goDoctor(firstname, lastname, avatarbig, specialization, workplace, about) {
    document.getElementById("content").appendChild(createPageDoctor(firstname, lastname, avatarbig, specialization, workplace, about));
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

function pageIntro(servicesList, medicalStaff) {
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

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

function createPageMain(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    let pageMain = document.createElement("section");
    pageMain.setAttribute("id", "page-main");
    pageMain.className = "page page-main";
    pageMain.appendChild(pageMainHeader());
    pageMain.appendChild(pageMainFind());
    pageMain.appendChild(pageMainCategories(servicesList));
    pageMain.appendChild(pageMainDoctors(medicalStaff));
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
    mainNavSpecialLink.onclick = function() { magicHamMenu(); }
    mainNavSpecialLink.appendChild(createImage(icoMenuHam, 27, 11, "Hamburger menu icon", ""));
    mainNavSpecialItem.appendChild(mainNavSpecialLink);
    return mainNavSpecialItem;
}
function mainNavLink() {
    let mainNavItem = document.createElement("li");
    let mainNavLink = document.createElement("a");
    mainNavLink.appendChild(document.createTextNode("link"));
    mainNavLink.onclick = function() { goHere(); }
    mainNavItem.appendChild(mainNavLink);
    return mainNavItem;
}
function magicHamMenu() {
    document.getElementById("hamburgerNav").classList.toggle("navbar-menu__responsive"); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}
function pageMainAvatar() {
    let mainAvatar = document.createElement("a");
    mainAvatar.href = "javascript:void(0);"
    mainAvatar.onclick = function() { goHere(); }
    mainAvatar.appendChild(createImage(icoProfile, 43, 42, "User avatar", ""));
    return mainAvatar;
}

function pageMainFind() {
    let mainFinder = document.createElement("div");
    mainFinder.appendChild(createSimpleContent("h1", "Find your desired doctor"));
    let searchBlock = document.createElement("div");
    searchBlock.setAttribute("id", "searchblock");
    searchBlock.appendChild(createMainForm());
    mainFinder.appendChild(searchBlock);
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
    let mainFormSubmit = document.createElement("button");
    mainFormSubmit.className = "button button__typo1 button__search";
    mainFormSubmit.onclick = function() { createNameFilterDoctorsList(document.getElementById("searchdoctors").value.toLowerCase()); };
    mainForm.appendChild(mainFormInputLabel);
    mainForm.appendChild(mainFormInput);
    mainForm.appendChild(mainFormSubmit);
    return mainForm;
}

function pageMainCategories(servicesList) {
    let mainCategories = document.createElement("div");
    mainCategories.setAttribute("id", "categories");
    mainCategories.className = "categories";
    mainCategories.appendChild(createSimpleContent("h3", "Categories"));
    mainCategories.appendChild(createCategoriesList(servicesList));
    return mainCategories;
}
// IT_ Crea lista delle categorie. | EN_ 
function createCategoriesList(servicesList) {
    let allCategories = servicesList.length;
    let categoriesList = document.createElement("ul");
    categoriesList.className = "categories-boxes";
    for (let i=0; i<allCategories; i++) {
        categoriesList.appendChild(createCategoriesItem(servicesList[i].catname, i));
    }
    return categoriesList;
}
// IT_ Crea singolo elemento della lista categorie. | EN_ 
function createCategoriesItem(name, pos) {
    let categoriesItem = document.createElement("li");
    categoriesItem.className = "categories-box";
    let categoriesLink = document.createElement("button");
    categoriesLink.className = "categories-box-button";
    categoriesLink.onclick = function() { createCatFilterDoctorsList(name); };
    let categoryBox = document.createElement("div");
    categoryBox.className = "categories-box__" + ((pos%3)+1); // IT_ Differenzia la classe CSS per i dettagli grafici. | EN_ 
    categoriesLink.appendChild(categoryBox);
    categoriesLink.appendChild(createSimpleContent("h4", name));
    categoriesItem.appendChild(categoriesLink);
    return categoriesItem;
}
function createCatFilterDoctorsList(cat) {
    var medicalFilter = medicalStaff.filter(Doctor => Doctor.specialization === cat);
    document.getElementById("doclist").innerHTML = "";
    document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter));
    document.getElementById("doclist").appendChild(resetButtonDoctors());
}
function createNameFilterDoctorsList(name) {
    var medicalFilter = medicalStaff.filter(Doctor => (Doctor.firstname + " " + Doctor.lastname).toLowerCase().indexOf(name) > -1);
    if ( medicalFilter === [] ) {
        document.getElementById("doclist").innerHTML = "";
        document.getElementById("doclist").appendChild(resetButtonDoctors());
    } else {
        document.getElementById("doclist").innerHTML = "";
        document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter));
        document.getElementById("doclist").appendChild(resetButtonDoctors());
    }
}
function resetButtonDoctors() {
    let resetButton = document.createElement("button");
    resetButton.className = "button button__typo1 button__reset";
    resetButton.onclick = function() { resetDoctorsList(); };
    resetButton.appendChild(document.createTextNode("Reset Filters"));
    return resetButton;
}
function resetDoctorsList() {
    document.getElementById("searchblock").innerHTML = "";
    document.getElementById("searchblock").appendChild(createMainForm());
    document.getElementById("doclist").innerHTML = "";
    document.getElementById("doclist").appendChild(createDoctorsList(medicalStaff));
}

function pageMainDoctors(doctorsToShow) {
    let mainDoctors = document.createElement("div");
    mainDoctors.setAttribute("id", "doctors");
    mainDoctors.className = "doctors";
    mainDoctors.appendChild(createSimpleContent("h3", "Top Doctors"));
    let docList = document.createElement("div");
    docList.setAttribute("id", "doclist");
    docList.appendChild(createDoctorsList(doctorsToShow));
    mainDoctors.appendChild(docList);
    return mainDoctors;
}
// IT_ Crea lista dottori. | EN_ 
function createDoctorsList(doctorsToShow) {
    let doctorsList = document.createElement("ul");
    doctorsList.className = "doctors-boxes";
    for (let i=0; i<doctorsToShow.length; i++) {
        doctorsList.appendChild(createDoctorsItem(doctorsToShow[i], i));
    }
    return doctorsList;
}
// IT_ Crea singolo elemento della lista dottori. | EN_ 
function createDoctorsItem(doctorToShow, pos) {
    let num = (pos%3)+1; // IT_ Per differenziare la classe CSS per i dettagli grafici. | EN_ 
    let doctorsItem = document.createElement("li");
    let doctorsLink = document.createElement("button");
    doctorsLink.className = "doctors-box doctors-box__" + (num);
    doctorsLink.onclick = function() { goDoctor(doctorToShow.firstname, doctorToShow.lastname, doctorToShow.avatarbig, doctorToShow.specialization, doctorToShow.workplace, doctorToShow.about); };
    doctorsLink.appendChild(createImage(doctorToShow.avatarsmall, 54, 66, "Avatar Doctor", ""));
    let doctorsInfo = document.createElement("div");
    doctorsInfo.appendChild(createSimpleContent("h5", "Dr. " + doctorToShow.firstname + " " + doctorToShow.lastname));
    doctorsInfo.appendChild(createSimpleContent("p", doctorToShow.specialization + " - " + doctorToShow.workplace));
    doctorsLink.appendChild(doctorsInfo);
    doctorsItem.appendChild(doctorsLink);
    return doctorsItem;
}


/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/


function createPageDoctor(firstname, lastname, avatarbig, specialization, workplace, about) {
    document.getElementById("content").innerHTML = "";
    let pageDoctor = document.createElement("section");
    pageDoctor.setAttribute("id", "page-doctor");
    pageDoctor.className = "page page-doctor";
    pageDoctor.appendChild(pageDoctorNavbar());
    pageDoctor.appendChild(pageDoctorHeader(firstname, lastname, avatarbig, specialization, workplace));
    pageDoctor.appendChild(pageDoctorAbout(about));
    pageDoctor.appendChild(pageDoctorSchedules());
    return pageDoctor;
}
function pageDoctorNavbar() {
    let pageDoctorNavbar = document.createElement("div");
    pageDoctorNavbar.className = "page-doctor-navbar";
    let navDoc = document.createElement("div");
    navDoc.className = "navdoc";
    let navBack = document.createElement("div");
    let navBackLink = document.createElement("a");
    navBackLink.onclick = function() { goMain(servicesList, medicalStaff); }
    navBackLink.appendChild(createImage(icoBack, 11, 15, "Back icon", ""));
    navBack.appendChild(navBackLink);
    navDoc.appendChild(navBack);
    navDoc.appendChild(pageDoctorNav());
    pageDoctorNavbar.appendChild(navDoc);
    return pageDoctorNavbar;
}
function pageDoctorNav() {
    let doctorNav = document.createElement("nav");
    doctorNav.setAttribute("id", "pointsNav");
    doctorNav.className = "navdoc-menu";
    let doctorNavMenu = document.createElement("ul");
    doctorNavMenu.appendChild(doctorNavSpecial());
    for (let i=0; i<3; i++) { doctorNavMenu.appendChild(doctorNavLink()); }
    doctorNav.appendChild(doctorNavMenu);
    return doctorNav;
}
function doctorNavSpecial() {
    let doctorNavSpecialItem = document.createElement("li");
    let doctorNavSpecialLink = document.createElement("a");
    doctorNavSpecialLink.setAttribute("id", "pointsMenu");
    doctorNavSpecialLink.className = "icon";
    doctorNavSpecialLink.onclick = function() { magicPointsMenu(); }
    doctorNavSpecialLink.appendChild(createImage(icoMenuPoints, 5, 16, "Three points menu icon", ""));
    doctorNavSpecialItem.appendChild(doctorNavSpecialLink);
    return doctorNavSpecialItem;
}
function doctorNavLink() {
    let doctorNavItem = document.createElement("li");
    let doctorNavLink = document.createElement("a");
    doctorNavLink.appendChild(document.createTextNode("link"));
    doctorNavLink.onclick = function() { goHere(); }
    doctorNavItem.appendChild(doctorNavLink);
    return doctorNavItem;
}
function magicPointsMenu() {
    document.getElementById("pointsNav").classList.toggle("navdoc-menu__responsive"); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}
function pageDoctorHeader(firstname, lastname, avatarbig, specialization, workplace) {
    let doctorHeader = document.createElement("header");
    doctorHeader.className = "doctor-header";
    doctorHeader.appendChild(createImage(avatarbig, 88, 107, "Avatar doctor", ""));
    doctorHeader.appendChild(doctorInfo(firstname, lastname, specialization, workplace));
    return doctorHeader;
}
function doctorInfo(firstname, lastname, specialization, workplace) {
    let doctorInfo = document.createElement("div");
    doctorInfo.className = "doctor-info";
    let doctorInfoTitle = document.createElement("h2");
    doctorInfoTitle.appendChild(document.createTextNode("Dr. " + firstname + " " + lastname));
    doctorInfo.appendChild(doctorInfoTitle);
    let doctorInfoText = document.createElement("p");
    doctorInfoText.appendChild(document.createTextNode(specialization + " - " + workplace));
    doctorInfo.appendChild(doctorInfoText);
    doctorInfo.appendChild(doctorInfoLink(icoPhone, "Phone to doctor"));
    doctorInfo.appendChild(doctorInfoLink(icoMsg, "Message to doctor"));
    doctorInfo.appendChild(doctorInfoLink(icoVideo, "Video to doctor"));
    return doctorInfo;
}
function doctorInfoLink(image, altText) {
    let docInfoLink = document.createElement("a");
    docInfoLink.onclick = function() { goHere(); }
    docInfoLink.appendChild(createImage(image, 35, 35, altText, ""));
    return docInfoLink;
}  
function pageDoctorAbout(about) {
    let doctorAbout = document.createElement("div");
    doctorAbout.className = "doctor-about";
    doctorAbout.appendChild(createSimpleContent("h3", "About Doctor"));
    doctorAbout.appendChild(createSimpleContent("p", about));
    return doctorAbout;
}

function pageDoctorSchedules() {
    let doctorSchedules = document.createElement("div");
    doctorSchedules.className = "doctor-schedules";
    doctorSchedules.appendChild(createSimpleContent("h3", "Upcoming Schedules"));
    //doctorSchedules.appendChild(createSchedules());
    return doctorSchedules;
}
function createSchedules() {
    
}


/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

const medicalStaff = createMedicalStaff();
console.log(medicalStaff);
const servicesList = createServiceList();
console.log(servicesList);
isMobile() ? pageIntro(servicesList, medicalStaff) : noDesktop();
