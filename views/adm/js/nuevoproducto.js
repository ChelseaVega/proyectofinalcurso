import { nuevoProducto  } from "./api.js";
import { mostrarAlerta } from "./mostraAlerta.js";

const formulario = document.querySelector("#formulario");
formulario.addEventListener('submit', validarProducto);

async function validarProducto(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const categoria = document.querySelector('#categoria').value;

    //crear estructura para guardar

    const producto = {
        nombre,
        precio,
        categoria
    }

    console.log(producto)

    if(validar(producto)){
        //caso en que algun campo este vacio
        mostrarAlerta('Todos losc campos son obligatorios');
        return;
    }
    
    await nuevoProducto(producto);

    window.location.href = 'index.html'


}

function validar(obj){
    return !Object.values(obj).every(elemento => elemento !== '')
}