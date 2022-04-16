<?php

if(isset($_POST["submit"])){
    
    $email = $_POST["logEmail"];
    $pwd = $_POST["logPwd"];
    
    
    include "../classes/dbClass.php";
    include '../classes/loginClass.php';
    include '../classes/loginContr.php';

    $login = new LoginContr($email,$pwd);

    $login->loginUser();

    header("location: ../pages/game.html");
}