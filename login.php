<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = isset($_POST['username']) ? $_POST['username'] : '';
$pass = isset($_POST['password']) ? $_POST['password'] : '';

$sql = "SELECT * FROM user WHERE username='$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($pass == $row['password']) {  // 비밀번호를 해시하지 않고 비교
        $_SESSION['username'] = $user;
        echo "로그인 성공!";
        header("Location: mypage.html");
        exit();
    } else {
        echo "잘못된 비밀번호입니다.";
    }
} else {
    echo "사용자가 존재하지 않습니다.";
}

$conn->close();
?>
