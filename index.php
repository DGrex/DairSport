<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
    <title>DairSport</title>
  </head>
  <body class="bg-slategray d-flex justify-content-center align-items-center min-vh-100 m-0">

    <div class="container bg-light rounded-3 shadow p-4">
      <!-- Menú -->
      <div class="menu-wrapper d-flex justify-content-between align-items-center">
        <div class="dropdown">
          <button 
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="display: none"
          >
            Menú
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" id="btnCliente">Clientes</a></li>
            <li><a class="dropdown-item" id="btnVenta">Ventas</a></li>
            <li><a class="dropdown-item" id="btnPagos">Pagos</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
          </ul>
        </div>
        <h2 class="m-0">DairSport</h2>
      </div>

      <!-- Login -->
       <div id="contenedorLogin">
        <div class="container bg-light p-4 rounded shadow" style="max-width:400px;">
          <h2 class="text-center mb-3">Acceso al sistema</h2>
          <form id="formLogin">
            <div class="mb-3">
              <label for="usuario" class="form-label">Usuario</label>
              <input type="text" class="form-control" id="usuario" name="usuario" required>
            </div>
            <div class="mb-3">
              <label for="clave" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="clave" name="clave" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
          </form>
        </div>
      </div>

      <!-- Clientes -->
      <div id="contenedorCLiente" style="display: none">
        <h1 class="h4 text-center mb-3">Cliente</h1>
        <form id="formCliente" class="row g-3" action="guardar_cliente.php" method="POST">
          <div class="col-12 col-md-6">
            <label for="inputCedulaR" class="form-label">Cédula</label>
            <input type="text" class="form-control" id="inputCedulaR" name="inputCedulaR" />
          </div>

          <div class="col-12 col-md-6">
            <label for="inputNombreR" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputNombreR" name="inputNombreR" />
          </div>
          <div class="col-12 col-md-6">
            <label for="inputApellidoR" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="inputApellidoR" name="inputApellidoR" />
          </div>
          <div class="col-12 col-md-6">
            <label for="inputCorreoR" class="form-label">Correo</label>
            <input type="email" class="form-control" id="inputCorreoR" name="inputCorreoR" />
          </div>
          <div class="col-12 col-md-6">
            <label for="inputTelefonoR" class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="inputTelefonoR" name="inputTelefonoR" />
          </div>
          <div class="col-12 col-md-3">
            <label for="inputDeudaR" class="form-label">Deuda</label>
            <input type="number" class="form-control" id="inputDeudaR" name="inputDeudaR" min="0" step="0.01" value="0" />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-success w-100">Guardar</button>
          </div>
        </form>
      </div>

      <!-- Ventas -->
      <div id="contenedorVenta" style="display: none">
        <h1 class="h4 text-center mb-3">Ventas</h1>
        <form class="row g-3" id="formVenta" action="guardar_venta.php" method="POST">
          <div class="row">
            <div class="col-8 col-md-3">
              <label for="inputCedulaV" class="form-label">Cédula</label>
              <input type="text" class="form-control" id="inputCedulaV" name="inputCedulaV" />
            </div>
            <div class="col-4 col-md-2 d-flex align-items-end">
              <button type="button" id="btnBuscarV" class="btn btn-primary w-100">Buscar</button>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label for="inputNombreV" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputNombreV" name="inputNombreV" disabled />
          </div>
          <div class="col-12 col-md-6">
            <label for="inputApellidoV" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="inputApellidoV" name="inputApellidoV" disabled />
          </div>

          <div class="col-12 col-md-3">
            <label for="inputDeudaActualV" class="form-label">Deuda Actual</label>
            <input type="number" class="form-control" id="inputDeudaActualV" name="inputDeudaActualV" disabled />
          </div>

          <div class="col-12 col-md-3">
            <label for="inputDeudaV" class="form-label">Nueva Deuda</label>
            <input type="number" class="form-control" id="inputDeudaV" name="inputDeudaV" min="1" step="0.01" value="1" />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-success w-100">Guardar Venta</button>
          </div>
        </form>
      </div>

      <!-- Pagos -->
      <div id="contenedorPagos" style="display: none">
        <h1 class="h4 text-center mb-3">Pagos</h1>
        <form class="row g-3" id="formPago" action="guardar_pago.php" method="POST">
          <div class="row">
            <div class="col-8 col-md-3">
              <label for="inputCedulaP" class="form-label">Cédula</label>
              <input type="text" class="form-control" id="inputCedulaP" name="inputCedulaP" />
            </div>
            <div class="col-4 col-md-2 d-flex align-items-end">
              <button type="button" id="btnBuscarP" class="btn btn-primary w-100">Buscar</button>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label for="inputNombreP" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputNombreP" name="inputNombreP" disabled />
          </div>
          <div class="col-12 col-md-6">
            <label for="inputApellidoP" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="inputApellidoP" name="inputApellidoP" disabled />
          </div>

          <div class="col-12 col-md-3">
            <label for="inputDeudaActualP" class="form-label">Deuda Actual</label>
            <input type="number" class="form-control" id="inputDeudaActualP" name="inputDeudaActualP" disabled />
          </div>

          <div class="col-12 col-md-3">
            <label for="inputPagoP" class="form-label">Valor a Pagar</label>
            <input type="number" class="form-control" id="inputPagoP" name="inputPagoP" min="1" step="0.01" value="1" />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-success w-100">Guardar Pago</button>
          </div>
        </form>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lad.js"></script>
  </body>
</html>


