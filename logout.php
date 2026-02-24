<?php
session_start();      // reanuda la sesión actual
session_unset();      // elimina todas las variables de sesión
session_destroy();    // destruye la sesión en el servidor

// Recarga la pagina de inicio o redirige a la página de login
header("Location: index.php");
exit;
?>
