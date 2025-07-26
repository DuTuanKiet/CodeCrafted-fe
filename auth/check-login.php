<?php
session_start();
include("connect.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Phương thức không hợp lệ.");
}

$username = $_POST["username"] ?? '';
$password = $_POST["password"] ?? '';

if (empty($username) || empty($password)) {
    echo "Thiếu tên đăng nhập hoặc mật khẩu.";
    exit;
}



// Truy vấn user theo username
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
if (!$stmt) {
    echo "Lỗi prepare: " . $conn->error;
    exit;
}
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();

  if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['username'];
     header("Location: ../index.html");
  ;
        exit;
    } else {
        echo "<strong> Mật khẩu không khớp!</strong><br>";
    }
} else {
    echo "<strong>Không tìm thấy tài khoản với username: $username</strong><br>";
}

echo "<br><strong>Đăng nhập thất bại.</strong>";
exit;
?>
