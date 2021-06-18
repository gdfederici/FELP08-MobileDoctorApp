import '../css/style.scss';
import categoriesJson from './categories.json';
import doctorsJson from './doctors.json';
import createPageMain from './page-main';

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
    console.log(medicalStaff);
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
    console.log(serviceList);
    return serviceList;
}


/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

function pageIntro() {
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
    document.getElementById("content").appendChild(createPageMain(serviceList, medicalStaff));
}

/*** ------------------------- *** ------------------------- *** ------------------------- *** ------------------------- ***/

const medicalStaff = createMedicalStaff();
const serviceList = createServiceList();
pageIntro();
