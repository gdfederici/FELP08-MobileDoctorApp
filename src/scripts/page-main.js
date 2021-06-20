// IT_ Importare funzioni. | EN_ Import functions.
import { createImage } from './functions';
import { createSimpleContent } from './functions';
import { goHere } from './functions';
import { goDoctor } from './functions';
// IT_ Importare immagini. | EN_ Import images.
import icoMenuHam from '../img/ico_menu.svg';
import icoProfile from '../img/ico_profile.svg';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Cancella il contenuto e crea la pagina principale con la lista completa dei dottori. | EN_ Clear the content and create the main page with the complete list of doctors.
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

// IT_ Crea la testata della pagina con la navigazione. | EN_ Create the page header with navigation.
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
// IT_ L'elemento speciale per il menu mobile. | EN_ The special element for the mobile menu.
function mainNavSpecial() {
    let mainNavSpecialItem = document.createElement("li");
    let mainNavSpecialLink = document.createElement("a");
    mainNavSpecialLink.setAttribute("id", "hamburgerMenu");
    mainNavSpecialLink.className = "icon";
    mainNavSpecialLink.onclick = function() { magicHamMenu(); }
    mainNavSpecialLink.appendChild(createImage(icoMenuHam, 27, 11, "Hamburger menu icon"));
    mainNavSpecialItem.appendChild(mainNavSpecialLink);
    return mainNavSpecialItem;
}
// IT_ Link vuoti per simulazione nell'esercizio. | EN_ Empty links for simulation in the exercise.
function mainNavLink() {
    let mainNavItem = document.createElement("li");
    let mainNavLink = document.createElement("a");
    mainNavLink.appendChild(document.createTextNode("link"));
    mainNavLink.onclick = function() { goHere(); }
    mainNavItem.appendChild(mainNavLink);
    return mainNavItem;
}
// IT_ Mostra/nasconde il menu esteso. | EN_ Show/hide the extended menu.
function magicHamMenu() {
    document.getElementById("hamburgerNav").classList.toggle("navbar-menu__responsive"); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}
function pageMainAvatar() {
    let mainAvatar = document.createElement("a");
    mainAvatar.href = "javascript:void(0);"
    mainAvatar.onclick = function() { goHere(); }
    mainAvatar.appendChild(createImage(icoProfile, 43, 42, "User avatar"));
    return mainAvatar;
}

// IT_ La sezione contenente il form di ricerca. | EN_ The section containing the search form.
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
// IT_ Funzione di ricerca testuale nei nomi dei dottori. In caso di successo mostra i risultati e il bottone per resettare i filtri di ricerca, altrimenti solo il bottone.
// EN_ Text search function in doctors' names. If successful, it shows the results and the button to reset the search filters, otherwise just the button.
function createNameFilterDoctorsList(name, medicalStaff) {
    var medicalFilter = medicalStaff.filter(Doctor => (Doctor.firstname + " " + Doctor.lastname).toLowerCase().indexOf(name) > -1); //IT_ Controlla la presenza della stringa nel nome+cognome del dottore, tutto in minuscolo. In caso di assenza restituisce -1 così prendiamo solo quelli che restituiscono valore superiore.
    if ( medicalFilter === [] ) {
        document.getElementById("doclist").innerHTML = ""; // IT_ Si cancella il contenuto. | EN_ The content is deleted.
        document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff)); // IT_ Si aggiunge il bottone di reset. | EN_ The reset button is added.
    } else {
        document.getElementById("doclist").innerHTML = ""; // IT_ Si cancella il contenuto. | EN_ The content is deleted.
        document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter)); // IT_ Si ricrea la lista con solo i dottori selezionati. | EN_ The list is recreated with only the selected doctors.
        document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff)); // IT_ Si aggiunge il bottone di reset. | EN_ The reset button is added.
    }
}

// IT_ La sezione contenente la lista delle categorie. | EN_ The section containing the list of categories.
function pageMainCategories(servicesList, medicalStaff) {
    let mainCategories = document.createElement("div");
    mainCategories.setAttribute("id", "categories");
    mainCategories.className = "categories";
    mainCategories.appendChild(createSimpleContent("h3", "Categories"));
    mainCategories.appendChild(createCategoriesList(servicesList, medicalStaff));
    return mainCategories;
}
// IT_ Crea lista delle categorie. | EN_ Create category list.
function createCategoriesList(servicesList, medicalStaff) {
    let allCategories = servicesList.length;
    let categoriesList = document.createElement("ul");
    categoriesList.className = "categories-boxes";
    for (let i=0; i<allCategories; i++) {
        categoriesList.appendChild(createCategoriesItem(servicesList[i].catname, i, medicalStaff));
    }
    return categoriesList;
}
// IT_ Crea singolo elemento della lista categorie. | EN_ Create single item of category list.
function createCategoriesItem(name, pos, medicalStaff) {
    let categoriesItem = document.createElement("li");
    categoriesItem.className = "categories-box";
    let categoriesLink = document.createElement("button");
    categoriesLink.className = "categories-box-button";
    categoriesLink.onclick = function() { createCatFilterDoctorsList(name, medicalStaff); };
    let categoryBox = document.createElement("div");
    categoryBox.className = "categories-box__" + ((pos%3)+1); // IT_ Differenzia la classe CSS per i dettagli grafici. | EN_ Differentiate the CSS class for graphic details.
    categoriesLink.appendChild(categoryBox);
    categoriesLink.appendChild(createSimpleContent("h4", name));
    categoriesItem.appendChild(categoriesLink);
    return categoriesItem;
}
// IT_ Funzione di filtro lista dottori per categoria di servizio. | EN_ Filter function for doctors list by service category.
function createCatFilterDoctorsList(cat, medicalStaff) {
    var medicalFilter = medicalStaff.filter(Doctor => Doctor.specialization === cat); // IT_ Si filtra l'array prendendo solo quelli corrispondenti, che vanno a creare un nuovo array. | EN_ The array is filtered by taking only the matching ones, which create a new array.
    document.getElementById("doclist").innerHTML = ""; // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("doclist").appendChild(createDoctorsList(medicalFilter)); // IT_ Si ricrea la lista con solo i dottori selezionati. | EN_ The list is recreated with only the selected doctors.
    document.getElementById("doclist").appendChild(resetButtonDoctors(medicalStaff)); // IT_ Si aggiunge il bottone di reset. | EN_ The reset button is added.
}

// IT_ Aggiungo un bottone per resettare il filtro di selezione. | EN_ Add a button to reset the selection filter.
function resetButtonDoctors(medicalStaff) {
    let resetButton = document.createElement("button");
    resetButton.className = "button button__typo1 button__reset";
    resetButton.onclick = function() { resetDoctorsList(medicalStaff); };
    resetButton.appendChild(document.createTextNode("Reset Filters"));
    return resetButton;
}
function resetDoctorsList(medicalStaff) {
    document.getElementById("searchblock").innerHTML = ""; // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("searchblock").appendChild(createMainForm(medicalStaff)); // IT_ Si ricrea il form vuoto. | EN_ The empty form is recreated.
    document.getElementById("doclist").innerHTML = ""; // IT_ Si cancella il contenuto. | EN_ The content is deleted.
    document.getElementById("doclist").appendChild(createDoctorsList(medicalStaff)); // IT_ Si ricrea la lista con solo tutti i dottori. | EN_ Recreate the list with just all the doctors.
}

// IT_ La sezione contenente la lista dei dottori. | EN_ The section containing the list of doctors.
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
// IT_ Crea lista dottori. | EN_ Create doctor list.
function createDoctorsList(doctorsToShow, servicesList, medicalStaff) {
    let doctorsList = document.createElement("ul");
    doctorsList.className = "doctors-boxes";
    for (let i=0; i<doctorsToShow.length; i++) {
        doctorsList.appendChild(createDoctorsItem(doctorsToShow[i], i, servicesList, medicalStaff));
    }
    return doctorsList;
}
// IT_ Crea singolo elemento della lista dottori. | EN_ Create single element of the doctor list.
function createDoctorsItem(doctorToShow, pos, servicesList, medicalStaff) {
    let num = (pos%3)+1; // IT_ Per differenziare la classe CSS per i dettagli grafici. | EN_ To differentiate the CSS class for graphic details.
    let doctorsItem = document.createElement("li");
    let doctorsLink = document.createElement("button");
    doctorsLink.className = "doctors-box doctors-box__" + (num);
    doctorsLink.onclick = function() { goDoctor(doctorToShow.firstname, doctorToShow.lastname, doctorToShow.avatar, doctorToShow.specialization, doctorToShow.workplace, doctorToShow.about, servicesList, medicalStaff); };
    doctorsLink.appendChild(createImage(doctorToShow.avatar, 54, 66, "Avatar Doctor"));
    let doctorsInfo = document.createElement("div");
    doctorsInfo.appendChild(createSimpleContent("h5", "Dr. " + doctorToShow.firstname + " " + doctorToShow.lastname));
    doctorsInfo.appendChild(createSimpleContent("p", doctorToShow.specialization + " - " + doctorToShow.workplace));
    doctorsLink.appendChild(doctorsInfo);
    doctorsItem.appendChild(doctorsLink);
    return doctorsItem;
}