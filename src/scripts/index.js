import '../css/style.scss';
import categoriesJson from './categories.json';
import doctorsJson from './doctors.json';
import icoMenu from '../img/ico_menu.svg';
import icoProfile from '../img/ico_profile.svg';
import imgDocSmall1 from '../img/doc-small_1.svg';
import imgDocSmall2 from '../img/doc-small_2.svg';
import imgDocSmall3 from '../img/doc-small_3.svg';
import imgDocBig1 from '../img/doc-big_1.webp';
import imgDocBig2 from '../img/doc-big_2.webp';
import imgDocBig3 from '../img/doc-big_3.webp';



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
    let servicesList = [];
    for (let i=0; i<listCategoriesLength; i++) {
        servicesList.push(new Service(listCategories[i].name, listCategories[i].image));
    }
    return servicesList;
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Crea l'elemento immagine da inserire. | EN_ Create the image element to insert.
function createImage(imgSrc, imgWidth, imgHeight, imgAlt, imgClass) {
    //let newImage = document.createElement("img");
    const newImage = new Image();
    newImage.className = imgClass;
    newImage.src = "img/" + imgSrc;
    newImage.width = imgWidth;
    newImage.height = imgHeight;
    newImage.loading = "lazy";
    newImage.alt = imgAlt;
    return newImage;
}

// IT_ Crea l'elemento titolo nella pagina Main. | EN_ 
function createPMainTitle(title) {
    let categoriesTitle = document.createElement("h3");
    categoriesTitle.appendChild(document.createTextNode(title));
    return categoriesTitle;
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

function pageIntro(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageIntro(servicesList, medicalStaff));
}
function createPageIntro(servicesList, medicalStaff) {
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
    pageIntroButton.onclick = function() { goMain(servicesList, medicalStaff); };
    pageIntroButton.appendChild(document.createTextNode("Get started"));
    pageIntro.appendChild(pageIntroButton);
    return pageIntro;
}

function goMain(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(createPageMain(servicesList, medicalStaff));
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

function createPageMain(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    let pageMain = document.createElement("section");
    pageMain.setAttribute("id", "page-main");
    pageMain.className = "page page-main page__show";
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
    mainNavSpecialLink.href = "javascript:void(0);"
    mainNavSpecialLink.onclick = magicHamMenu();
    mainNavSpecialLink.appendChild(createImage("ico_menu.svg", 27, 11, "Hamburger menu icon", ""));
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
    mainAvatar.appendChild(createImage("ico_profile.svg", 43, 42, "User avatar", ""));
    return mainAvatar;
}

function pageMainFind() {
    let mainFinder = document.createElement("div");
    let mainFinderTitle = document.createElement("h1");
    mainFinderTitle.appendChild(document.createTextNode("Find your desired doctor"));
    mainFinder.appendChild(mainFinderTitle);
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
    mainCategories.appendChild(createPMainTitle("Categories"));
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
    let categoryName = document.createElement("h4");
    categoryName.appendChild(document.createTextNode(name));
    categoriesLink.appendChild(categoryName);
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
    mainDoctors.appendChild(createPMainTitle("Top Doctors"));
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
    let doctorsLink = document.createElement("a");
    doctorsLink.className = "doctors-box doctors-box__" + (num);
    doctorsLink.href = "#";
    doctorsLink.appendChild(createImage(doctorToShow.avatarsmall, 54, 66, "Avatar Doctor", ""));
    let doctorsInfo = document.createElement("div");
    let doctorsInfoName = document.createElement("h5");
    doctorsInfoName.appendChild(document.createTextNode("Dr. " + doctorToShow.firstname + " " + doctorToShow.lastname));
    let doctoresInfoJob = document.createElement("p");
    doctoresInfoJob.appendChild(document.createTextNode(doctorToShow.specialization + " - " + doctorToShow.workplace));
    doctorsInfo.appendChild(doctorsInfoName);
    doctorsInfo.appendChild(doctoresInfoJob);
    doctorsLink.appendChild(doctorsInfo);
    doctorsItem.appendChild(doctorsLink);
    return doctorsItem;
}





/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

const medicalStaff = createMedicalStaff();
console.log(medicalStaff);
const servicesList = createServiceList();
console.log(servicesList);
isMobile() ? pageIntro(servicesList, medicalStaff) : noDesktop();
