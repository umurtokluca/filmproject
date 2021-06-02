const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1]
const clear = document.getElementById("clear-films")

// UI Object Başlatma

const ui = new UI();

// Storage Objesi Üret

const storage = new Storage();

// Tüm Eventeleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })

    cardBody.addEventListener("click",deleteFilm)
    clear.addEventListener("click",clearAllFilms)
}


function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        // Hata Mesajı
        redAlert()
    }
    else {
        // Yeni Film
        const newFilm = new Film(title,director,url);
        
        ui.addFilmToUI(newFilm); // Arayüze Film Ekleme
        storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme

        greenAlert()
    
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
    }
}

function clearAllFilms(){
    if (films.firstElementChild == null) {
        redAlertDelete()
    }
    else if (confirm("Tüm filmleri silmek istediğinize emin misiniz?")){
        ui.clearAllFilmsFromUI()
        storage.clearAllFilmsFromStorage()

        greenAlertDelete()
    }
}

function redAlert(){
    
    document.getElementById("add-film").classList.add("red-alert")
    document.getElementById("add-film").innerHTML="Lütfen alanları boş bırakmayın."

    setTimeout(function(){
        document.getElementById("add-film").classList.remove('red-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("add-film").innerHTML = "Film Ekleyin";
    }, 1000);
}

function greenAlert(){
    
    document.getElementById("add-film").classList.add("green-alert")
    document.getElementById("add-film").innerHTML="Film başarıyla eklendi."
    
    setTimeout(function(){
        document.getElementById("add-film").classList.remove('green-alert')
    }, 1000)

    setTimeout(function(){ 
        document.getElementById("add-film").innerHTML = "Film Ekleyin";
    }, 1000);
}

function redAlertDelete(){
    document.getElementById("clear-films").classList.add("red-alert")
    document.getElementById("clear-films").value="Film listesi zaten boş."

    setTimeout(function(){
        document.getElementById("clear-films").classList.remove('red-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("clear-films").value = "Tüm Filmleri Silin";
    }, 1000);
}

function greenAlertDelete(){
    document.getElementById("clear-films").classList.add("green-alert")
    document.getElementById("clear-films").value="Filmler başarıyla silindi."

    setTimeout(function(){
        document.getElementById("clear-films").classList.remove('green-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("clear-films").value = "Tüm Filmleri Silin";
    }, 1000);
}