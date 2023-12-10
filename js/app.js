const inputEmail = document.getElementById("email");
const inputAsunto = document.getElementById("asunto");
const inputMensaje = document.getElementById("mensaje");
const inputNombre = document.getElementById("nombre");
const btnSubmit = document.querySelector("#formulario [type='submit']");
const btnReset = document.querySelector("#formulario [type='reset']");
const formulario = document.querySelector("form");
const spinner = document.querySelector("#spinner");
inputEmail.addEventListener("input", validar);
inputAsunto.addEventListener("input", validar);
inputMensaje.addEventListener("input", validar);
inputNombre.addEventListener("input", validar);
const datos = {
  email: "",
  nombre: "",
  asunto: "",
  mensaje: "",
};

btnReset.addEventListener("click", (evt) => {
  evt.preventDefault();
  resetFormulario();
});
formulario.addEventListener("submit", enviarDatos);

function validar(evt) {
  if (evt.target.value.trim() === "") {
    mostrarAlerta(
      `El campo ${evt.target.id} es obligatorio`,
      evt.target.parentElement
    );
    datos[evt.target.name] = "";
    comprobarDatos();
    return;
  }
  if (!validarEmail(evt.target.value) && evt.target.id === "email") {
    mostrarAlerta("Email no valido", evt.target.parentElement);
    comprobarDatos();
    return;
  }
  limpiarAlerta(evt.target.parentElement);
  datos[evt.target.name] = evt.target.value.trim().toLowerCase();
  comprobarDatos();
}

function mostrarAlerta(mensaje, referencia) {
  limpiarAlerta(referencia);
  const error = document.createElement("p");
  error.innerText = mensaje;
  error.classList.add(
    "bg-red-500",
    "text-white",
    "p-2",
    "text-center",
    "rounded"
  );
  referencia.appendChild(error);
}

function limpiarAlerta(referencia) {
  const alerta = referencia.querySelector(".bg-red-500");
  if (alerta) {
    alerta.remove();
  }
}
function validarEmail(email) {
  regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  resultado = regex.test(email);
  return resultado;
}
function comprobarDatos() {
  if (Object.values(datos).includes("")) {
    btnSubmit.classList.add("opacity-50");
    btnSubmit.disabled = true;
    return;
  } else {
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }
}
function resetFormulario() {
  datos.email = "";
  datos.nombre = "";
  datos.asunto = "";
  datos.mensaje = "";
  formulario.reset();
  comprobarDatos();
}
function enviarDatos(e) {
  e.preventDefault();
  spinner.classList.remove("hidden");
  const msgExitoso = document.createElement("p");
  msgExitoso.textContent = "Datos enviados!";
  msgExitoso.classList.add('flex','justify-center','rounded', 'bg-green-500', 'text-[white]', 'text-center', 'text-[14px]', 'font-[600]', 'py-2')
  setTimeout(() => {
    spinner.classList.add("hidden");
    resetFormulario();
    formulario.appendChild(msgExitoso);

    setTimeout(() => {
      msgExitoso.remove();
    }, 2000);
  }, 1500);
}
