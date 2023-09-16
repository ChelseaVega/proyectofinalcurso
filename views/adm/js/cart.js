// e.preventDefault evita el salto de pantalla cuando se da click en un boton
//e.target trae imformacion del codigo html donde se hace click
//crear las variables o selectores
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const divProducts = document.querySelector("#products-from-db");
let articulosCarrito = [];

// print products
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`https://chicharronera-servicio-l5g2.onrender.com/getproducts`)
    .then((response) => response.data)
    .then((data) => {
      // print in select
      data.map((item) => {
        divProducts.innerHTML += `
            <div class="four columns">
                <div class="card">                    
                    <div class="info-card">
                        <img src="../../../uploads/${item.imagenP}" class="imagen-curso">
                        <h4>${item.nombre}</h4>
                        
                        <img src="img/estrellas.png">
                        <p class="precio">  <span class="u-pull-right ">$${item.precio}</span></p>
                        <div class="row">
                          <a onclick="location.href = './editar-producto.html?id=${item._id}'" target="_blank" href="./editar-producto.html?id=${item._id}" data-id="1">
                            <img width="40" src="img/componer (1).png">
                          </a>
                          <a onclick="location.href = './eliminar-producto.html?id=${item._id}'" target="_blank" href="./editar-producto.html?id=${item._id}" data-id="1">
                            <img width="40" src="img/basura (1) (1).png">
                          </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

//definir los eventos o listeners

cargarEventListener();
function cargarEventListener() {
  //cuando haga click al boton de agregar al carrito voy a llamar a la funcion de agregarCurso
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina un curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    vaciarCarrito();
  });
}

//definir las funciones

function agregarCurso(e) {
  e.preventDefault();
  //console.log('ingrese a la funcion agregar curso')
  //console.log(e.target.classList.contains('agregar-carrito'))

  if (e.target.classList.contains("agregar-carrito")) {
    //console.log(e.target.parentElement)
    const curso = e.target.parentElement;
    leerDatosCurso(curso);
  } /*else{
        //crear el objeto
        const cursoObj = {
            curso: curso,
            id: Date.now()
        }
        //guardar los objetos en el arreglo
        curso = [...curso,cursoObj];
        console.log(cursoObj)

        sincronizarStorage();
    } */
}

function sincronizarStorage() {
  localStorage.setItem("curso", JSON.stringify(curso));
}

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    const existe = articulosCarrito.some((cursos) => cursos.id === cursoId);

    if (existe) {
      const cursos = articulosCarrito.map((cursos) => {
        if (cursos.id === cursoId) {
          //primero verifico el id para asegurar que haya encontrado el producto a eliminar
          if (cursos.cantidad > 1) {
            cursos.cantidad--;
            return cursos;
          } else {
            articulosCarrito = articulosCarrito.filter(
              (cursos) => cursos.id !== cursoId
            );
            //caso base: cantidad = 1
            return cursos;
          }
        }
      });
    }

    carritoHTML();
  }
}

function vaciarCarrito() {
  //forma lenta
  //contenedorCarrito.innerHTML = '';

  //forma rapida
  while (contenedorCarrito.firstChild)
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}

function leerDatosCurso(curso) {
  //console.log('ingrese a la funcion leer');
  //console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //console.log(infoCurso)
  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //console.log(articulosCarrito)
  carritoHTML();
}

function carritoHTML() {
  vaciarCarrito();
  articulosCarrito.forEach((cursos) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${cursos.imagen}" width=100>
            </td>
            <td>${cursos.titulo}</td>
            <td>${cursos.precio}</td>
            <td>${cursos.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${cursos.id}">X</a>
            </td>
        `;

    contenedorCarrito.appendChild(row);
  });
}
