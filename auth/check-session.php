<?php
session_start();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Giả sử kiểm tra đúng
if ($username === 'admin' && $password === '123') {
    $_SESSION['user'] = $username;

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
