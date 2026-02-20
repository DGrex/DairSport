<?php
require 'conexion.php';

$cedula = $_POST['inputCedulaP'] ?? '';
$pago  = $_POST['inputPagoP'] ?? 0;

// Buscar id_cliente
$stmt = $pdo->prepare("SELECT id FROM clientes WHERE cedula = :cedula");
$stmt->execute([':cedula' => $cedula]);
$id_cliente = $stmt->fetchColumn();

if (!$id_cliente) {
    die("❌ Error: Cliente no encontrado.");
}

// Insertar venta
$sql = "INSERT INTO pagos (id_cliente, v_pago) VALUES (:id_cliente, :v_pago)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':id_cliente' => $id_cliente,
    ':v_pago'    => $pago
]);

// Actualizar deuda (lo que hacía el trigger) 
$stmt = $pdo->prepare("UPDATE clientes SET deuda = deuda - :v_pago WHERE id = :id_cliente"); 
$stmt->execute([
    ':v_pago'    => $pago,
    ':id_cliente' => $id_cliente
]);

echo "✅ Pago registrada correctamente.";
?>
