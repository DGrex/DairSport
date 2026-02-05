<?php
require 'conexion.php';

$cedula = $_GET['cedula'] ?? '';

$stmt = $pdo->prepare("SELECT id, nombre, apellido, deuda FROM clientes WHERE cedula = :cedula");
$stmt->execute([':cedula' => $cedula]);
$cliente = $stmt->fetch(PDO::FETCH_ASSOC);

if ($cliente) {
    echo json_encode([
        "encontrado" => true,
        "id" => $cliente['id'],
        "nombre" => $cliente['nombre'],
        "apellido" => $cliente['apellido'],
        "deuda" => $cliente['deuda']
    ]);
} else {
    echo json_encode(["encontrado" => false]);
}
?>
