<?php
    session_start();

    if(isset($_POST["name"])){

    }
?>

<!DOCTYPE html>
<html>
    <form action="" method="post">
        <div>
            <input name="name" placeholder="Name" type="text" required>
            <input name="surname" placeholder="Surname" type="text" required>
        </div>

        <div>
            <input name="email" placeholder="Email" type="email" required>

            <input name="pass" placeholder="Password" type="password" required>
            <input name="pass2" placeholder="Repeat Password" type="password" required>
        </div>

        <a id="submit">Sign Up</a>
    </form>
</html>

<script>
    document.getElementsByName("pass")[0].addEventListener("input", (event) =>{
        let value = checkPasswd(event.target.value);
    });
    document.getElementsByName("pass2")[0].addEventListener("input", (event) =>{
        let value = checkPasswd(event.target.value);
    });

    document.getElementById("submit").addEventListener("click", (event) =>{

    });

    function checkPasswd(value){

        return 0;
    }
</script>