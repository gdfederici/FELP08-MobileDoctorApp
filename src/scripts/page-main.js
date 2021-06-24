// IT_ Importare funzioni. | EN_ Import functions.
import { createImage, createSimpleContent, tabulaRasa, magicMenu, createLink, goHere, goDoctor } from './functions';
// IT_ Importare immagini. | EN_ Import images.
import icoMenuHam from '../img/ico_menu.svg';
import icoProfile from '../img/ico_profile.svg';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Cancella il contenuto e crea la pagina principale con la lista completa dei dottori. | EN_ Clear the content and create the main page with the complete list of doctors.
export function createPageMain(servicesList, medicalStaff) {
    tabulaRasa("content");
    const pageMain = document.createElement("section");
    pageMain.setAttribute("id", "page-main");
    pageMain.className = "page page-main";
    pageMain.appendChild(pageMainHeader());
    pageMain.appendChild(pageMainFind(medicalStaff));
    pageMain.appendChild(pageMainCategories(servicesList, medicalStaff));
    pageMain.appendChild(pageMainDoctors(medicalStaff, servicesList, medicalStaff));
    return pageMain;
}

// IT_ Crea la testata della pagina con la navigazione. | EN_ Create the page header with navigation.
function pageMainHeader() {
    const mainHeader = document.createElement("header");
    mainHeader.className = "page-main-navbar navbar";
    mainHeader.appendChild(pageMainNav());
    mainHeader.appendChild(pageMainAvatar());
    return mainHeader;
}
function pageMainNav() {
    const mainNav = document.createElement("nav");
    mainNav.setAttribute("id", "hamburgerNav");
    mainNav.className = "navbar-menu";
    const mainNavMenu = document.createElement("ul");
    mainNavMenu.appendChild(mainNavSpecial());
    for (let i=0; i<3; i++) { mainNavMenu.appendChild(createLink()); }
    mainNav.appendChild(mainNavMenu);
    return mainNav;
}
// IT_ L'elemento speciale per il menu mobile. | EN_ The special element for the mobile menu.
function mainNavSpecial() {
    const mainNavSpecialItem = document.createElement("li");
    const mainNavSpecialLink = document.createElement("a");
    mainNavSpecialLink.setAttribute("id", "hamburgerMenu");
    mainNavSpecialLink.className = "icon";
    mainNavSpecialLink.onclick = function() { magicMenu("hamburgerNav", "navbar-menu__responsive"); }
    mainNavSpecialLink.appendChild(createImage(icoMenuHam, 27, 11, "Hamburger menu icon"));
    mainNavSpecialItem.appendChild(mainNavSpecialLink);
    return mainNavSpecialItem;
}

// IT_ Avatar utente. | EN_ User avatar.
function pageMainAvatar() {
    const mainAvatar = document.createElement("a");
    mainAvatar.href = "javascript:void(0);"
    mainAvatar.onclick = function() { goHere(); }
    mainAvatar.appendChild(createImage(icoProfile, 43, 42, "User avatar"));
    return mainAvatar;
}

// IT_ La sezione contenente il form di ricerca. | EN_ The section containing the search form.
function pageMainFind(medicalStaff) {
    const mainFinder = document.createElement("div");
    mainFinder.appendChild(createSimpleContent("h1", "Find your desired doctor"));
    const searchBlock = document.createElement("div");
    searchBlock.setAttribute("id", "searchblock");
    searchBlock.appendChild(createMainForm(medicalStaff));
    mainFinder.appendChild(searchBlock);
    return mainFinder;
}
function createMainForm(medicalStaff) {
    const mainForm = document.createElement("form");
    mainForm.className = "search-form";
    //mainForm.action = "#";
    //mainForm.method = "get";
    const mainFormInputLabel = document.createElement("label");
    mainFormInputLabel.className = "onlyscreenreader";
    mainFormInputLabel.htmlFor = "searchdoctors";
    mainForm.appendChild(mainFormInputLabel);
    const mainFormInput = document.createElement("input");
    mainFormInput.setAttribute("id", "searchdoctors");
    mainFormInput.setAttribute("type", "text");
    mainFormInput.setAttribute("name", "searchdoctors");
    mainFormInput.setAttribute("placeholder", "Search for doctors");
    mainFormInput.setAttribute("required", "required");
    mainForm.appendChild(mainFormInput);
    const mainFormSubmit = document.createElement("button");
    mainFormSubmit.className = "button button__typo1 button__search";
    mainFormSubmit.onclick = function() { createNameFilterDoctorsList(document.getElementById("searchdoctors").value.toLowerCase(), medicalStaff); };
    mainForm.appendChild(mainFormSubmit);
    return mainForm;
}
// IT_ Funzione di ricerca testuale nei nomi dei dottori. In caso di successo mostra i risultati e il bottone per resettare i filtri di ricerca, altrimenti solo il bottone.
// EN_ Text search function in doctors' names. If successful, it shows the results and the button to reset the search filters, otherwise just the button.
function createNameFilterDoctorsList(name, medicalStaff) {
    //let medicalFilter = medicalStaff.filter(Doctor => (Doctor.firstname + " " + Doctor.lastname).toLowerCase().indexOf(name) > -1); //IT_ Controlla la presenza della stringa nel nome+cognome del dottore, tutto in minuscolo. In caso di assenza restituisce -1 così prendiamo solo quelli che restituiscono valore superiore.
    let medicalFilter = medicalStaff.filter(Doctor => (`${Doctor.firstname} ${Doctor.lastname}`).toLowerCase().indexOf(name) > -1); //IT_ Controlla la presenza della stringa nel nome+cognome del dottore, tutto in minuscolo. In caso di assenza restituisce -1 così prendiamo solo quelli che restituiscono valore superiore.
    tabulaRasa("doclist"); // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    if ( medicalFilter !== [] ) {
        document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter)); // IT_ Si ricrea la lista con solo i dottori selezionati. | EN_ The list is recreated with only the selected doctors.
    }
    document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff)); // IT_ Si aggiunge il bottone di reset. | EN_ The reset button is added.
}

// IT_ La sezione contenente la lista delle categorie. | EN_ The section containing the list of categories.
function pageMainCategories(servicesList, medicalStaff) {
    const mainCategories = document.createElement("div");
    mainCategories.setAttribute("id", "categories");
    mainCategories.className = "categories";
    mainCategories.appendChild(createSimpleContent("h3", "Categories"));
    mainCategories.appendChild(createCategoriesList(servicesList, medicalStaff));
    return mainCategories;
}
// IT_ Crea lista delle categorie. | EN_ Create category list.
function createCategoriesList(servicesList, medicalStaff) {
    const allCategories = servicesList.length;
    const categoriesList = document.createElement("ul");
    categoriesList.className = "categories-boxes";
    for (let i=0; i<allCategories; i++) {
        categoriesList.appendChild(createCategoriesItem(servicesList[i].catname, i, medicalStaff));
    }
    return categoriesList;
}
// IT_ Crea singolo elemento della lista categorie. | EN_ Create single item of category list.
function createCategoriesItem(name, pos, medicalStaff) {
    const categoriesItem = document.createElement("li");
    categoriesItem.className = "categories-box";
    const categoriesLink = document.createElement("button");
    categoriesLink.className = "categories-box-button";
    categoriesLink.onclick = function() { createCatFilterDoctorsList(name, medicalStaff); };
    const categoryBox = document.createElement("div");
    categoryBox.className = "categories-box__" + ((pos%3)+1); // IT_ Differenzia la classe CSS per i dettagli grafici. | EN_ Differentiate the CSS class for graphic details.
    categoriesLink.appendChild(categoryBox);
    categoriesLink.appendChild(createSimpleContent("h4", name));
    categoriesItem.appendChild(categoriesLink);
    return categoriesItem;
}
// IT_ Funzione di filtro lista dottori per categoria di servizio. | EN_ Filter function for doctors list by service category.
function createCatFilterDoctorsList(cat, medicalStaff) {
    let medicalFilter = medicalStaff.filter(Doctor => Doctor.specialization === cat); // IT_ Si filtra l'array prendendo solo quelli corrispondenti, che vanno a creare un nuovo array. | EN_ The array is filtered by taking only the matching ones, which create a new array.
    tabulaRasa("doclist"); // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter)); // IT_ Si ricrea la lista con solo i dottori selezionati. | EN_ The list is recreated with only the selected doctors.
    document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff)); // IT_ Si aggiunge il bottone di reset. | EN_ The reset button is added.
}

// IT_ Aggiungo un bottone per resettare il filtro di selezione. | EN_ Add a button to reset the selection filter.
function resetButtonDoctors(medicalStaff) {
    const resetButton = document.createElement("button");
    resetButton.className = "button button__typo1 button__reset";
    resetButton.onclick = function() { resetDoctorsList(medicalStaff); };
    resetButton.appendChild(document.createTextNode("Reset Filters"));
    return resetButton;
}
function resetDoctorsList(medicalStaff) {
    tabulaRasa("searchblock"); // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("searchblock").appendChild(createMainForm(medicalStaff)); // IT_ Si ricrea il form vuoto. | EN_ The empty form is recreated.
    tabulaRasa("doclist"); // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("doclist").appendChild(createDoctorsList(medicalStaff)); // IT_ Si ricrea la lista con tutti i dottori. | EN_ Recreate the list with all the doctors.
}

// IT_ La sezione contenente la lista dei dottori. | EN_ The section containing the list of doctors.
function pageMainDoctors(doctorsToShow, servicesList, medicalStaff) {
    const mainDoctors = document.createElement("div");
    mainDoctors.setAttribute("id", "doctors");
    mainDoctors.className = "doctors";
    mainDoctors.appendChild(createSimpleContent("h3", "Top Doctors"));
    const docList = document.createElement("div");
    docList.setAttribute("id", "doclist");
    docList.appendChild(createDoctorsList(doctorsToShow, servicesList, medicalStaff));
    mainDoctors.appendChild(docList);
    return mainDoctors;
}
// IT_ Crea lista dottori. | EN_ Create doctor list.
function createDoctorsList(doctorsToShow, servicesList, medicalStaff) {
    const doctorsList = document.createElement("ul");
    doctorsList.className = "doctors-boxes";
    for (let i=0; i<doctorsToShow.length; i++) {
        doctorsList.appendChild(createDoctorsItem(doctorsToShow[i], i, servicesList, medicalStaff));
    }
    return doctorsList;
}
// IT_ Crea singolo elemento della lista dottori. | EN_ Create single element of the doctor list.
function createDoctorsItem(doctorToShow, pos, servicesList, medicalStaff) {
    const num = (pos%3)+1; // IT_ Per differenziare la classe CSS per i dettagli grafici. | EN_ To differentiate the CSS class for graphic details.
    const doctorsItem = document.createElement("li");
    const doctorsLink = document.createElement("button");
    doctorsLink.className = "doctors-box doctors-box__" + (num);
    doctorsLink.onclick = function() { goDoctor(doctorToShow.firstname, doctorToShow.lastname, doctorToShow.avatar, doctorToShow.specialization, doctorToShow.workplace, doctorToShow.about, servicesList, medicalStaff); };
    doctorsLink.appendChild(createImage(doctorToShow.avatar, 54, 66, "Avatar Doctor"));
    const doctorsInfo = document.createElement("div");
    doctorsInfo.appendChild(createSimpleContent("h5", "Dr. " + doctorToShow.firstname + " " + doctorToShow.lastname));
    doctorsInfo.appendChild(createSimpleContent("p", doctorToShow.specialization + " - " + doctorToShow.workplace));
    doctorsLink.appendChild(doctorsInfo);
    doctorsItem.appendChild(doctorsLink);
    return doctorsItem;
}