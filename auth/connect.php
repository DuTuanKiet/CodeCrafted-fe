<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "codecrafted"; // hoặc tên DB em đang dùng

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}
?>
