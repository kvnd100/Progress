<?php

class SignupContr extends SignupClass{

        private $uName;
        private $pwd;
        private $pwdRepeat;
        private $email;
    


    public function __construct($uName,$pwd,$pwdRepeat,$email){
    $this->uName = $uName;
    $this->pwd = $pwd;
    $this->pwdRepeat = $pwdRepeat;
    $this->email = $email;
    }
    

    public function signupUser(){
        if($this->checkExistence == false){
            header("location: ../index.php?error=alreadyexistuser");
            exit();
        }
        if($this->pwdMatch() == false){
            header("location: ../index.php?error=passwordnotmatch");
            exit();
        }
        if($this->emptyInput() == false){
            header("location: ../index.php?error=emptyinput");
            exit();
        }

        $this->setUser($this->uName,$this->pwd,$this->email);

    }


    private function checkExistence(){
        $result;

        if(!$this->checkUser($this->uName,$this->$email)){
            $result = false;
        }
        else{
            $result = true;
        }

        return $result;
    }

    private function pwdMatch(){
        $result;
        if($this->pwd !== $this->pwdRepeat){
            $result = false;
        }
        else{
            $result = true;
        }

        return $result;
    }

     private function emptyInput(){
        $result;

        if(empty($this->uName) || empty($this->pwd) || empty($this->pwdRepeat) || empty($this->email)){
            $result = false;
        }
        else{
            $result = true;
        }

        return $result;
    }

}

