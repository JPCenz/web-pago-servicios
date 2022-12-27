import  {login}  from "./modules.js";

let url = "https://api-pagos-drf.onrender.com/api/v2/payments/";
const urlExpired = "https://api-pagos-drf.onrender.com/api/v2/expired/";
let is_admin = false;
//Authorization

const auth = localStorage.getItem('pagos.auth') ?? "";
if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
    var userId = JSON.parse(auth).id;
}

//elementDOM
const paymentItem = document.querySelector("#paymentItem");
paymentItem.innerHTML = "";
const firstPayments = document.querySelector("#firstpayments")
const usernameElement = document.querySelector("#username");
usernameElement.textContent = "";
const expiredElement = document.querySelector("#expiredItem");
expiredElement.textContent = "";
const expiredsShow= document.querySelector("#firstexpiredItem");
const btnShowMore = document.querySelector("#btn-showmore");
const btnShowMorePay = document.querySelector("#btn-showmorepay");
const nopaymentsElement =document.querySelector("#no-payments");
let services = await getService();

main();

async function main() {
    if ( await login()) {
        
        // const a = JSON.parse(localStorage.getItem('pagos.auth')).is_admin ;
        let is_admin = JSON.parse(localStorage.getItem('pagos.auth')).is_admin ?? false;
        setElementsAdmin(is_admin);
        
        let paymentList = await getPayments(userId);
        if(paymentList.length > 0){
            nopaymentsElement.style.display = "none"
        }
        if (paymentList.length < 3) {
            btnShowMorePay.style.display = "none"
        }
        
        setUsername(usernameElement);

        //RENDERIZADO PAGOS EXPIRADOS DEL USUARIO
        let listExpireds = []
        for (let i = 0; i < paymentList.length; i++) {
            const a =await getExpiredByUser(paymentList[i]);
            listExpireds.push(a)
        }
        const filtered = listExpireds.filter((expired)=>expired.length > 0)
        if (filtered.length < 3) {
            btnShowMore.style.display= "none";
        };
        filtered.forEach(async (expired,i) =>{
            let element = expiredsShow
            if (i<2) {
                element = expiredsShow
            }else{
                element = expiredElement
            }
                let paymentExpired = await getPayment(expired[0].payment_user);
                renderPaymentsExpired(paymentExpired,expired[0],element);

            
        });
    } else {
        console.log("FORBIDDEN");
    }
}


async function getPayments(userId = 1) {
    let urlpayment = url
    if (userId){
        urlpayment = url + `?user=${userId}`
    }


    try {
        const response = await fetch(urlpayment, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });
        const paymentList = []
        const data = await response.json();
        data.results.forEach((payment,i) => {
            let element = firstPayments
            if (i<2) {
                element = firstPayments
            }else{
                element = paymentItem
            }
            renderPayment(payment,element);
            paymentList.push(payment.id)
        });
        return paymentList

    } catch (error) {
        console.log(error);
    }
};

function renderPayment(payment,element) {
    element.innerHTML += `
    <div class="col-xl-12 col-md-12 mb-2">
        <div class="card">
            <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                <div class="align-self-center">
                    <i class="fas fa-pencil-alt text-info fa-3x me-4">
                    <img class="h-auto d-inline-block"  style="width: 3rem;"src="${ getServicebyId(payment.service).logo}" alt="logo">
                    </i>
                </div>
                <div id="service">
                    <h4 >${ getServicebyId(payment.service).name}</h4>
                    <p class="mb-0">Monthly blog posts</p>
                </div>
                </div>
                <div id="paymentDate" class="align-self-center ">
                <h4>${payment.payment_date}</h4>
                </div>
                <div id="amount" class="align-self-center">
                <h2 class="h1 mb-0">$ ${payment.amount.toFixed(2)}</h2>
                </div>
                
            </div>
            </div>
        </div>
        </div>
    `;
}

function setUsername(element) {
    element.textContent = `${user}`;
};
async function getExpiredByUser(payment=1) {
    let url = urlExpired;
    
    
    url = urlExpired +`?payment_user=${payment}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });
        let expireds = [];
        const data = await response.json();
        data.results.forEach(expired => {
            if (expired) {
                expireds.push(expired ) ;   
            };
        });
        return expireds
    } catch (error) {
        console.log(error);
    }
        
    
    
    
};

async function getExpireds() {
    let url = urlExpired;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });
        const expiredsList = [];
        const data = await response.json();
        data.results.forEach(expired => {
            expiredsList.push(expired)
            
        
        });
        return expiredsList

    } catch (error) {
        console.log(error);
    }
    
}

async function getPayment(id) {
    try {
        const response = await fetch(url+id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });
        const payment = await response.json();
        
        return payment

    } catch (error) {
        console.log(error);
    }
    
};



function renderPaymentsExpired(payment,expired,element) {
    element.innerHTML +=`
    <div class="col-xl-12 col-md-12 mb-2">
        <div class="card" style="background-color: #ff7a6b;">
            <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex ">
                <div class="align-self-center">
                    <i class="fas fa-pencil-alt text-info fa-3x me-4">
                    <img class="h-auto d-inline-block"  style="width: 3rem;" src="${ getServicebyId(payment.service).logo}" alt="logo">
                    </i>
                </div>
                <div id="service">
                    <h4 >${ getServicebyId(payment.service).name}</h4>
                </div>
                </div>
                <div id="paymentDate" class="align-self-center ">
                    <h4>${payment.payment_date}</h4>
                </div>
                <div id="amount" class="align-self-center">
                    <h2 class="h1 mb-0">$ ${payment.amount.toFixed(2)}</h2>
                </div>
                <div id="amountPenalty" class="align-self-center">
                    <h5 class="h1 mb-0">$ ${expired.penalty_fee_amount.toFixed(2)}</h5>
                </div>
                </div>
                
                
            </div>
            </div>
        </div>
    </div>

    `  
}

async function getService() {
    try {
        const response = await fetch("https://api-pagos-drf.onrender.com/api/v2/service/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": JSON.parse(authorization),
            },
        });
        const servicesList = [];
        const data = await response.json();
        data.results.forEach(service => {
            servicesList.push(service)
            
        
        });
        return servicesList

    } catch (error) {
        console.log(error);
    }
    
};

function getServicebyId(id) {
    const service = services.find((s)=>s.id === id);
    return service;
};

function setElementsAdmin(is_admin) {
    let adminElement = document.querySelector(".admin");
    if ( adminElement &&  !is_admin ) {
        adminElement.style.display= "none";
}
    
}


