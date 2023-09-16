const form = document.querySelector("#user-pedido");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombreApellido = document.getElementById("nombre-apellido").value;
  const cedula = document.getElementById("cedula").value;
  const correoElectronico = document.getElementById("telefono").value;
  const localidad = document.getElementById("localidad").value;
  const direccion = document.getElementById("direccion").value;

  const metodoPagoRadio = document.querySelector(
    'input[name="metodo-pago"]:checked'
  );
  let metodoPago = "";

  if (metodoPagoRadio) {
    metodoPago = metodoPagoRadio.value;
  }

  const userData = `
    nombre: ${nombreApellido}
    cedula: ${cedula}
    correo: ${correoElectronico}
    localidad: ${localidad}
    direccion: ${direccion}
    metodo de pago: ${metodoPago}
  `;

  // console.log("Nombre y Apellido:", nombreApellido);
  // console.log("Cedula de Identidad:", cedula);
  // console.log("Correo Electrónico:", correoElectronico);
  // console.log("Localidad:", localidad);
  // console.log("Dirección:", direccion);
  // console.log("Método de Pago:", metodoPago);

  // Mostrar los datos en el carrito de entrega
  let carritoHTML = `
    <p>Nombre y Apellido: ${nombreApellido}</p>
    <p>Cedula de Identidad: ${cedula}</p>
    <p>Correo Electrónico: ${correoElectronico}</p>
    <p>Localidad: ${localidad}</p>
    <p>Dirección: ${direccion}</p>
    <p>Método de Pago: ${metodoPago}</p>
  `;

  const carritoData = localStorage.getItem("carrito");
  const carrito = JSON.parse(carritoData);

  let productData = ``;

  if (carrito && carrito.length > 0) {
    carritoHTML += "<p>Productos en el carrito:</p>";
    carrito.forEach((curso) => {
      carritoHTML += `
        <div class="producto">
            <img style="border-radius: 4%; height: 200px; width: 200px;" src="${curso.imagen}" alt="${curso.titulo}">
            <p>${curso.titulo}</p>
            <p>Precio: ${curso.precio}</p>
            <p>Cantidad: ${curso.cantidad}</p>
        </div>
      `;

      // Mostrar productos en la consola
      // console.log("Producto:", curso.titulo);
      // console.log("Precio:", curso.precio);
      // console.log("Cantidad:", curso.cantidad);
      // console.log("---");
      productData += `
        (${curso.cantidad}) ${curso.titulo}: ${curso.precio}
      `;
    });
  }

  console.log(userData);
  console.log(productData);

  // send email
  await emailjs
    .send("service_dlltl2n", "crear_pedido", {
      client_data: userData,
      product_list: productData,
    })
    .then((data) => {
      alert('Pedido creado exitosamente!');
    })
    .catch((e) => {
      alert('Ha ocurrido un error!, intentelo nuevamente');
      console.log(e);
    });

  carritoEntrega.innerHTML = carritoHTML;
});

document.addEventListener("DOMContentLoaded", function () {
  mostrarCarritoEnEntrega();

  // const form = document.querySelector("form");
  // const carritoEntrega = document.getElementById("carrito-entrega");

  // Mostrar el carrito inicialmente
  function mostrarCarritoEnEntrega() {
    const carritoEntrega = document.querySelector("#carrito-entrega");
    const carritoData = localStorage.getItem("carrito");
    const carrito = JSON.parse(carritoData);

    if (carrito && carrito.length > 0) {
      let carritoHTML = "";
      carrito.forEach((curso) => {
        carritoHTML += `
            <div class="producto">
                <img style="border-radius: 4%; height: 200px; width: 200px;" src="${curso.imagen}" alt="${curso.titulo}">
                <p>${curso.titulo}</p>
                <p>Precio: ${curso.precio}</p>
                <p>Cantidad: ${curso.cantidad}</p>
            </div>
          `;
      });

      carritoEntrega.innerHTML = carritoHTML;
    }
  }
});
