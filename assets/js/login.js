
const inputs = document.querySelectorAll("input");
const emailElement = document.querySelector("#email")
const passwordElement = document.querySelector("#password")
let form = document.querySelector("form");
const url = "http://127.0.0.1:8000/users/login/"
const locationToken = 'pagos.auth'


//TO:modificar logica ya que si expira el token no puedes acceder
if (localStorage.getItem(locationToken)) {
    console.log("LOGUEADO")
    // window.location.replace("./index.html")   
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const credentials = {
        email: emailElement.value,
        password: passwordElement.value,
    };
    getToken(credentials);

});


async function getToken(body) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        if (!data.tokens) {
            Swal.fire({
                text: "Credenciales incorrectas",
                icon: "error",
            })
        } else {
            Swal.fire({
                text: "Logeado correctamente",
                icon: "success",
            });
            const accessToken = data.tokens.access;
            const refreshToken = data.tokens.refresh;

            localStorage.setItem(locationToken, JSON.stringify(
                {
                    accessToken: accessToken,
                    email: data.email,
                    id: data.id,
                    is_admin : data.roles.is_admin
                }));
            window.location.replace("./index.html");
        };
    } catch (error) {
        Swal.fire({
            text: error,
            icon: "error",
        })
    };
};

const preloader = document.querySelector("#preloader")
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove()
    });
}
