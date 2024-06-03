<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "root"; 
$dbname = "mydatabase"; 

// MySQL 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 폼에서 데이터 받기
$user = isset($_POST['username']) ? $_POST['username'] : '';
$pass = isset($_POST['password']) ? $_POST['password'] : '';

// 사용자 검색
$sql = "SELECT * FROM user WHERE username='$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // 비밀번호 검증
    if (password_verify($pass, $row['password'])) {
        $_SESSION['username'] = $user;
        echo "로그인 성공!";
        // 로그인 후 마이페이지로 리다이렉트
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
