
const urlVerify = "http://127.0.0.1:8000/users/jwt/verify/";

//Authorization
const auth = localStorage.getItem('pagos.auth') ?? "";
if (auth !== ""){
    var token = JSON.parse(auth).accessToken ?? "";
    var authorization = JSON.stringify(`Bearer ${token}`);
    var user = JSON.parse(auth).email;
}



export async function login() {
    const status = await verifyUser1();
    if (status == 200) {
        console.log("PUEDE PASAR");
        return true
    
    } else {
        console.log("No PUEDE PASAR");
        window.location.replace("./login.html");
        return false
    }
}

export async function verifyUser1() {
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