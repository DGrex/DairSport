<?php
require 'conexion.php'; // aquí ya tienes disponible la variable $pdo

try {
    // Recibir datos del formulario
    $cedula   = $_POST['inputCedulaR'] ?? '';
    $nombre   = $_POST['inputNombreR'] ?? '';
    $apellido = $_POST['inputApellidoR'] ?? '';
    $correo   = $_POST['inputCorreoR'] ?? '';
    $telefono = $_POST['inputTelefonoR'] ?? '';
    $deuda    = $_POST['inputDeudaR'] ?? 0;

    // Validar que la cédula no esté vacía
    if (empty($cedula)) {
        die("❌ Error: La cédula es obligatoria.");
    }

    // Verificar si la cédula ya existe
    $check = $pdo->prepare("SELECT COUNT(*) FROM clientes WHERE cedula = :cedula");
    $check->execute([':cedula' => $cedula]);
    if ($check->fetchColumn() > 0) {
        die("❌ Error: La cédula ya está registrada.");
    }

    // Insertar en la tabla
    $sql = "INSERT INTO clientes (cedula, nombre, apellido, correo, telefono, deuda) 
            VALUES (:cedula, :nombre, :apellido, :correo, :telefono, :deuda)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':cedula'   => $cedula,
        ':nombre'   => $nombre,
        ':apellido' => $apellido,
        ':correo'   => $correo,
        ':telefono' => $telefono,
        ':deuda'    => $deuda
    ]);

    echo "✅ Cliente guardado correctamente.";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
