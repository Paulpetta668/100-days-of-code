<?php
    session_start();

    $User = "Blog";
    $Pass = "umsWXa&jVA63X5vd";
    $DB = "blogDB";

    if (!isset($_COOKIE["login"])) {
        header("Location: login.php");
    } else {
        $cookie = $_COOKIE["login"];
        $cookie = explode("|", $cookie);

        $userID = $cookie[0];
        $token = $cookie[1];

        $conn = new mysqli("localhost", $User, $Pass, $DB);
        $query = "SELECT * FROM LogTokens WHERE UserIDf = $userID AND Token = '" . hash('sha256', $token) . "' AND ExpiryDate > " . time();

        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            //Get user info
            $query = "SELECT * FROM User WHERE UserID = $userID";
            $result = $conn->query($query);
            $row = $result->fetch_assoc();

            $name = $row["Name"];
            $surname = $row["Surname"];
        } else {
            header("Location: login.php");
        }
    }
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <title>Home</title>

    <link type="text/css" rel="stylesheet" href="../CSS/home.css">
    <link type="text/css" rel="stylesheet" href="../CSS/master.css">
</head>

<body>
<header>
    <nav id="topBar">
        <div id="left">
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="">About</a></li>
            </ul>
        </div>
        <div id="right">
            <p>
                <?php
                echo "Welcome, " . $name . " " . $surname;
                ?>
            </p>
            <div>

            </div>
        </div>
    </nav>
</header>
</body>
</html>