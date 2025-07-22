<?php
session_start();
include("connect.php");

// ===== Kiểm tra request gửi qua POST chưa =====
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405); 
  exit("Phương thức không hợp lệ.");
}

// ===== Lấy dữ liệu từ form và kiểm tra =====
$username = $_POST["username"] ?? '';
$password = $_POST["password"] ?? '';

if (empty($username) || empty($password)) {
  header("Location: ../index.html?login=missing");
  exit;
}

// ===== Truy vấn người dùng =====
$stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();

  // ===== Kiểm tra mật khẩu =====
  if (password_verify($password, $user["password"])) {
    // Đăng nhập thành công
    $_SESSION["user"] = $user["username"];
    header("Location: ../index.html?login=success");
    exit;
  }
}

// ===== Đăng nhập thất bại =====
header("Location: ../index.html?login=fail");
exit;
?>
