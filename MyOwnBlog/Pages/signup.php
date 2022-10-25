<?php
    session_start();

    $User = "Blog";
    $Pass = "umsWXa&jVA63X5vd";
    $DB = "blogDB";

    if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["pass"])){
        $nome = $_POST["name"];
        $cognome = $_POST["surname"];
        $mail = $_POST["email"];
        $pass = hash("sha256", $_POST["pass"]);

        try{
            $conn = new mysqli("localhost", $User, $Pass, $DB);

            $query = "INSERT INTO User (RoleIDf, Name, Surname, Email, Password, Active) VALUES (3, '$nome', '$cognome', '$mail', '$pass', 1)";
            $result = $conn->query($query);

            if ($result){
                sendMail();
                Header("Location: login.php");
            }
            else echo "Error: " . $conn->error;
        }catch (Exception $e){
            echo "Error: " . $e->getMessage();
        } finally {
            $_POST["name"] = "";
            $_POST["surname"] = "";
            $_POST["email"] = "";
            $_POST["pass"] = "";

            $conn->close();
        }
    }

    function sendMail(){
        $to = $_POST["email"];
        $subject = "Registrazione avvenuta con successo!";
        $message = "Benvenuto su MyOwnBlog! Ora puoi iniziare a scrivere i tuoi post! Verifica il tuo profilo qui: ";

        mail($to, $subject, $message);
    }
?>

<!DOCTYPE html>
<html lang="it">
    <form action="" method="post" id="formSignUp">
        <input name="name" placeholder="Name" type="text" required>
        <input name="surname" placeholder="Surname" type="text" required>
        <input name="email" placeholder="Email" type="email" required>
        <input name="pass2" placeholder="Repeat Password" type="password" required>
        <input name="pass" placeholder="Password" type="password" required>

        <a id="submit">Sign Up</a>
    </form>
</html>

<script>
    document.getElementsByName("pass")[0].addEventListener("input", (event) =>{ let value = checkPasswd(event.target.value); });
    document.getElementsByName("pass2")[0].addEventListener("input", (event) => { let value = checkPasswd(event.target.value); });

    document.getElementById("submit").addEventListener("click", (event) =>{
        let p = document.getElementsByName("pass")[0].value;
        let p2 = document.getElementsByName("pass2")[0].value;

        if(p !== p2){
            console.log("Passwords are not the same");
            return;
        }

        let inputs = document.getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].value === ""){
                console.log("Please fill all the fields");
                return;
            }
        }

        if(document.getElementsByName("email")[0].value.indexOf("@") === -1){
            console.log("Please insert a valid email");
            return;
        }

        document.getElementById("formSignUp").submit(); //Form submit
    });

    function checkPasswd(value){

        return 0;
    }
</script>