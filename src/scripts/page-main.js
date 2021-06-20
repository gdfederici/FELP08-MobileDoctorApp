import { createImage } from './functions';
import { createSimpleContent } from './functions';
import { goHere } from './functions';
import { goDoctor } from './functions';

import icoMenuHam from '../img/ico_menu.svg';
import icoProfile from '../img/ico_profile.svg';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

export function createPageMain(servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    let pageMain = document.createElement("section");
    pageMain.setAttribute("id", "page-main");
    pageMain.className = "page page-main";
    pageMain.appendChild(pageMainHeader());
    pageMain.appendChild(pageMainFind(medicalStaff));
    pageMain.appendChild(pageMainCategories(servicesList, medicalStaff));
    pageMain.appendChild(pageMainDoctors(medicalStaff, servicesList, medicalStaff));
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

function pageMainFind(medicalStaff) {
    let mainFinder = document.createElement("div");
    mainFinder.appendChild(createSimpleContent("h1", "Find your desired doctor"));
    let searchBlock = document.createElement("div");
    searchBlock.setAttribute("id", "searchblock");
    searchBlock.appendChild(createMainForm(medicalStaff));
    mainFinder.appendChild(searchBlock);
    return mainFinder;
}
function createMainForm(medicalStaff) {
    let mainForm = document.createElement("form");
    mainForm.className = "search-form";
    //mainForm.action = "#";
    //mainForm.method = "get";
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
    mainFormSubmit.onclick = function() { createNameFilterDoctorsList(document.getElementById("searchdoctors").value.toLowerCase(), medicalStaff); };
    mainForm.appendChild(mainFormInputLabel);
    mainForm.appendChild(mainFormInput);
    mainForm.appendChild(mainFormSubmit);
    return mainForm;
}
function createNameFilterDoctorsList(name, medicalStaff) {
    var medicalFilter = medicalStaff.filter(Doctor => (Doctor.firstname + " " + Doctor.lastname).toLowerCase().indexOf(name) > -1);
    if ( medicalFilter === [] ) {
        document.getElementById("doclist").innerHTML = "";
        document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff));
    } else {
        document.getElementById("doclist").innerHTML = "";
        document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter));
        document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff));
    }
}

function pageMainCategories(servicesList, medicalStaff) {
    let mainCategories = document.createElement("div");
    mainCategories.setAttribute("id", "categories");
    mainCategories.className = "categories";
    mainCategories.appendChild(createSimpleContent("h3", "Categories"));
    mainCategories.appendChild(createCategoriesList(servicesList, medicalStaff));
    return mainCategories;
}
// IT_ Crea lista delle categorie. | EN_ 
function createCategoriesList(servicesList, medicalStaff) {
    let allCategories = servicesList.length;
    let categoriesList = document.createElement("ul");
    categoriesList.className = "categories-boxes";
    for (let i=0; i<allCategories; i++) {
        categoriesList.appendChild(createCategoriesItem(servicesList[i].catname, i, medicalStaff));
    }
    return categoriesList;
}
// IT_ Crea singolo elemento della lista categorie. | EN_ 
function createCategoriesItem(name, pos, medicalStaff) {
    let categoriesItem = document.createElement("li");
    categoriesItem.className = "categories-box";
    let categoriesLink = document.createElement("button");
    categoriesLink.className = "categories-box-button";
    categoriesLink.onclick = function() { createCatFilterDoctorsList(name, medicalStaff); };
    let categoryBox = document.createElement("div");
    categoryBox.className = "categories-box__" + ((pos%3)+1); // IT_ Differenzia la classe CSS per i dettagli grafici. | EN_ 
    categoriesLink.appendChild(categoryBox);
    categoriesLink.appendChild(createSimpleContent("h4", name));
    categoriesItem.appendChild(categoriesLink);
    return categoriesItem;
}
function createCatFilterDoctorsList(cat, medicalStaff) {
    var medicalFilter = medicalStaff.filter(Doctor => Doctor.specialization === cat);
    document.getElementById("doclist").innerHTML = "";
    document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter));
    document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff));
}

function resetButtonDoctors(medicalStaff) {
    let resetButton = document.createElement("button");
    resetButton.className = "button button__typo1 button__reset";
    resetButton.onclick = function() { resetDoctorsList(medicalStaff); };
    resetButton.appendChild(document.createTextNode("Reset Filters"));
    return resetButton;
}
function resetDoctorsList(medicalStaff) {
    document.getElementById("searchblock").innerHTML = "";
    document.getElementById("searchblock").appendChild(createMainForm(medicalStaff));
    document.getElementById("doclist").innerHTML = "";
    document.getElementById("doclist").appendChild(createDoctorsList(medicalStaff));
}

function pageMainDoctors(doctorsToShow, servicesList, medicalStaff) {
    let mainDoctors = document.createElement("div");
    mainDoctors.setAttribute("id", "doctors");
    mainDoctors.className = "doctors";
    mainDoctors.appendChild(createSimpleContent("h3", "Top Doctors"));
    let docList = document.createElement("div");
    docList.setAttribute("id", "doclist");
    docList.appendChild(createDoctorsList(doctorsToShow, servicesList, medicalStaff));
    mainDoctors.appendChild(docList);
    return mainDoctors;
}
// IT_ Crea lista dottori. | EN_ 
function createDoctorsList(doctorsToShow, servicesList, medicalStaff) {
    let doctorsList = document.createElement("ul");
    doctorsList.className = "doctors-boxes";
    for (let i=0; i<doctorsToShow.length; i++) {
        doctorsList.appendChild(createDoctorsItem(doctorsToShow[i], i, servicesList, medicalStaff));
    }
    return doctorsList;
}
// IT_ Crea singolo elemento della lista dottori. | EN_ 
function createDoctorsItem(doctorToShow, pos, servicesList, medicalStaff) {
    let num = (pos%3)+1; // IT_ Per differenziare la classe CSS per i dettagli grafici. | EN_ 
    let doctorsItem = document.createElement("li");
    let doctorsLink = document.createElement("button");
    doctorsLink.className = "doctors-box doctors-box__" + (num);
    doctorsLink.onclick = function() { goDoctor(doctorToShow.firstname, doctorToShow.lastname, doctorToShow.avatar, doctorToShow.specialization, doctorToShow.workplace, doctorToShow.about, servicesList, medicalStaff); };
    doctorsLink.appendChild(createImage(doctorToShow.avatar, 54, 66, "Avatar Doctor", ""));
    let doctorsInfo = document.createElement("div");
    doctorsInfo.appendChild(createSimpleContent("h5", "Dr. " + doctorToShow.firstname + " " + doctorToShow.lastname));
    doctorsInfo.appendChild(createSimpleContent("p", doctorToShow.specialization + " - " + doctorToShow.workplace));
    doctorsLink.appendChild(doctorsInfo);
    doctorsItem.appendChild(doctorsLink);
    return doctorsItem;
}