<?php

class LoginContr extends LoginClass{

        private $uName;
        private $pwd;
        
    public function __construct($uName,$pwd){
    $this->uName = $uName;
    $this->pwd = $pwd;
    }
    

    public function loginUser(){
        if($this->emptyInput()==false){
            header("location:../index.php?error=emptyinput");
            exit();
        }
        $this->getUser($this->uName,$this->pwd);
    }


    private function emptyInput(){
        $result;

        if(empty($this->uName) || empty($this->pwd)){
            $result = false;
        }
        else{
            $result = true;
        }

        return $result;
    }
 
}

