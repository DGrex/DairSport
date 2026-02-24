
// MENU DEL SISTEMA 
const btnCliente  = document.getElementById("btnCliente");
const btnVenta    = document.getElementById("btnVenta");
const btnPagos    = document.getElementById("btnPagos");
const btnExit     = document.getElementById("btnExit");

const contenedorCliente = document.getElementById("contenedorCLiente");
const contenedorVenta   = document.getElementById("contenedorVenta");
const contenedorPagos   = document.getElementById("contenedorPagos");
const contenedorLogin   = document.getElementById("contenedorLogin");

const dropdownMenuButton = document.getElementById("dropdownMenuButton");

const contenedores = [contenedorCliente, contenedorVenta, contenedorPagos, contenedorLogin];

// FUNCION PARA MOSTRAR CONTENEDOR Y OCULTAR LOS DEMAS
function mostrarContenedor(contenedor) {
  contenedores.forEach(c => c.classList.add("d-none"))
  contenedor.classList.remove("d-none")
}

// EVENTOS DE LOS BOTONES DEL MENU
btnCliente.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarContenedor(contenedorCliente);
});

btnVenta.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarContenedor(contenedorVenta);
});

btnPagos.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarContenedor(contenedorPagos);
});

btnExit.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "logout.php"; // esto cierra la sesión en el servidor
});


// EVENTO DE ENVIO DEL FORMULARIO DE LOGIN
document.getElementById("formLogin").addEventListener("submit", async function(e){
  e.preventDefault();
  const formData = new FormData(this);

  try {
    const resp = await fetch("validar_login.php", { method:"POST", body:formData });
    const data = await resp.text();

    if(data.includes("Éxito")){
      /*
      Swal.fire({
        icon:"success",
        title:"Bienvenido",
        text:data
      }).then(() => {
        mostrarContenedor(contenedorCliente);
        dropdownMenuButton.classList.remove("d-none");        
      });
      */
      mostrarContenedor(contenedorCliente);
      dropdownMenuButton.classList.remove("d-none");
      this.reset()//limpiar formulario
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



// VALIDACIONES Y ENVIO DEL FORMULARIO DE CLIENTES
document.getElementById("formCliente").addEventListener("submit", async function (event) {
  event.preventDefault();

  let errores = []; // acumulador de mensajes

  //VALIDAR CEDULA
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

  //VAALIDAR NOMBRE
  const nombre = document.getElementById("inputNombreR");
  if (nombre.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
    nombre.classList.add("is-invalid");
    errores.push("❌ El nombre no es válido.");
  } else {
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
  }

  //VALIDAR APELLIDO
  const apellido = document.getElementById("inputApellidoR");
  if (apellido.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(apellido.value.trim())) {
    apellido.classList.add("is-invalid");
    errores.push("❌ El apellido no es válido.");
  } else {
    apellido.classList.remove("is-invalid");
    apellido.classList.add("is-valid");
  }

  //VALIDAR CORREO
  const correo = document.getElementById("inputCorreoR");
  if (!/\S+@\S+\.\S+/.test(correo.value.trim())) {
    correo.classList.add("is-invalid");
    errores.push("❌ El correo no es válido.");
  } else {
    correo.classList.remove("is-invalid");
    correo.classList.add("is-valid");
  }

  //VALIDAR TELEFONO
  const telefono = document.getElementById("inputTelefonoR");
  if (telefono.value.trim() !== "" && !/^\d+$/.test(telefono.value.trim())) {
    telefono.classList.add("is-invalid");
    errores.push("❌ El teléfono debe ser numérico.");
  } else {
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
  }

  //VALIDAR DEUDA
  const deuda = document.getElementById("inputDeudaR");
  if (parseFloat(deuda.value) < 0) {
    deuda.classList.add("is-invalid");
    errores.push("❌ La deuda no puede ser negativa.");
  } else {
    deuda.classList.remove("is-invalid");
    deuda.classList.add("is-valid");
  }

  //MOSTRAR ERRORES SI LOS HAY
  if (errores.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Errores en el formulario",
      html: errores.join("<br>")
    });
    return; // si hay errores, no continuar con el envío
  }

  // SI TODO ES VÁLIDO, ENVIAR EL FORMULARIO
  const formData = new FormData(this);
  // ENVIAR DATOS AL SERVIDOR
  fetch("guardar_cliente.php", {
    method: "POST",
    body: formData
  })
  // RESPUESTA DEL SERVIDOR
  .then(response => response.text())
  .then(data => {
    Swal.fire({
      icon: data.includes("Error") ? "error" : "success",
      title: data.includes("Error") ? "Error" : "Éxito",
      text: data
    });
  })
  // ERROR DE CONEXIÓN
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al procesar el cliente."
    });
  });

  // LIMPIAR FORMULARIO
  document.getElementById("btn_reset_cliente").click();

});

// BUSCAR CLIENTE PARA VENTAS Y PAGOS

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


// EVENTOS DE ENVIO DE LOS FORMULARIOS DE VENTAS
document.getElementById("formVenta").addEventListener("submit", function(e) {
  e.preventDefault();

  if(!document.getElementById("inputNombreV").value){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Debe buscar el cliente."
    });
    return;
  }

  const formData = new FormData(this);

  fetch("guardar_venta.php", {
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
      text: "Hubo un problema al procesar la venta."
    });
  });
   document.getElementById("btn_reset").click();
});

// EVENTOS DE ENVIO DE LOS FORMULARIOS DE PAGOS
document.getElementById("formPago").addEventListener("submit", function(e) {
  e.preventDefault(); 
  
  // evita recargar la página
  if(!document.getElementById("inputNombreP").value){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Debe buscar el cliente."
    });
    return;
  }

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
  document.getElementById("btn_reset_pago").click();
});



//LIMPIAR FORMULARIO CLIENTE

document.getElementById("btn_reset_cliente").addEventListener("click", function(){
  limpiar_validacion("formCliente")  
})

//LIMPIAR FORMULARIO VENTAS
document.getElementById("btn_reset").addEventListener("click", function(){
  const cedula= document.getElementById("inputCedulaV").readOnly= false
  limpiar_validacion("formVenta")
})

//LIMPIAR FORMULARIO PAGOS
document.getElementById("btn_reset_pago").addEventListener("click", function(){
  document.getElementById("inputCedulaP").readOnly= false
  limpiar_validacion("formPago")
})

//FUNCION PARA LIMPIAR VALIDACIONES DE LOS FORMULARIOS
function limpiar_validacion(id_formulario){
  const idInput = `#${id_formulario} input`
  const inputs = document.querySelectorAll(idInput)
  inputs.forEach(input=>{
    input.classList.remove("is-valid", "is-invalid")
  })
}

//FUNCIÓN PARA VALIDAR CEDULA ECUATORIANA
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

//CREADO POR: DENIS GOYES MORAN - 2026