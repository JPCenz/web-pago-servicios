// const auth = localStorage.getItem('pagos.auth') ?? "";

if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
}



const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");


form.onsubmit = async function(event){
    event.preventDefault();

    const body = {
        service: select.value,
    };

    inputs.forEach((input) => (body[input.name] = input.value));

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v2/payments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        console.log(response);
        Swal.fire({
            text: "Pago añadido",
            icon: "success",
        });
    } catch (error) {
        Swal.fire({
            text: error,
            icon: "error",
        });
    }

};





const url ="http://127.0.0.1:8000/api/v2/service/";
const service = document.querySelector(".form-select");
service.innerHTML = `<option selected>Seleccione un servicio</option>`

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

