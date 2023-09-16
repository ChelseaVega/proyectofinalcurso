// Seleccionar los elementos del formulario
const createUserForm = document.querySelector("#form-register");
const createNameInput = document.querySelector("#create-name-input");
const createLastnameInput = document.querySelector("#create-lastname-input");
const createCedulaInput = document.querySelector("#create-id-input");
const createCelularInput = document.querySelector("#create-phone-input");
const createEmailInput = document.querySelector("#create-Email-input");
const createUsernameInput = document.querySelector("#create-username-input");
const createPasswordInput = document.querySelector("#create-password-input");

// Función para validar la contraseña
function validatePassword(password) {
  // Comprueba la longitud de la contraseña
  if (password.length < 8 || password.length > 12) {
    return false;
  }

  // Comprueba si contiene al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Comprueba si contiene al menos un carácter especial (puedes personalizar la lista de caracteres especiales)
  if (!/[@#$%^&+=]/.test(password)) {
    return false;
  }

  // Comprueba si contiene al menos un número
  if (!/\d/.test(password)) {
    return false;
  }

  return true;
}


// Agregar el event listener al formulario
createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Validar que no haya campos vacíos
  if (
    !createNameInput.value ||
    !createLastnameInput.value ||
    !createCedulaInput.value ||
    !createCelularInput.value ||
    !createEmailInput.value ||
    !createUsernameInput.value ||
    !createPasswordInput.value
  ) {
    alert("Por favor, complete todos los campos");
    //console.log(event);
    return;
  } 
  const password = createPasswordInput.value;

  // Validar la contraseña
  if (!validatePassword(password)) {
    alert("La contraseña debe tener entre 8 y 12 caracteres, incluir al menos una mayúscula, un carácter especial y contener números.");
    return;
  }
  
  else {
    //console.log(createCedulaInput.value);
    try {
      const newUser = {
        nombre: createNameInput.value,
        apellido: createLastnameInput.value,
        cedula: createCedulaInput.value,
        celular: createCelularInput.value,
        correo: createEmailInput.value,
        usuario: createUsernameInput.value,
        password: createPasswordInput.value,
        verified: false
      };

      console.log(newUser);

      // save in db
      axios
        .post("https://chicharroneraweb.onrender.com/newuser", newUser)
        .then((info) => {
          if(info.status && info.status == 201){
            location.href = '../iniciarsesion/index.html'
          }
        })
        .catch((e) => {
          if(e.response && e.response.status == 404){
            alert('Este usuario ya existe!');
          }
          console.log(e);
        });

      // Consulta con axios
      // const axiosResponse = await axios.post('/api/users', newUser);
      // console.log(axiosResponse);

      // // Verificar si el usuario ya existe
      // const existingUser = users.find((user) => user.username === createUsernameInput.value);
    } catch (error) {
      // Mostrar mensaje de error
      alert("Error al registrar el usuario");
      //console.log(error);
    }
  }
  async function createUser() {
    const response = await fetch("/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correo: "example@example.com",
        password: "password123"
      })
    });

    const data = await response.json();

    if (response.status === 400 && data.redirectTo) {
      // Redirigir a la ruta especificada en la respuesta
      window.location.href = data.redirectTo;
    }
  }

  createUser();

  
});
