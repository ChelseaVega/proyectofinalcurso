
document.addEventListener("DOMContentLoaded", function () {
    const carrito = document.querySelector('#carrito');
    const listaCursos = document.querySelector('#lista-cursos');
    const contenedorCarrito = document.querySelector('#lista-carrito');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const finalizarCompraBtn = document.querySelector('#finalizarCompra');
    
    let articulosCarrito = [];

    // Cargar productos del LocalStorage al cargar la página
    cargarCarritoDesdeLocalStorage();

    cargarEventListeners();
    
    function cargarEventListeners() {
        listaCursos.addEventListener('click', agregarCurso);
        carrito.addEventListener('click', eliminarCurso);
        vaciarCarritoBtn.addEventListener('click', () => {
            articulosCarrito = [];
            vaciarCarrito();
        });
        finalizarCompraBtn.addEventListener('click', finalizarCompra);
    }
    
    function agregarCurso(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const curso = e.target.parentElement;
            leerDatosCurso(curso);
            sincronizarStorage();
        }
    }
    
    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            articulosCarrito = JSON.parse(carritoGuardado);
            carritoHTML();
        }
    }
    
    function eliminarCurso(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar-curso')) {
            const cursoId = e.target.getAttribute('data-id');
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            carritoHTML();
            sincronizarStorage();
        }
    }
    
    function vaciarCarrito() {
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
        sincronizarStorage();
    }
    
    function leerDatosCurso(curso) {
        const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        };
    
        const cursoEnCarrito = articulosCarrito.find(cursoCarrito => cursoCarrito.id === infoCurso.id);
        
        if (cursoEnCarrito) {
            cursoEnCarrito.cantidad++;
        } else {
            articulosCarrito.push(infoCurso);
        }
    
        carritoHTML();
        sincronizarStorage();
    }
    
    function finalizarCompra(e) {
        e.preventDefault();
        if (articulosCarrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }
        // Aquí puedes implementar el proceso de finalizar la compra y guardar los productos en la base de datos.
        // Por ejemplo, puedes enviar los datos de 'articulosCarrito' al servidor a través de una solicitud POST.
    }
    
    function carritoHTML() {
        vaciarCarrito();
        articulosCarrito.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${curso.imagen}" width=100>
                </td>
                <td>${curso.titulo}</td>
                <td>${curso.precio}</td>
                <td>${curso.cantidad}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                </td>
            `;
            contenedorCarrito.appendChild(row);
        });
        sincronizarStorage();
    }
    finalizarCompraBtn.addEventListener('click', finalizarCompra);



cargarEventListener();

function cargarEventListener() {
    // ... (otros event listeners)

    finalizarCompraBtn.addEventListener('click', finalizarCompra);
}

function finalizarCompra(e) {
    e.preventDefault();
    if (articulosCarrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }
    
    // Guardar productos en LocalStorage
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

    // Redirigir a la página de carrito
    window.location.href = 'https://chicharronera.onrender.com/delivery/';
}
});