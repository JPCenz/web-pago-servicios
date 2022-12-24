const url = "http://127.0.0.1:8000/api/v2/payments/";
const urlVerify = "http://127.0.0.1:8000/users/jwt/verify/";

//Authorization
const auth = localStorage.getItem('pagos.auth') ?? "";
if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
}

//elementDOM
const paymentItem = document.querySelector("#paymentItem")
paymentItem.innerHTML = ""
const usernameElement = document.querySelector("#username")
usernameElement.textContent = ""


main();




async function main() {
    if (await login()) {
        console.log("EMPEZEMOS");
        await getPayments();
        setUsername(usernameElement);
        


    } else {
        console.log("No EMPEZEMOS");
    }
}


async function login() {
    const status = await verifyUser();

    if (status == 200) {
        console.log("PUEDE PASAR");
        return true
        
    } else {
        console.log("No PUEDE PASAR");
        window.location.replace("./login.html");
        return false
    }
}

async function verifyUser() {
    try {
        const body = {
            token: token
        }
        response = await fetch(urlVerify, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return await response.status;

    } catch (error) {
        console.log(error);
    }

}

async function getPayments() {
    try {
        response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });

        const data = await response.json();
        data.results.forEach(payment => {
            console.log(payment);
            renderPayment(payment);
        });

    } catch (error) {
        console.log(error);
    }
};

function renderPayment(payment) {
    paymentItem.innerHTML += `
    <div class="col-xl-12 col-md-12 mb-2">
        <div class="card">
            <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                <div class="align-self-center">
                    <i class="fas fa-pencil-alt text-info fa-3x me-4">
                    LOGO NET
                    </i>
                </div>
                <div id="service">
                    <h4 > Service:${payment.service}</h4>
                    <p class="mb-0">Monthly blog posts</p>
                </div>
                </div>
                <div id="paymentDate" class="align-self-center ">
                <h4>${payment.payment_date}</h4>
                </div>
                <div id="amount" class="align-self-center">
                <h2 class="h1 mb-0">$ ${payment.amount}</h2>
                </div>
                
            </div>
            </div>
        </div>
        </div>
    `;


}

function setUsername(element) {
    element.textContent = `${user}`
}
