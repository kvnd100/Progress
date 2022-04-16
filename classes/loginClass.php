<?php

class LoginClass extends DbClass{

        
        protected function getUser($uName,$pwd){
            $stmt = $this->connect()->prepare('SELECT users_pwd FROM users WHERE users_email = ?;');

            if(!$stmt->execute(array($uName))){
                $stmt = null;
                header("location: ../index.php?error=stmtfailed");
                exit();
            }

            if($stmt->rowCount() == 0){
                $stmt = null;
                header("location: ../index.php?error=usernotfound");
                exit();

            }

            $pwdHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
             
            $checkPwd = password_verify($pwd,$pwdHashed[0]["users_pwd"]);

            if($checkPwd == false){
                $stmt = null;
                header("location: ../index.php?error=wrongpassword");
                exit();
            }
            elseif($checkPwd == true){


                $stmt = $this->connect()->prepare("SELECT * FROM users WHERE users_email = ?;");

                
                
                
                if(!$stmt->execute(array($uName))){
                    $stmt = null;
                    header("location: ../index.php?error=stmtfailed");
                    exit();
                }
                
                if($stmt->rowCount() == 0){

                $stmt = null;
                header("location: ../index.php?error=usernotfound");
                exit();

                }
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC); 
                
                session_start();
                 $_SESSION["userName"] = $user[0]["users_uName"];
                
            }
            $stmt = null;

            
        }

} 