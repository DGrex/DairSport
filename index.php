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
            <div class="col-md-4">
              <label for="inputDeudaR" class="form-label">Deuda</label>
              <input
                type="number"
                class="form-control"
                id="inputDeudaR"
                name="inputDeudaR"
                
                
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
          <form class="row g-3" style="margin-top: 1%">
            <div
              class="col-12"
              style="display: flex; flex-direction: row; align-items: end"
            >
              <div class="col-md-3" style="margin-right: 10px">
                <label for="inpCedula" class="form-label">Cedula</label>
                <input type="text" class="form-control" id="inputCedula" />
              </div>
              <div class="">
                <button type="submit" class="btn btn-primary">Buscar</button>
              </div>
            </div>

            <div class="col-md-6">
              <label for="inputNombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="inputNombre"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="inputApellido" class="form-label">Apellido</label>
              <input
                type="text"
                class="form-control"
                id="inputApellido"
                disabled
              />
            </div>

            <div class="col-md-3">
              <label for="inputDeuda" class="form-label">Deuda</label>
              <input
                type="number"
                class="form-control"
                id="inputDeuda"
                min="0"
                step="0.01"
                value="0"
              />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>

        <div class="contenedorPagos" id="contenedorPagos" style="display: none">
          <h1>Pagos</h1>
          <form class="row g-3" style="margin-top: 1%">
            <div
              class="col-12"
              style="display: flex; flex-direction: row; align-items: end"
            >
              <div class="col-md-3" style="margin-right: 10px">
                <label for="inpCedula" class="form-label">Cedula</label>
                <input type="text" class="form-control" id="inputCedula" />
              </div>
              <div class="">
                <button type="submit" class="btn btn-primary">Buscar</button>
              </div>
            </div>

            <div class="col-md-6">
              <label for="inputNombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="inputNombre"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="inputApellido" class="form-label">Apellido</label>
              <input
                type="text"
                class="form-control"
                id="inputApellido"
                disabled
              />
            </div>

            <div class="col-md-3">
              <label for="inputDeuda" class="form-label">Deuda</label>
              <input
                type="number"
                class="form-control"
                id="inputDeuda"
                min="0"
                step="0.01"
                value="0"
                disabled
              />
            </div>

            <div class="col-md-3">
              <label for="inputDeuda" class="form-label">Valor a Pagar</label>
              <input
                type="number"
                class="form-control"
                id="inputDeuda"
                min="0"
                step="0.01"
                value="0"
              />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>




      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lad.js"></script>
  </body>
</html>
