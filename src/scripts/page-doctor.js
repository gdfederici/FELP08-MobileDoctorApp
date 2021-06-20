// IT_ Importare funzioni. | EN_ Import functions.
import { createImage } from './functions';
import { createSimpleContent } from './functions';
import { goHere } from './functions';
import { goMain } from './functions';
// IT_ Importare immagini. | EN_ Import images.
import icoMenuPoints from '../img/ico_points.svg';
import icoBack from '../img/ico_Back.svg';
import icoPhone from '../img/ico_phone.svg';
import icoMsg from '../img/ico_msg.svg';
import icoVideo from '../img/ico_video.svg';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Cancella il contenuto e crea la pagina del singolo dottore. | EN_ Erase the content and create the single doctor page.
export function createPageDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff) {
    document.getElementById("content").innerHTML = "";
    let pageDoctor = document.createElement("section");
    pageDoctor.setAttribute("id", "page-doctor");
    pageDoctor.className = "page page-doctor";
    pageDoctor.appendChild(pageDoctorNavbar(servicesList, medicalStaff));
    pageDoctor.appendChild(pageDoctorHeader(firstname, lastname, avatar, specialization, workplace));
    pageDoctor.appendChild(pageDoctorAbout(about));
    pageDoctor.appendChild(pageDoctorSchedules());
    return pageDoctor;
}

// IT_ Crea la navigazione della pagina. | EN_ Create the page navigation.
function pageDoctorNavbar(servicesList, medicalStaff) {
    let pageDoctorNavbar = document.createElement("div");
    pageDoctorNavbar.className = "page-doctor-navbar";
    let navDoc = document.createElement("div");
    navDoc.className = "navdoc";
    let navBack = document.createElement("div");
    let navBackLink = document.createElement("a");
    navBackLink.onclick = function() { goMain(servicesList, medicalStaff); }
    navBackLink.appendChild(createImage(icoBack, 11, 15, "Back icon"));
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
// IT_ L'elemento speciale per il menu mobile. | EN_ The special element for the mobile menu.
function doctorNavSpecial() {
    let doctorNavSpecialItem = document.createElement("li");
    let doctorNavSpecialLink = document.createElement("a");
    doctorNavSpecialLink.setAttribute("id", "pointsMenu");
    doctorNavSpecialLink.className = "icon";
    doctorNavSpecialLink.onclick = function() { magicPointsMenu(); }
    doctorNavSpecialLink.appendChild(createImage(icoMenuPoints, 5, 16, "Three points menu icon"));
    doctorNavSpecialItem.appendChild(doctorNavSpecialLink);
    return doctorNavSpecialItem;
}
// IT_ Link vuoti per simulazione nell'esercizio. | EN_ Empty links for simulation in the exercise.
function doctorNavLink() {
    let doctorNavItem = document.createElement("li");
    let doctorNavLink = document.createElement("a");
    doctorNavLink.appendChild(document.createTextNode("link"));
    doctorNavLink.onclick = function() { goHere(); }
    doctorNavItem.appendChild(doctorNavLink);
    return doctorNavItem;
}
// IT_ Mostra/nasconde il menu esteso. | EN_ Show/hide the extended menu.
function magicPointsMenu() {
    document.getElementById("pointsNav").classList.toggle("navdoc-menu__responsive"); //IT_ Aggiunge/rimuove la classe per la visualizzazione del menu. | EN_ Add/remove the class for the menu display.
}

// IT_ Crea la testata della pagina. | EN_ Create the page header.
function pageDoctorHeader(firstname, lastname, avatar, specialization, workplace) {
    let doctorHeader = document.createElement("header");
    doctorHeader.className = "doctor-header";
    doctorHeader.appendChild(createImage(avatar, 88, 107, "Avatar doctor"));
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
// IT_ Sono tutti uguali perché non c'è azione specifica nell'esercizio. | EN_ They are all the same because there is no specific action in the exercise.
function doctorInfoLink(image, altText) {
    let docInfoLink = document.createElement("a");
    docInfoLink.onclick = function() { goHere(); }
    docInfoLink.appendChild(createImage(image, 35, 35, altText));
    return docInfoLink;
}

// IT_ Crea la parte centrale con about. | EN_ Create the central part with about.
function pageDoctorAbout(about) {
    let doctorAbout = document.createElement("div");
    doctorAbout.className = "doctor-about";
    doctorAbout.appendChild(createSimpleContent("h3", "About Doctor"));
    doctorAbout.appendChild(createSimpleContent("p", about));
    return doctorAbout;
}

// IT_ Crea la parte con gli appuntamenti. | EN_ Create the part with the appointments.
function pageDoctorSchedules() {
    let doctorSchedules = document.createElement("div");
    doctorSchedules.className = "doctor-schedules";
    doctorSchedules.appendChild(createSimpleContent("h3", "Upcoming Schedules"));
    doctorSchedules.appendChild(createSchedule("12", "Jan", "Consultation", "Sunday", "9am", "11am", 1));
    doctorSchedules.appendChild(createSchedule("13", "Jan", "Consultation", "Monday", "9am", "11am", 2));
    return doctorSchedules;
}

function createSchedule(dd, mm, type, day, hStart, hStop, pos) {
    let doctorSchedule = document.createElement("div");
    doctorSchedule.className = "schedule-box schedule-box__typo" + pos;
    let doctorScheduleCalendar = document.createElement("div");
    doctorScheduleCalendar.className = "schedule-box-calendar schedule-box-calendar__typo" + pos;
    doctorScheduleCalendar.appendChild(createSimpleContent("p", dd));
    doctorScheduleCalendar.appendChild(createSimpleContent("p", mm));
    doctorSchedule.appendChild(doctorScheduleCalendar);
    let doctorScheduleData = document.createElement("div");
    doctorScheduleData.className = "schedule-box-data";
    doctorScheduleData.appendChild(createSimpleContent("p", type));
    doctorScheduleData.appendChild(createSimpleContent("p", day + " , " + hStart + " - " + hStop));
    doctorSchedule.appendChild(doctorScheduleData);
    return doctorSchedule;
}