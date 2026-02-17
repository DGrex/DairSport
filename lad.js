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

document.getElementById("formCliente").addEventListener("submit", async function (event) {
  event.preventDefault();

  let errores = []; // acumulador de mensajes

  const cedula = document.getElementById("inputCedulaR");
  if (!validarCedula(cedula.value.trim())) {
    cedula.classList.add("is-invalid");
    errores.push("❌ La cédula no tiene un formato válido.");
  } else {
    try {
      const respuesta=  await fetch("validar_cedula.php?cedula=" + cedula.value.trim());
      const existe = (await respuesta.text()).trim();
        if (existe === "0") {
          cedula.classList.remove("is-invalid");
          cedula.classList.add("is-valid");
        } else {
          cedula.classList.add("is-invalid");
          valido = false;
          errores.push("❌La cédula ya está registrada.");
        }
    } catch (error) {
        errores.push("❌Error al validar la cédula: " + error);
        valido = false;
    }
  }

  const nombre = document.getElementById("inputNombreR");
  if (nombre.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
    nombre.classList.add("is-invalid");
    errores.push("❌ El nombre no es válido.");
  } else {
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
  }

  const apellido = document.getElementById("inputApellidoR");
  if (apellido.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(apellido.value.trim())) {
    apellido.classList.add("is-invalid");
    errores.push("❌ El apellido no es válido.");
  } else {
    apellido.classList.remove("is-invalid");
    apellido.classList.add("is-valid");
  }

  const correo = document.getElementById("inputCorreoR");
  if (!/\S+@\S+\.\S+/.test(correo.value.trim())) {
    correo.classList.add("is-invalid");
    errores.push("❌ El correo no es válido.");
  } else {
    correo.classList.remove("is-invalid");
    correo.classList.add("is-valid");
  }

  const telefono = document.getElementById("inputTelefonoR");
  if (telefono.value.trim() !== "" && !/^\d+$/.test(telefono.value.trim())) {
    telefono.classList.add("is-invalid");
    errores.push("❌ El teléfono debe ser numérico.");
  } else {
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
  }

  const deuda = document.getElementById("inputDeudaR");
  if (parseFloat(deuda.value) < 0) {
    deuda.classList.add("is-invalid");
    errores.push("❌ La deuda no puede ser negativa.");
  } else {
    deuda.classList.remove("is-invalid");
    deuda.classList.add("is-valid");
  }

  // Mostrar errores si existen
  if (errores.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Errores en el formulario",
      html: errores.join("<br>")
    });
    return; // no enviar
  }

  // Si todo está bien, enviar con fetch
  const formData = new FormData(this);
  fetch("guardar_cliente.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    Swal.fire({
      icon: data.includes("Error") ? "error" : "success",
      title: data.includes("Error") ? "Error" : "Éxito",
      text: data
    });
  })
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al procesar el cliente."
    });
  });
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


document.getElementById("formVenta").addEventListener("submit", function(e) {
  e.preventDefault(); // evita recargar la página

  const formData = new FormData(this);

  fetch("guardar_venta.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Mostrar el mensaje en un cuadro de diálogo
    Swal.fire({
      icon: data.includes("Error") ? "error" : "success",
      title: data.includes("Error") ? "Error" : "Éxito",
      text: data
    });
  })
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al procesar la venta."
    });
  });
});

document.getElementById("formPago").addEventListener("submit", function(e) {
  e.preventDefault(); // evita recargar la página

  const formData = new FormData(this);

  fetch("guardar_pago.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Mostrar el mensaje en un cuadro de diálogo
    Swal.fire({
      icon: data.includes("Error") ? "error" : "success",
      title: data.includes("Error") ? "Error" : "Éxito",
      text: data
    });
  })
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al procesar la venta."
    });
  });
});




// login

document.getElementById("formLogin").addEventListener("submit", async function(e){
  e.preventDefault();
  const formData = new FormData(this);

  try {
    const resp = await fetch("validar_login.php", { method:"POST", body:formData });
    const data = await resp.text();

    if(data.includes("Éxito")){
      Swal.fire({
        icon:"success",
        title:"Bienvenido",
        text:data
      }).then(() => {
        document.getElementById("contenedorLogin").style.display = "none";
        document.getElementById("dropdownMenuButton").style.display = "block";
        contenedorCliente.style.display = "block";
      });
    } else {
      Swal.fire({
        icon:"error",
        title:"Error",
        text:data
      });
    }
  } catch(err){
    Swal.fire({ icon:"error", title:"Error", text:"No se pudo conectar al servidor." });
  }
});

//limpiar formulario de clientes

