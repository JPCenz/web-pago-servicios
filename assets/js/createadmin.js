
// if (auth !== ""){
//     var token = JSON.parse(auth).accessToken ?? "";
//     var authorization = JSON.stringify(`Bearer ${token}`);
//     var user = JSON.parse(auth).email;
//     var userId = JSON.parse(auth).id;
// }

const serviceSelect = document.querySelector("#serviceSelect")
const formCreate = document.querySelector("#form-create");
const nombre = document.getElementById("namecreate");
const description = document.getElementById("descriptioncreate");
const logo = document.getElementById("logocreate");

//Si no es admin redirige a home
if (!is_admin) {
    window.location.replace("./index.html")
}

formCreate.addEventListener("submit", (event) => {
    event.preventDefault();
    formValidate();
});


let formValidate = () => {
    if(namecreate.value === ""){
        msg.classList.remove("d-none");
    }
    if(descriptioncreate.value === ""){
        msg1.classList.remove("d-none");
    }
    if(logocreate.value === ""){
        msg2.classList.remove("d-none");
    }
    if(namecreate.value !== "" && descriptioncreate.value !== "" && logocreate.value !== ""){
        msg.classList.add("d-none");
        msg1.classList.add("d-none");
        msg2.classList.add("d-none");
        confirmData();
    }

}

async function confirmData(){
    const body = {
        name: nombre.value,
        description: description.value,
        logo: logo.value,
    };
    console.log(body)

    try {
        const response = await fetch("https://api-pagos-drf.onrender.com/api/v2/service/", {
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
}





const formUpdate = document.querySelector("#form-update");
const nombreu = document.getElementById("nameupdate");
const descriptionu = document.getElementById("descriptionupdate");
const logou = document.getElementById("logoupdate");




formUpdate.addEventListener("submit", (event) =>{
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
    if(nameupdate.value === ""){
        msg3.classList.remove("d-none");
    }
    if(descriptionupdate.value === ""){
        msg4.classList.remove("d-none");
    }
    if(logoupdate.value === ""){
        msg5.classList.remove("d-none");
    }
    if(nameupdate.value !== "" && descriptionupdate.value !== "" && logoupdate.value !== ""){
        msg3.classList.add("d-none");
        msg4.classList.add("d-none");
        msg5.classList.add("d-none");
        
        let serid = serviceSelect.value;
        acceptData(serid);
    }

}

async function acceptData (id){
    const data ={
        name: nombreu.value,
        description: descriptionu.value,
        logo: logou.value,
    }

    await fetch(`https://api-pagos-drf.onrender.com/api/v2/service/${id}/`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": JSON.parse(authorization),
        },
        body: JSON.stringify(data)
    }).then((response)=>{
        if(response.ok){
            Swal.fire(
                "Actualizado!",
                "Los datos se actualizaron correctamente.",
                "success"
            ).then((result) =>{
                if(result.isConfirmed){
                    returnService();
                }
            })
        }
        else{
            Swal.fire({
                icon: error,
                title: "Oops...",
                text: "Ocurrio un error"
            })
        }
    })
}


function returnService(){
    window.location.replace("./administration.html")
}






async function setData(id) {
    try{
        
        const response = await fetch(`https://api-pagos-drf.onrender.com/api/v2/service/${id}/`, {
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




serviceSelect.addEventListener("change", (event)=>{
    event.preventDefault();
    console.log("CAMBIO EL SELECT")
    console.log(serviceSelect.value);
    const serviceid = serviceSelect.value
    setData(serviceid);
});


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
    <option id="serviceid" value="${task.id}">${task.name}</option>
    `;
}