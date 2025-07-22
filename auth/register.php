<?php
session_start();
include("connect.php");

$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];

// Kiểm tra xem đã có username hoặc email chưa
$check = $conn->prepare("SELECT * FROM users WHERE username=? OR email=?");
$check->bind_param("ss", $username, $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
  echo "Tên người dùng hoặc email đã tồn tại. <a href='../index.html'>Quay lại</a>";
  exit;
}

// Mã hoá mật khẩu
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Thêm người dùng mới
$insert = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
$insert->bind_param("sss", $username, $hashed, $email);

if ($insert->execute()) {
  header("Location: ../index.html?registered=1");
exit;
} else {
  echo "Lỗi khi đăng ký: " . $conn->error;
}

$conn->close();
?>
