<?php
    session_start();

    if(isset($_COOKIE["login"])) header("Location: index.php");

$User = "xxxx";
$Pass = "xxxx";
$DB = "xxxx";

    $conn = new mysqli("localhost", $User, $Pass); // Create connection

    if(isset($_POST["password"]) && isset($_POST["mail"])) {
        $mail = $_POST["mail"]; // Get the mail from the form
        $pass = hash("sha256", $_POST["password"]); //Encrypt the password

        $conn = new mysqli("localhost", $User, $Pass, $DB);

        $query = "SELECT * FROM User WHERE Email = '$mail' AND Password = '$pass' and Active = 1";
        $result = $conn->query($query);

        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $userID = $row["UserID"];
            $token = hash("ripemd160", $row["name"] . $row["email"] . $row["password"] . time());
            $expire = strtotime("+30 days"); // 86400 = 1 day

            setcookie("login", $userID . "|" . $token, $expire, "/");

            $query = "INSERT INTO LogTokens (UserIDf, Token, ExpiryDate) VALUES ($userID, '" . hash('sha256', $token) . "', $expire)";
            $result = $conn->query($query);

            if ($result) header("Location: index.php");
            else { setcookie("login", "", time() - 3600, "/");
                echo "Error: " . $conn->error;
            }

            header("Location: login.php");
        }
        else {
                echo '<div class="error">
                            <p>Wrong email or password</p>
                        </div>';
        }
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <title>Login</title>

    <link type="text/css" rel="stylesheet" href="../CSS/login.css">
    <link type="text/css" rel="stylesheet" href="../CSS/master.css">
</head>
<body>

    <form action="" method="post">
        <input type="email" name="mail" placeholder="E-Mail" required/>
        <input type="password" name="password" placeholder="Password" required/>
        <input type="submit" name="submit" value="Login"/>
    </form>

    <a href="signup.php">Dont have an account? Sign up</a>
</body>
</html>