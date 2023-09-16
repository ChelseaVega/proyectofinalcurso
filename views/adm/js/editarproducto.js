import { obtenerProducto, editarProducto } from "./api.js";
import { mostrarAlerta } from "./mostraAlerta.js";

const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const categoriaInput = document.querySelector("#categoria");
const idInput = document.querySelector("#id");
const selectProduct = document.querySelector("#productSelect");
const imgEl = document.querySelector("#imgto-edit");
const imgInput = document.querySelector("#image");
const imgInput2 = document.querySelector("#image2");
const formEdit = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", async () => {
  //obtener todos los productos
  axios
    .get(`https://chicharroneraweb.onrender.com/getproducts`)
    .then((response) => response.data)
    .then((data) => {
      selectProduct.innerHTML = `<option value="" disabled="" selected="">Seleccionar...</option>`;

      // print in select
      data.map((item) => {
        selectProduct.innerHTML += `
                <option value="${item._id}">${item.nombre}</option>
            `;
      });

      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");

      selectProduct.value = productId;
      const changeEvent = new Event("change", {
        bubbles: true, // Allows the event to bubble up the DOM tree
        cancelable: true, // Allows the event to be canceled
      });
      selectProduct.dispatchEvent(changeEvent);
    })
    .catch((e) => {
      console.log(e);
    });

  //consultar en la url para extraer y guardar el id que enviamos en la ruta
  const parametrosURL = new URLSearchParams(window.location.search);
  const idProducto = parseInt(parametrosURL.get("id"));

  //console.log(idProducto)
  const producto = await obtenerProducto(idProducto);
  //console.log(parametrosURL)
  mostrarProducto(producto);

  //hacer el registro desde el formulario
  const formulario = document.querySelector("#formulario"); //idformulario
  formulario.addEventListener("submit", validarProducto);
});

// imgEl.addEventListener('click', function(e){
//   imgInput.click();
// });

selectProduct.addEventListener("change", function (e) {
  // formEdit.setAttribute("action", `/upload/edit/${this.value}`);

  //obtener producto por id
  axios
    .get(`https://chicharroneraweb.onrender.com/getproduct/${this.value}`)
    .then((response) => response.data)
    .then((data) => {
      nombreInput.value = data.nombre;
      precioInput.value = Number(data.precio);
      categoriaInput.value = Number(data.categoria);
      // imgInput2.value = `${data.imagenP}`;
      imgEl.src = `https://chicharroneraweb.onrender.com/uploads/${data.imagenP}`;
      document
        .getElementById("edit-product")
        .setAttribute("action", `/upload2/${data._id}`);
    })
    .catch((e) => {
      console.log(e);
    });
});

async function validarProducto(e) {
  e.preventDefault();

  const producto = {
    nombre: nombreInput.value,
    precio: precioInput.value,
    categoria: categoriaInput.value,
    id: parseInt(idInput.value),
  };

  if (validar(producto)) {
    //console.log('Todos los campos son obligatorios')
    mostrarAlerta("Todos los campos son obligatorios");
    return;
  }

  await editarProducto(producto);
  window.location.href = "index.html";
}

function mostrarProducto(producto) {
  //muestra los datos del producto en la interfaz de editar producto
  const { nombre, precio, categoria, id } = producto;

  nombreInput.value = nombre;
  precioInput.value = precio;
  categoriaInput.value = categoria;
  idInput.value = id;
}

function validar(objeto) {
  return !Object.values(objeto).every((element) => element !== "");
}
