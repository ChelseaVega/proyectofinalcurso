// Seleccionar el botón de usuario y el contenedor del menú
const userMenuButton = document.querySelector('#user-menu-button');
const userMenu = document.querySelector('#user-menu');

// Agregar controlador de eventos para mostrar/ocultar el menú
userMenuButton.addEventListener('click', function() {
  userMenu.classList.toggle('hidden');
});

userMenuButton.addEventListener('mouseover', function() {
  userMenu.classList.remove('');
});

userMenuButton.addEventListener('mouseout', function() {
  userMenu.classList.add('');
});

//script para buscar una palabra en la pagina de inicio
const botonBuscar = document.getElementById('busqueda');
    
botonBuscar.addEventListener('click', buscarEnSitio);

function buscarEnSitio(event) {
	event.preventDefault(); // Evitar el comportamiento por defecto del formulario

	const terminoBusqueda = document.getElementById('resultados').value.toLowerCase();

	const elementos = document.querySelectorAll('h2, h4, p');

	let encontrado = false;

	elementos.forEach(elemento => {
		const contenido = elemento.textContent.toLowerCase();

		if (contenido.includes(terminoBusqueda)) {
			encontrado = true;

			// Hacer que el elemento sea visible y se desplace a la vista
			elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });

			// Resaltar el texto buscado
			elemento.innerHTML = contenido.replace(new RegExp(terminoBusqueda, 'gi'), '<span class="resaltado">$&</span>');
		}
	});

	if (encontrado) {
//alert("Encontrado y resaltado");
	} else {
		alert("No se encontró el término");
	}
}
