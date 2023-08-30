const agregarWIP = document.getElementById('agregar1')
const agregarToDo = document.getElementById('agregar2')
const botonMoverTarjeta = document.getElementById('botonMover')

const toastLiveExample1 = document.getElementById('liveToast')
const toastLiveExample2 = document.getElementById('liveToast2')
const toastMoverTarjeta = document.getElementById('liveToastCambiarColumna')

const toDoContainer = document.getElementById("workInProgressID");
const nosquet = document.getElementById("exampleFormControlInput1");
const fotoTarjeta = document.getElementById("formFotoTarea1");
const nosquet2 = document.getElementById("exampleFormControlTextarea1");

const titulo2 = document.getElementById("exampleFormControlInput2");
const fotoTarjeta2 = document.getElementById("formFotoTarea2");
const texto2 = document.getElementById("exampleFormControlTextarea2");

let arrayDeTarjetas = [];
let idCard = 0;
let URL_DB = "http://localhost:3000/cards";
//EL ID CARD TIENE QUE SER LEVANTADO DEL DB PARA QUE NO SE TRASLAPE

inicializarTarjetas();

function inicializarTarjetas() {
    const listaTarjetas = getDBCards();     //GET de la idCard de la DB y las tarjetas
    //idCard = a lo que tiene la DB
    //foreach linea de la DB
    listaTarjetas.then((data) => data.forEach(element => {
        agregarTarjetaObj(element);
        arrayDeTarjetas.push(element);      //Agrego cada elemento al array local de tarjetas
        idCard = parseInt(element.id) + 1;
    }))
}

async function getDBCards() {
    try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
            URL_DB,
        );
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Could not get cards: ${error}`);
    }
}

function postDBCards(objetoTarjeta) {
    fetch(URL_DB, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: objetoTarjeta
    }).then(response => response.json())
        .then(console.log(newPerson))
}

function deleteDBCards(id) {
    fetch(URL_DB + "/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => displayData(json))
}

function moveDBCards(id, direccion){
    let dir;
    if(direccion == "der"){
        dir = 'agregar1';
    }
    else{
        dir = 'agregar2';
    }
    fetch(URL_DB + "/" + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"columna": dir})
    })
        .then(res => res.json())
        .then(json => displayData(json))
}

function agregarTarjetaObj(objeto) {
    const cardTitle = objeto.titulo;
    const cardText = objeto.texto;
    const cardPhoto = objeto.foto;
    const cardColumn = objeto.columna;
    const idCard = objeto.id;
    //agregarTarjeta(cardTitle, cardText, cardPhoto, cardColumn, idCard);
    const dondeAgregar = document.getElementById(cardColumn);
    dondeAgregar.insertAdjacentHTML("beforebegin", templateTarjeta(cardTitle, cardText, cardPhoto, idCard));
}

function agregarTarjeta(cardTitle, cardText, cardPhoto, cardColumn, idCard) { //Esto es lo que ejecutan los botones cuando apretas agregarTarea
    const dondeAgregar = document.getElementById(cardColumn);
    dondeAgregar.insertAdjacentHTML("beforebegin", templateTarjeta(cardTitle, cardText, cardPhoto, idCard));
    const jsonBody = postTarjeta(cardTitle, cardText, cardPhoto, cardColumn, idCard);
    //===============================
    //POST jsonString <==============
    postDBCards(jsonBody);
    //===============================
    idCard++;
}

function postTarjeta(cardTitle, cardText, cardPhoto, cardColumn, idCard) {
    const objetoTarjeta = {
        id: idCard,
        titulo: cardTitle,
        texto: cardText,
        foto: cardPhoto,
        columna: cardColumn
    }
    const jsonTarjeta = JSON.stringify(objetoTarjeta);
    return jsonTarjeta;
}

if (agregarWIP) {
    agregarWIP.addEventListener('click', () => {
        if ((toastBootstrap = bootstrap.Toast.getInstance(toastLiveExample1)) == null) {
            const botonAgregarToast = document.getElementById("idAgregarTarea");
            botonAgregarToast.addEventListener('click', () => {
                agregarTarjeta(nosquet.value, nosquet2.value, fotoTarjeta.value, agregarWIP.id, idCard);
            }
            )
        }
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample1);
        toastBootstrap.show();
    })
}

if (agregarToDo) {
    agregarToDo.addEventListener('click', () => {
        if ((toastBootstrap = bootstrap.Toast.getInstance(toastLiveExample2)) == null) {
            const botonAgregarToast = document.getElementById("idAgregarTarea2");
            botonAgregarToast.addEventListener('click', () => {
                agregarTarjeta(nosquet.value, nosquet2.value, fotoTarjeta2.value, agregarToDo.id, idCard);
            }
            )
        }
        toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample2);
        toastBootstrap.show();
    })
}

function eliminarTarjeta(idcoso) {
    const borrarTarjeta = document.getElementById(idcoso);
    const idRaw = idcoso.replace("tarjeta", "");
    arrayDeTarjetas.forEach(element => {
        if (element.id == idRaw) {
            arrayDeTarjetas.pop(element);
        }
    });
    borrarTarjeta.remove();
    deleteDBCards(idRaw);
}

function templateTarjeta(tituloTarjeta, textoTarjeta, fotito, id) {
    return `
    <div class="row cardStyle card" id="tarjeta${id}">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${fotito}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${tituloTarjeta}</h5>
                    <p class="card-text">${textoTarjeta}</p>
                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                    <div class="btn-group">
                        <button class="btn btn-secondary btn-sm" type="button">
                            Editar
                        </button>
                        <button type="button"
                            class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="eliminarTarjeta('tarjeta${id}')">Eliminar</a></li>
                            <li><a class="dropdown-item" href="#" onclick="moveDBCards('${id}','der')">Mover a la derecha</a></li>
                            <li><a class="dropdown-item" href="#" onclick="moveDBCards('${id}','izq')">Mover a la izquierda</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
