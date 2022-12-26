// auth = localStorage.getItem('pagos.auth') ?? "";

if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
    var userId = JSON.parse(auth).id;
}


// const formUpdate = document.querySelector("#form-update");
// const inputs = document.querySelectorAll("input");

const formCreate = document.querySelector("#form-create");
const nombre = document.getElementById("namecreate");
const description = document.getElementById("descriptioncreate");
const logo = document.getElementById("logocreate");



formCreate.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
        name: nombre.value,
        description: description.value,
        logo: logo.value,
    };
    console.log(body)

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v2/service/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
            body: JSON.stringify(body),
        });
        console.log(response);

        if(response.status === 201){
            Swal.fire({
                text: "Servicio añadido",
                icon: "success",
            });
        } else {
            Swal.fire({
                text: `Error: ${response.status}`,
                icon: "error",
            });
        }

    } catch (error) {
        Swal.fire({
            text: error,
            icon: "error",
        });
    }

});


setData();

const formUpdate = document.querySelector("#form-update");
const nombreu = document.getElementById("nameupdate");
const descriptionu = document.getElementById("descriptionupdate");
const logou = document.getElementById("logoupdate");


const id = new URLSearchParams(window.location.search).get("id")

async function setData() {
    try{
        
        const response = await fetch(`http://127.0.0.1:8000/api/v2/service/${id}/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            }
        });
        const data = await response.json();
        nombreu.value = data.name;
        descriptionu.value = data.description;
        logou.value = data.logo;
    }
    catch (error) {
        console.log(error)
    }
}




const url ="http://127.0.0.1:8000/api/v2/service/";
const service = document.querySelector(".form-select");
service.innerHTML = `<option selected disabled>Seleccione un servicio</option>`

async function getTasks(){
    const response = await fetch(url,{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": JSON.parse(authorization),
        },
    })
    const data = await response.json();
    data.results.forEach((task) => {
        service.innerHTML += renderTask(task)
    });
}
getTasks();



function renderTask(task){
    return `
    <option id="serviceid" value="${task.id}">${task.name}</option>
    `;
}