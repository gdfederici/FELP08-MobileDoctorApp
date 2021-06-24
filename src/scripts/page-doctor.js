// IT_ Importare funzioni. | EN_ Import functions.
import { createImage, createSimpleContent, tabulaRasa, magicMenu, createLink, goHere, goMain } from './functions';
// IT_ Importare immagini. | EN_ Import images.
import icoMenuPoints from '../img/ico_points.svg';
import icoBack from '../img/ico_back.svg';
import icoPhone from '../img/ico_phone.svg';
import icoMsg from '../img/ico_msg.svg';
import icoVideo from '../img/ico_video.svg';

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Cancella il contenuto e crea la pagina del singolo dottore. | EN_ Erase the content and create the single doctor page.
export function createPageDoctor(firstname, lastname, avatar, specialization, workplace, about, servicesList, medicalStaff) {
    tabulaRasa("content");
    const pageDoctor = document.createElement("section");
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
    const pageDoctorNavbar = document.createElement("div");
    pageDoctorNavbar.className = "page-doctor-navbar";
    const navDoc = document.createElement("div");
    navDoc.className = "navdoc";
    const navBack = document.createElement("div");
    const navBackLink = document.createElement("a");
    navBackLink.onclick = function() { goMain(servicesList, medicalStaff); }
    navBackLink.appendChild(createImage(icoBack, 11, 15, "Back icon"));
    navBack.appendChild(navBackLink);
    navDoc.appendChild(navBack);
    navDoc.appendChild(pageDoctorNav());
    pageDoctorNavbar.appendChild(navDoc);
    return pageDoctorNavbar;
}
// IT_ Il menu mobile. | EN_ Mobile menu.
function pageDoctorNav() {
    const doctorNav = document.createElement("nav");
    doctorNav.setAttribute("id", "pointsNav");
    doctorNav.className = "navdoc-menu";
    const doctorNavMenu = document.createElement("ul");
    doctorNavMenu.appendChild(doctorNavSpecial());
    for (let i=0; i<3; i++) { doctorNavMenu.appendChild(createLink()); }
    doctorNav.appendChild(doctorNavMenu);
    return doctorNav;
}
// IT_ L'elemento speciale per il menu mobile. | EN_ The special element for the mobile menu.
function doctorNavSpecial() {
    const doctorNavSpecialItem = document.createElement("li");
    const doctorNavSpecialLink = document.createElement("a");
    doctorNavSpecialLink.setAttribute("id", "pointsMenu");
    doctorNavSpecialLink.className = "icon";
    doctorNavSpecialLink.onclick = function() { magicMenu("pointsNav", "navdoc-menu__responsive"); }
    doctorNavSpecialLink.appendChild(createImage(icoMenuPoints, 5, 16, "Three points menu icon"));
    doctorNavSpecialItem.appendChild(doctorNavSpecialLink);
    return doctorNavSpecialItem;
}

// IT_ Crea la testata della pagina. | EN_ Create the page header.
function pageDoctorHeader(firstname, lastname, avatar, specialization, workplace) {
    const doctorHeader = document.createElement("header");
    doctorHeader.className = "doctor-header";
    doctorHeader.appendChild(createImage(avatar, 88, 107, "Avatar doctor"));
    doctorHeader.appendChild(doctorInfo(firstname, lastname, specialization, workplace));
    return doctorHeader;
}
function doctorInfo(firstname, lastname, specialization, workplace) {
    const doctorInfo = document.createElement("div");
    doctorInfo.className = "doctor-info";
    doctorInfo.appendChild(createSimpleContent("h2", `Dr. ${firstname} ${lastname}`)); // IT_ Stringa composte in ES6. | ENì_ String in ES6.
    doctorInfo.appendChild(createSimpleContent("p", `${specialization} ${workplace}`));
    doctorInfo.appendChild(doctorInfoLink(icoPhone, "Phone to doctor"));
    doctorInfo.appendChild(doctorInfoLink(icoMsg, "Message to doctor"));
    doctorInfo.appendChild(doctorInfoLink(icoVideo, "Video to doctor"));
    return doctorInfo;
}
// IT_ Sono tutti uguali perché non c'è azione specifica nell'esercizio. | EN_ They are all the same because there is no specific action in the exercise.
function doctorInfoLink(image, altText) {
    const docInfoLink = document.createElement("a");
    docInfoLink.onclick = function() { goHere(); }
    docInfoLink.appendChild(createImage(image, 35, 35, altText));
    return docInfoLink;
}

// IT_ Crea la parte centrale con about. | EN_ Create the central part with about.
function pageDoctorAbout(about) {
    const doctorAbout = document.createElement("div");
    doctorAbout.className = "doctor-about";
    doctorAbout.appendChild(createSimpleContent("h3", "About Doctor"));
    doctorAbout.appendChild(createSimpleContent("p", about));
    return doctorAbout;
}

// IT_ Crea la parte con gli appuntamenti. | EN_ Create the part with the appointments.
function pageDoctorSchedules() {
    const doctorSchedules = document.createElement("div");
    doctorSchedules.className = "doctor-schedules";
    doctorSchedules.appendChild(createSimpleContent("h3", "Upcoming Schedules"));
    doctorSchedules.appendChild(createSchedule("12", "Jan", "Consultation", "Sunday", "9am", "11am", 1));
    doctorSchedules.appendChild(createSchedule("13", "Jan", "Consultation", "Monday", "9am", "11am", 2));
    return doctorSchedules;
}

function createSchedule(dd, mm, type, day, hStart, hStop, pos) {
    const doctorSchedule = document.createElement("div");
    doctorSchedule.className = "schedule-box schedule-box__typo" + pos;
    const doctorScheduleCalendar = document.createElement("div");
    doctorScheduleCalendar.className = "schedule-box-calendar schedule-box-calendar__typo" + pos;
    doctorScheduleCalendar.appendChild(createSimpleContent("p", dd));
    doctorScheduleCalendar.appendChild(createSimpleContent("p", mm));
    doctorSchedule.appendChild(doctorScheduleCalendar);
    const doctorScheduleData = document.createElement("div");
    doctorScheduleData.className = "schedule-box-data";
    doctorScheduleData.appendChild(createSimpleContent("p", type));
    doctorScheduleData.appendChild(createSimpleContent("p", day + " , " + hStart + " - " + hStop));
    doctorSchedule.appendChild(doctorScheduleData);
    return doctorSchedule;
}