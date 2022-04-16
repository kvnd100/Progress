<?php

if(isset($_POST["submit"])){
    
    $uName = $_POST["uName"];
    $email = $_POST["email"];
    $pwd = $_POST["pwd"];
    $pwdRepeat = $_POST["pwdRepeat"];
    
    include "../classes/dbClass.php";
    include '../classes/signupClass.php';
    include '../classes/signupContr.php';

    $signup = new SignupContr($uName,$pwd,$pwdRepeat,$email);

    $signup->signupUser();

    header("location: ../index.php?error=none");
}