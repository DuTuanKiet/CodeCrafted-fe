<?php
ob_start();
session_start();
include("connect.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Phương thức không hợp lệ.");
}

$username = trim($_POST["username"] ?? '');
$password = $_POST["password"] ?? '';

if (empty($username) || empty($password)) {
    $_SESSION['login_error'] = "Thiếu tên đăng nhập hoặc mật khẩu.";
    header("Location: authModal.html");
    exit();
}

// Kiểm tra tài khoản admin
$sql_admin = "SELECT id, username, password FROM admins WHERE username = ?";
$stmt_admin = $conn->prepare($sql_admin);
if (!$stmt_admin) {
    die("Lỗi prepare câu lệnh admin: " . $conn->error);
}
$stmt_admin->bind_param("s", $username);
$stmt_admin->execute();
$result_admin = $stmt_admin->get_result();

if ($result_admin && $result_admin->num_rows === 1) {
    $admin = $result_admin->fetch_assoc();
    if ($password === $admin['password']) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user_id'] = $admin['id'];
        $_SESSION['username'] = $admin['username'];
        $_SESSION['role'] = 'admin';

        header("Location: ../admin-index.html");
        exit();
    } else {
        $_SESSION['login_error'] = "Mật khẩu không đúng.";
        header("Location: authModal.html");
        exit();
    }
}

// Kiểm tra tài khoản user
$sql_user = "SELECT id, username, password FROM users WHERE username = ? OR email = ?";
$stmt_user = $conn->prepare($sql_user);
if (!$stmt_user) {
    die("Lỗi prepare câu lệnh user: " . $conn->error);
}
$stmt_user->bind_param("ss", $username, $username);
$stmt_user->execute();
$result_user = $stmt_user->get_result();

if ($result_user && $result_user->num_rows === 1) {
    $user = $result_user->fetch_assoc();
    if ($password === $user['password']) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = 'user';

        header("Location: index.html");
        exit();
    } else {
        $_SESSION['login_error'] = "Mật khẩu không đúng.";
        header("Location: authModal.html");
        exit();
    }
}

// Không tìm thấy tài khoản
$_SESSION['login_error'] = "Tên đăng nhập không tồn tại.";
header("Location: authModal.html");
exit();
