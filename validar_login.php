<?php
require 'conexion.php';

$usuario = $_POST['usuario'] ?? '';
$clave   = $_POST['clave'] ?? '';

$stmt = $pdo->prepare("SELECT clave FROM usuarios WHERE usuario = :usuario");
$stmt->execute([':usuario' => $usuario]);
$claveGuardada = $stmt->fetchColumn();

if(!$claveGuardada){
    echo "❌ Usuario no encontrado.";
    exit;
}

// Comparación directa (texto plano)
if($clave === $claveGuardada){
    session_start();
    $_SESSION['usuario'] = $usuario;
    echo "Éxito: Login correcto.";
} else {
    echo "❌ Contraseña incorrecta.";
}
?>
