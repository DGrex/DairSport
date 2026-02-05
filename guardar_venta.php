<?php
require 'conexion.php';

$cedula = $_POST['inputCedulaV'] ?? '';
$deuda  = $_POST['inputDeudaV'] ?? 0;

// Buscar id_cliente
$stmt = $pdo->prepare("SELECT id FROM clientes WHERE cedula = :cedula");
$stmt->execute([':cedula' => $cedula]);
$id_cliente = $stmt->fetchColumn();

if (!$id_cliente) {
    die("❌ Error: Cliente no encontrado.");
}

// Insertar venta
$sql = "INSERT INTO venta (id_cliente, v_deuda) VALUES (:id_cliente, :v_deuda)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':id_cliente' => $id_cliente,
    ':v_deuda'    => $deuda
]);

echo "✅ Venta registrada correctamente.";
?>
