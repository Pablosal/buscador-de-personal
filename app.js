//! Variables globales
let usuariosDeAPI = [];
//*DOM
const mainIntervaloDeUsuarios = document.getElementById("intervaloDeUsuarios");
const inputDeFormulario = document.getElementById("inputHandler");
const divDeCajasDinamicas = document.getElementById("lista_match");
const formulario = document.getElementById("formulario");
const botonParaObtenerUsuarios = document.getElementById("verTodos");
//? Referencias
const mostrarErrores = (err) => console.error(err);
const transformarACarta = (
  u
) => `<div id=${u.id} class="seleccionado card card-body mb-1">
            <h4>${u.name}</h4>
        </div>`;
//!Obtener Datos de la api
const obtenerDatos = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((usuarios) => {
      mostrarEnDOM(transformarDatos(usuarios.data));
      usuariosDeAPI = usuarios.data;
    })
    .catch(mostrarErrores);
};
//!Llamar a id especifico cuando busque el nombre
const obtenerUsuarioEspecificoDeAPI = (id) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((usuario) => mostrarEnDOM(transformarDatos([usuario.data])))
    .catch(mostrarErrores);
};
//!Transformar Datos a cartas de html
const transformarDatosACartasHtml = ({
  username,
  name,
  phone,
  email,
  website,
  company,
}) => `<div class="card m-3" style="width: 18rem;">
          <img
            src="data:image/jpeg;base64,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"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text alert alert-danger"><strong>Usuario:</strong> ${username}</p>
            <p class="card-text alert alert-secondary"><strong>Telefono:</strong> ${phone} </p>
            <p class="card-text alert alert-secondary"><strong>Correo:</strong> ${email}</p>
            <p class="card-text alert alert-secondary"><strong>Pagina Web:</strong> ${website}</p>
            <div class="alert alert-warning">
              <p  class="card-text text-center">${company.name}</p>
              <p  class="card-text text-center">${company.catchPhrase}</p>
            </div>
          </div>
        </div>`;

const transformarDatos = (datos) => {
  return datos
    .map(transformarDatosACartasHtml)
    .reduce((acc, item) => acc + item);
};
//!MostrarEn DOM
const mostrarEnDOM = (cartasDeDatos) => {
  mainIntervaloDeUsuarios.innerHTML = cartasDeDatos;
};

//! Ver que se iguala el texto con los datos
const igualarTextosDeInput = (textoCorrecto, array) => {
  if (textoCorrecto.length === 0) return [];
  const regla = new RegExp(`^${textoCorrecto}`, "gi");
  let resultado = array.filter((c) => c.name.match(regla));
  return resultado;
};
//!Crear caja bajo la caja de busqueda
const crearCajasDinamicas = (textoIgualado) => {
  divDeCajasDinamicas.innerHTML = "";
  if (textoIgualado.length > 0) {
    let html = textoIgualado.map(transformarACarta).join(" ");
    divDeCajasDinamicas.innerHTML = html;
  }
};
//! Crear funcionalidad de formulario
obtenerDatos();
//*DOM
inputDeFormulario.oninput = (e) => {
  console.log(e.target.value);
  crearCajasDinamicas(igualarTextosDeInput(e.target.value, usuariosDeAPI));
};
divDeCajasDinamicas.onclick = (e) => {
  inputDeFormulario.value = e.target.innerText;
  divDeCajasDinamicas.innerHTML = "";
};
formulario.onsubmit = (e) => {
  e.preventDefault();
  let id = usuariosDeAPI.find((a) => a.name === inputDeFormulario.value).id;
  obtenerUsuarioEspecificoDeAPI(id);
};
//!Crear boton para rellenar todos los usuarios de vuelta
botonParaObtenerUsuarios.onclick = () => obtenerDatos();
