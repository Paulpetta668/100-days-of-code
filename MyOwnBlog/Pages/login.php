<?php
    session_start();

    $User = "xxxxxx";
    $Pass = "xxxxxx";
    $DB = "xxxxx";

    $conn = new mysqli("localhost", $User, $Pass); // Create connection

    if(isset($_POST["password"]) && isset($_POST["mail"])) {
        $mail = $_POST["mail"]; // Get the mail from the form
        $pass = hash("sha256", $_POST["password"]); //Encrypt the password

        try{
            $conn = new mysqli("localhost", $User, $Pass, $DB);

            $query = "SELECT * FROM User WHERE Email = '$mail' AND Password = '$pass' and Active = 1";
            $result = $conn->query($query);

            if($result->num_rows > 0) header("Location: index.php");
            else echo "Wrong mail or password";
        }catch (Exception $e){
            echo "Error: " . $e->getMessage();
        } finally {
            $_POST["password"] = "";
            $_POST["mail"] = "";

            $conn->close();
        }
    }
?>

<!DOCTYPE html>
<html>
    <form action="" method="post">
        <input type="email" name="mail" placeholder="E-Mail" required/>
        <input type="password" name="password" placeholder="Password" required/>
        <input type="submit" name="submit" value="Login"/>
    </form>
</html>