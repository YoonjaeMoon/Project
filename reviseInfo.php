<?php
session_start();

// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "mydatabase";

// 데이터베이스 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];

    // 사용자 존재 여부 및 비밀번호 확인
    $stmt = $conn->prepare("SELECT password FROM user WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($stored_password);
        $stmt->fetch();

        if ($old_password === $stored_password) {
            // 비밀번호 업데이트
            $update_stmt = $conn->prepare("UPDATE user SET password = ? WHERE username = ?");
            $update_stmt->bind_param("ss", $new_password, $username);
            if ($update_stmt->execute()) {
                echo "<script>alert('Password updated successfully.'); window.location.href = 'login.html';</script>";

                exit();
            } else {
                echo "Error updating password.";
            }
            $update_stmt->close();
        } else {
            echo "Old password is incorrect.";
        }
    } else {
        echo "User not found.";
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
