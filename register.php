<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['username'];
$pass = $_POST['password'];  // 비밀번호를 해시하지 않고 그대로 사용

$stmt = $conn->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $user, $pass);

if ($stmt->execute() === TRUE) {
    echo "<script>
            alert('Registration completed successfully.');
            window.location.href = 'login.html';
          </script>";
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
