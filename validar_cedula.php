<?php
require 'conexion.php';

$cedula = $_GET['cedula'] ?? '';

$stmt = $pdo->prepare("SELECT COUNT(*) FROM clientes WHERE cedula = :cedula");
$stmt->execute([':cedula' => $cedula]);
$count = $stmt->fetchColumn();

echo $count > 0 ? "1" : "0";
?>
