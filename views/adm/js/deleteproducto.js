const selectProduct = document.querySelector("#productSelect");

document.addEventListener("DOMContentLoaded", async () => {
  //obtener todos los productos
  axios
    .get(`https://chicharronera-servicio-l5g2.onrender.com/getproducts`)
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
});

selectProduct.addEventListener("change", function (e) {
  //obtener producto por id
  axios
    .get(`https://chicharronera-servicio-l5g2.onrender.com/getproduct/${this.value}`)
    .then((response) => response.data)
    .then((data) => {
      document
        .getElementById("formulario")
        .setAttribute("action", `/deleteproduct/${data._id}`);
    })
    .catch((e) => {
      console.log(e);
    });
});
