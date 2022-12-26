
const urlVerify = "http://127.0.0.1:8000/users/jwt/verify/";
const bodyElement = document.querySelector("body")
const usernameElement = document.querySelector("#username");
usernameElement.textContent = "";
//Authorization
const auth = localStorage.getItem('pagos.auth') ?? "";
var is_admin = JSON.parse(localStorage.getItem('pagos.auth')).is_admin
if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
    var is_admin = JSON.parse(auth).is_admin ?? false
}

main();


async function main() {
    

    if ( await login()) {
        console.log("EMPEZEMOS");
        console.log('is_admin',is_admin)
        setUsername(usernameElement);
        setElementsAdmin(is_admin);
        
    } else {
        console.log("No EMPEZEMOS");
        window.location.replace("./login.html");
    }
};


async function login() {
    const status = await verifyUser();
    
    if (status == 200) {
        console.log("PUEDE PASAR");
        return true
    
    } else {
        Swal.fire({
            text: status,
            icon: "error",
        });
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
        const response = await fetch(urlVerify, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })

        return response.status

    } catch (error) {
        console.log(error);
        Swal.fire({
            text: error,
            icon: "error",
        });
    }

}

function setUsername(element) {
    element.textContent = `${user}`;
};

function setElementsAdmin(is_admin) {
    let adminElement = document.querySelector(".admin");
    if ( adminElement &&  !is_admin ) {
    console.log(is_admin);
    adminElement.style.display= "none";
}
    
}

