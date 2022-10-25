<?php
    include_once "../Classes/User.php";
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

            $user = new User($row["UserID"], $row["Name"], $row["Surname"], $row["Email"]);
        } else {
            setcookie("login", "", time() - 3600, "/");

            header("Location: login.php");
        }
    }
?>
<html>
<head>
    <link href="../CSS/master.css" rel="stylesheet" type="text/css">
    <title>Profile</title>
</head>
<body>
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
                echo "Welcome, " . $user->getName() . " " . $user->getSurname();
            ?>
        </p>
        <div>

        </div>
    </div>
</nav>
</body>
</html>
