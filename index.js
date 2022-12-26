const url ="http://127.0.0.1:8000/api/v2/payments/";

const container = document.querySelector(".table")

async function getTasks(){
    const response = await fetch(url)
    const data = await response.json();
    data.results.forEach((task) => {
        container.innerHTML += renderTask(task)
    });
}
if (!is_admin) {
    console.log("PROHIBIDO");
    alert("FORBIDDEN")
    window.location.replace("./index.html")
}
// getTasks();


function renderTask(task){
    return `
    <tbody>
        <tr>
            <th scope="row gap-3">logo</th>
            <td>${task.service}</td>
            <td class="text-center" gap-3>${task.payment_date}</td>
            <td class="text-end">${task.amount}</td>
        </tr>
    </tbody>
    `;
}


// function showMore() {
//     // Obtener todos los elementos de la lista con la clase "hidden"
//     var hiddenElements = document.querySelectorAll('.hidden');

//     // Mostrar solo los dos primeros elementos
//     hiddenElements[0].classList.remove('hidden');
//     hiddenElements[1].classList.remove('hidden');
//   }