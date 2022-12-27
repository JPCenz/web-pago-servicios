// const auth = localStorage.getItem('pagos.auth') ?? "";

if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
    var userId = JSON.parse(auth).id;
}

var hoy = new Date();
var dia = hoy.getDate();
var mes = hoy.getMonth() + 1;
var anio = hoy.getFullYear();

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");


form.onsubmit = async function(event){
    event.preventDefault();

    const body = {
        service: select.value,
        user: userId,
        payment_date: anio + '-' + mes + '-' + dia,
    };

    inputs.forEach((input) => (body[input.name] = input.value));

    try {
        const response = await fetch("https://api-pagos-drf.onrender.com/api/v2/payments/", {
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
                text: "Pago añadido",
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

};



const url ="https://api-pagos-drf.onrender.com/api/v2/service/";
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
    <option value="${task.id}">${task.name}</option>
    `;
}