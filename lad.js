const btnCliente = document.getElementById("btnCliente");
const btnVenta = document.getElementById("btnVenta");
const btnPagos = document.getElementById("btnPagos");
const contenedorCliente = document.getElementById("contenedorCLiente");
const contenedorVenta = document.getElementById("contenedorVenta");
const contenedorPagos = document.getElementById("contenedorPagos");

btnCliente.addEventListener("click", (e) => {
  e.preventDefault();
  contenedorVenta.style.display = "none";
  contenedorPagos.style.display = "none";
  contenedorCliente.style.display = "block";
});

btnVenta.addEventListener("click", (e) => {
  e.preventDefault();
  contenedorCliente.style.display = "none";
  contenedorPagos.style.display = "none";
  contenedorVenta.style.display = "block";
});

btnPagos.addEventListener("click", (e) => {
  e.preventDefault();
  contenedorCliente.style.display = "none";
  contenedorVenta.style.display = "none";
  contenedorPagos.style.display = "block";
});

document
  .getElementById("formCliente")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let valido = true;
       // Cédula




    const cedula = document.getElementById("inputCedulaR");

    // Validación de formato
    if (!validarCedula(cedula.value.trim())) {
      cedula.classList.add("is-invalid");
      valido = false;
    } else {
      try {
        // Consultar al servidor si la cédula existe
        const respuesta = await fetch("validar_cedula.php?cedula=" + cedula.value.trim());
        const existe = (await respuesta.text()).trim();
        

        if (existe === "0") {
          cedula.classList.remove("is-invalid");
          cedula.classList.add("is-valid");
        } else {
          cedula.classList.add("is-invalid");
          valido = false;
          alert("❌ La cédula ya está registrada.");
        }
      } catch (error) {
        alert("Error al validar la cédula: " + error);
        valido = false;
      }
    }

    // Nombre
    const nombre = document.getElementById("inputNombreR");
    if (nombre.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
    }

    // Apellido
    const apellido = document.getElementById("inputApellidoR");
    if (apellido.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(apellido.value.trim())) {
      apellido.classList.add("is-invalid");
      valido = false;
    } else {
      apellido.classList.remove("is-invalid");
      apellido.classList.add("is-valid");
    }

    // Correo
    const correo = document.getElementById("inputCorreoR");
    if (!/\S+@\S+\.\S+/.test(correo.value.trim())) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    // Teléfono (opcional, pero si se llena debe ser numérico)
    const telefono = document.getElementById("inputTelefonoR");
    if (telefono.value.trim() !== "" && !/^\d+$/.test(telefono.value.trim())) {
      
      telefono.classList.add("is-invalid");
      valido = false;
    } else {
      
      telefono.classList.remove("is-invalid");
      telefono.classList.add("is-valid");
    }

    // Deuda
    const deuda = document.getElementById("inputDeudaR");
    if (parseFloat(deuda.value) < 0) {
      deuda.classList.add("is-invalid");
      valido = false;
    } else {
      deuda.classList.remove("is-invalid");
      deuda.classList.add("is-valid");
    }

    // Si todo está bien, enviamos
    if (valido) {
      formCliente.submit();
    }

    
  });



  //Funcion para validar numero de cedulas ecuatoriana
function validarCedula(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || (provincia > 24 && provincia !== 30)) return false;

  const tercer = parseInt(cedula[2], 10);
  if (tercer >= 6) return false;

  const digitos = cedula.split("").map(Number);
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) {
      // posiciones impares
      let mult = digitos[i] * 2;
      if (mult > 9) mult -= 9;
      suma += mult;
    } else {
      suma += digitos[i];
    }
  }

  const verificador = (10 - (suma % 10)) % 10;
  return verificador === digitos[9];
}

// Apartado de Ventas

document.getElementById("btnBuscarV").addEventListener("click", async function() {
  const cedula= document.getElementById("inputCedulaV");
  if (!cedula.value.trim()) {
    cedula.classList.add("is-invalid");
    return
  }else{
    cedula.classList.remove("is-invalid");
    cedula.classList.add("is-valid");
  }

  try {
    const respuesta = await fetch("buscar_cliente.php?cedula="+cedula.value.trim())
    const cliente = await respuesta.json();
    if (cliente.encontrado) {
      cedula.readOnly = true
      document.getElementById("inputNombreV").value = cliente.nombre
      document.getElementById("inputApellidoV").value = cliente.apellido
      document.getElementById("inputDeudaActualV").value = cliente.deuda

    }else{
    cedula.classList.remove("is-valid");
    cedula.classList.add("is-invalid");
      
    }
  } catch (error) {
    alert("Error al buscar cliente: " + error)
  }

})


document.getElementById("btnBuscarP").addEventListener("click", async function () {
  const cedula = document.getElementById("inputCedulaP");
  if (!cedula.value.trim()) {
    cedula.classList.add("is-invalid")
    return
  }else{
    cedula.classList.remove("is-invalid");
    cedula.classList.add("is-valid");
  }

  try {
    const respuesta = await fetch("buscar_cliente.php?cedula="+cedula.value.trim())
    const cliente = await respuesta.json();
    if (cliente.encontrado) {
      cedula.readOnly = true
      document.getElementById("inputNombreP").value= cliente.nombre
      document.getElementById("inputApellidoP").value = cliente.apellido
      document.getElementById("inputDeudaActualP").value = cliente.deuda
    } else {
      cedula.classList.remove("is-valid");
      cedula.classList.add("is-invalid");
    }
  } catch (error) {
    alert("Error al buscar cliente: " + error)
  }
  
})