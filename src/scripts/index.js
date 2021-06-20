import '../css/style.scss';
import { pageIntro } from './page-intro';
import { createImage } from './functions';
import { createSimpleContent } from './functions';
import { goHere } from './functions';

import categoriesJson from './categories.json';
import doctorsJson from './doctors.json';
import imgDoc1 from '../img/doc-avatar_1.svg';
import imgDoc2 from '../img/doc-avatar_2.svg';
import imgDoc3 from '../img/doc-avatar_3.svg';


/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

// IT_ Classe singolo dottore. | EN_ 
class Doctor {
    constructor(firstname, lastname, avatar, specialization, workplace, about) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = "img/" + avatar;
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
        medicalStaff.push(new Doctor(listDoctors[i].firstname, listDoctors[i].lastname, listDoctors[i].avatar, listDoctors[i].specialization, listDoctors[i].workplace, listDoctors[i].about));
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

const medicalStaff = createMedicalStaff();
console.log(medicalStaff);
const servicesList = createServiceList();
console.log(servicesList);
isMobile() ? pageIntro(servicesList, medicalStaff) : noDesktop();
