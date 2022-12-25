
const urlVerify = "http://127.0.0.1:8000/users/jwt/verify/";
const bodyElement = document.querySelector("body")
let preloaderElement = document.querySelector("#preloader")
//Authorization
const auth = localStorage.getItem('pagos.auth') ?? "";
if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
}

main();


async function main() {

    if ( await login()) {
        console.log("EMPEZEMOS");

    } else {
        console.log("No EMPEZEMOS");
        window.location.replace("./login.html");
    }
}


async function login() {
    const status = await verifyUser();
    
    if (status == 200) {
        console.log("PUEDE PASAR");
        preloaderElement.remove();
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
    }

}
