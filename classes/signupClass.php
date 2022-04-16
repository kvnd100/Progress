<?php

class SignupClass extends DbClass{

        protected function checkUser($uName,$email){
            $stmt = $this->connect()->prepare('SELECT users_uName From users WHERE users_uName = ? OR users_email = ?;');

            if(!$stmt->execute(array($uName,$email))){
                $stmt = null;
                header("location:../index.php?error=stmtfailed");
                exit();
            }


            $resultCheck;
            if(stmt->rowCount() > 0){
                $resultCheck = false;
            }
            else{
                $resultCheck = true;
            }

            return $resultCheck;
        }

        protected function setUser($uName,$pwd,$email){
            $stmt = $this->connect()->prepare('INSERT INTO users (users_uName,users_pwd,users_email) VALUES (?,?,?);');


            $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

            if(!$stmt->execute(array($uName,$hashedPwd,$email))){
                $stmt = null;
                header("location:../index.php?error=stmtfailed");
                exit();
            }
            $stmt = null;

            
        }

} 