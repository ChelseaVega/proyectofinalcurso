document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("nueva-cita");
  const citasList = document.getElementById("citas");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const cedula = document.getElementById("cedula").value;
    const zonaVive = document.getElementById("zonaVive").value;
    const mesaReservar = document.getElementById("mesaReservar").value;
    const hora = document.getElementById("hora").value;
    const fecha = document.getElementById("fechaRetorno").value;

    const newReserva = {
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      direccion: zonaVive,
      mesa: mesaReservar,
      hora: hora,
      fecha: fecha,
    };

    
    // Save in db
    axios
    .post("https://chicharronera.onrender.com/newreservation", newReserva)
      .then((response) => response.data)
      .then(async (data) => {
        // send email
        await emailjs
          .send("service_dlltl2n", "reserva_cliente", newReserva)
          .then((data) => {
            alert("Reserva creada exitosamente!");
          })
          .catch((e) => {
            alert("Ha ocurrido un error!, intentelo nuevamente");
            console.log(e);
          });

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    const cita = document.createElement("li");
    cita.className = "list-group-item";
    cita.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Cédula:</strong> ${cedula}</p>
            <p><strong>Zona donde vive:</strong> ${zonaVive}</p>
            <p><strong>Mesa a reservar:</strong> ${mesaReservar}</p>
            <p><strong>Hora:</strong> ${hora}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
        `;

    citasList.appendChild(cita);

    // try {
    //   // Consulta con axios
    //   const axiosResponse = await axios.post("/api/reservas", newReserva); // Usa /api/reservas si es el endpoint correcto
    //   console.log(axiosResponse);
    // } catch (error) {
    //   // Mostrar mensaje de error
    //   alert("Error al registrar la reserva");
    //   //console.log('error');
    // }

    // Limpiar campos del formulario
    form.reset();
  });
});

/*document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('nueva-cita');
    const citasList = document.getElementById('citas');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cedula = document.getElementById('cedula').value;
        const zonaVive = document.getElementById('zonaVive').value;
        const mesaReservar = document.getElementById('mesaReservar').value;
        const hora = document.getElementById('hora').value;
        const fecha = document.getElementById('fechaRetorno').value;

        const cita = document.createElement('li');
        cita.className = 'list-group-item';
        cita.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Cédula:</strong> ${cedula}</p>
            <p><strong>Zona donde vive:</strong> ${zonaVive}</p>
            <p><strong>Mesa a reservar:</strong> ${mesaReservar}</p>
            <p><strong>Hora:</strong> ${hora}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
        `;

        citasList.appendChild(cita);
        try {
            const newReserva = {
              nombre: nombre.value,
              apellido: apellido.value,
              cedula: cedula.value,
              direccion: zonaVive.value,
              mesa: mesaReservar.value,
              hora: hora.value,
              fecha: fecha.value,
            };
            
            console.log(newReserva);

            // Consulta con axios
            const axiosResponse = await axios.post('/api/reservas', newReserva); // Usa /api/reservas si es el endpoint correcto
            console.log(axiosResponse);
            
          } catch (error) {
            // Mostrar mensaje de error
            alert('Error al registrar el usuario');
            //console.log(error);
          
          }
          


        // Limpiar campos del formulario
        form.reset();

        












    });
});*/
