<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Menú desplegable dentro del cuadro</title>
  </head>
  <body>
    <div class="contenedor">
      <div class="menu-wrapper">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" id="btnCliente">Clientes</a></li>
            <li><a class="dropdown-item" id="btnVenta">Ventas</a></li>
            <li><a class="dropdown-item" id="btnPagos">Pagos</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
          </ul>
        </div>
        <h2>DairSport</h2>
      </div>

      <div class="contenedordos">


        <div
          class="contenedorCLiente"
          id="contenedorCLiente"
          style="display: none"
          >
          <h1>Cliente</h1>
          <form
            id="formCliente"
            class="row g-3"
            style="margin-top: 1%"
            action="guardar_cliente.php"
            method="POST"
           >
            <div class="col-md-6">
              <label for="inputCedulaR" class="form-label">Cedula</label>
              <input
                type="text"
                class="form-control"
                id="inputCedulaR"
                name="inputCedulaR"
              />              
            </div>
            <div class="w-100"></div>

            <div class="col-md-6">
              <label for="inputNombreR" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="inputNombreR"
                name="inputNombreR"
              />
            </div>
            <div class="col-md-6">
              <label for="inputApellidoR" class="form-label">Apellido</label>
              <input
                type="text"
                class="form-control"
                id="inputApellidoR"
                name="inputApellidoR"
              />
            </div>
            <div class="col-md-6">
              <label for="inputCorreoR" class="form-label">Correo</label>
              <input
                type="email"
                class="form-control"
                id="inputCorreoR"
                name="inputCorreoR"
              />
            </div>
            <div class="col-md-6">
              <label for="inputTelefonoR" class="form-label">Telefono</label>
              <input
                type="text"
                class="form-control"
                id="inputTelefonoR"
                name="inputTelefonoR"
              />
            </div>
            <div class="col-md-3">
              <label for="inputDeudaR" class="form-label">Deuda</label>
              <input
                type="number"
                class="form-control"
                id="inputDeudaR"
                name="inputDeudaR"
                min="0"
                step="0.01"                
                value="0"
              />
            </div>
            <div class="col-12">
              <button  type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>

        <div class="contenedorVenta" id="contenedorVenta" style="display: none">
          <h1>Ventas</h1>
          <form class="row g-3" id="formVenta" style="margin-top: 1%" action="guardar_venta.php" method="POST">
            <div class="col-12" style="display: flex; flex-direction: row; align-items: end">
              <div class="col-md-3" style="margin-right: 10px">
                <label for="inputCedulaV" class="form-label">Cédula</label>
                <input type="text" class="form-control" id="inputCedulaV" name="inputCedulaV" />
              </div>
              <div>
                <button type="button" id="btnBuscarV" class="btn btn-primary">Buscar</button>
              </div>
            </div>

            <div class="col-md-6">
              <label for="inputNombreV" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="inputNombreV" name="inputNombreV" disabled />
            </div>
            <div class="col-md-6">
              <label for="inputApellidoV" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="inputApellidoV" name="inputApellidoV" disabled />
            </div>

            <div class="col-md-3">
              <label for="inputDeudaActualV" class="form-label">Deuda Actual</label>
              <input type="number" class="form-control" id="inputDeudaActualV" name="inputDeudaActualV" disabled/>
            </div>

            <div class="col-md-3">
              <label for="inputDeudaV" class="form-label">Nueva Deuda</label>
              <input type="number" class="form-control" id="inputDeudaV" name="inputDeudaV" min="1" step="0.01" value="1" />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-success">Guardar Venta</button>
            </div>
          </form>
        </div>

        <div class="contenedorPagos" id="contenedorPagos" style="display: none">
          <h1>Pagos</h1>
          <form class="row g-3" id="formPago" style="margin-top: 1%" action="guardar_pago.php" method="POST">
            <div class="col-12" style="display: flex; flex-direction: row; align-items: end">
              <div class="col-md-3" style="margin-right: 10px">
                <label for="inputCedulaP" class="form-label">Cédula</label>
                <input type="text" class="form-control" id="inputCedulaP" name="inputCedulaP" />
              </div>
              <div>
                <button type="button" id="btnBuscarP" class="btn btn-primary">Buscar</button>
              </div>
            </div>

            <div class="col-md-6">
              <label for="inputNombreP" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="inputNombreP" name="inputNombreP" disabled />
            </div>
            <div class="col-md-6">
              <label for="inputApellidoP" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="inputApellidoP" name="inputApellidoP" disabled />
            </div>

            <div class="col-md-3">
              <label for="inputDeudaActualP" class="form-label">Deuda Actual</label>
              <input type="number" class="form-control" id="inputDeudaActualP" name="inputDeudaActualP" disabled/>
            </div>

            <div class="col-md-3">
              <label for="inputPagoP" class="form-label">Valor a Pagar</label>
              <input type="number" class="form-control" id="inputPagoP" name="inputPagoP" min="1" step="0.01" value="1" />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-success">Guardar Venta</button>
            </div>
          </form>
        </div>




      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lad.js"></script>
  </body>
</html>
