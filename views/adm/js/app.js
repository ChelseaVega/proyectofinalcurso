import {obtenerProductos,eliminarProducto} from "./api.js"

const listado = document.querySelector('#listado-Productos');
document.addEventListener('DOMContentLoaded',mostrarProductos);

listado.addEventListener('click', eliminar);

async function mostrarProductos (){
    const productos = await obtenerProductos ()

    //console.log(productos);
    productos.forEach(producto =>{
        const {nombre, precio, categoria, id} = producto;
        const fila = document.createElement('tr');
        fila.innerHTML =`
        
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-2000">
            <p class="font-bold text-lg text-gray-700 font-medium text-sm loading-s">${nombre}</p>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-2000">
            <p class="font-bold text-lg text-gray-700 font-medium text-sm loading-s">${precio}</p>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-2000">
            <p class="font-bold text-lg text-gray-700 font-medium text-sm loading-s text-center">${categoria}</p>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-2000">
            <a href="editar-producto.html?id=${id}" class="text-teal-600 hover:text-teal-900">Editar</a>
            <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        `

        listado.appendChild(fila);
    })
}

async function eliminar(e){
    //console.log('eliminar');
    if (e.target.classList.contains('eliminar')){
       // console.log('eliminar');
        const productoId = e.target.dataset.producto;
       // console.log(productoId);
        const confirmar = confirm('quieres eliminar el producto?')// para ventana con opciones editar y eliminar
        //console.log(confirmar);
        if(confirmar){
            await eliminarProducto(productoId);
        }
    }  

}