<?php
require 'conexion.php';

$usuario = $_POST['usuario'] ?? '';
$password = $_POST['clave'] ?? '';

$sql = "SELECT clave FROM usuarios WHERE usuario = :usuario";
$stmt = $pdo->prepare($sql);
$stmt->execute([':usuario' => $usuario]);
$row = $stmt->fetch();

if ($row && password_verify($password, $row['clave'])) {
    // Contraseña correcta → iniciar sesión
    session_start();
    $_SESSION['usuario'] = $usuario;
    echo "Éxito: Login correcto";
} else {
    // Contraseña incorrecta
    echo "Usuario o contraseña inválidos";
}
?>
