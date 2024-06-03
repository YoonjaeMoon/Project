<?php
$servername = "localhost";
$username = "root";
$password = "root"; 
$dbname = "mydatabase"; 

// Create MySQL connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$user = $_POST['username'];
$pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

// Use prepared statement
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
