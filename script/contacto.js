
function submitForm(event) {
    console.log(event);
    event.preventDefault();
    document.getElementById("mensajeErrorEnvio").classList.remove("mensajeVisible");

    let data = new FormData(event.target);

    fetch("https://formspree.io/f/mjkwgkovMal",
        {
            method: event.target.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }
    ).then(response => {
        if (response.ok) {
            event.target.reset(); // Resetea el formulario
            window.location.href = "../pages/gracias.html"; // Redirige a la página de agradecimiento
        } else {
            document.getElementById("mensajeErrorEnvio").classList.add("mensajeVisible");
        }
    }).catch(error => {
        console.error(error);
        document.getElementById("mensajeErrorEnvio").classList.add("mensajeVisible");
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("contactoForm");

    form.addEventListener("submit", submitForm);
});