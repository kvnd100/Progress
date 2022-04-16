<?php

 session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/login.css" rel="stylesheet" type="text/css">
    <script src='script/login.js' defer>
    </script>
    <title>Document</title>
</head>
<body>
    <header class="header">
        <h1>
            Game over
        </h1>
    </header>
    <main class="main">
        <div class="main__form row">
            <form action="includes/login.php" method="post">
                <div class="form__login">
                    
                    <h2 class="heading-login">Login to start playing!</h2>
                    <div class="form__main">
                    <div class="form__group">
                        <input type="email" id="email" name="logEmail"  class="form__input" placeholder="Email address" required>
                        <label for="email" class="form__label">Email address</label>
                    </div>
                    <div class="form__group"></div>
                    <div class="form__group">
                        <input type="text" id="password" name="logPwd" class="form__input" placeholder="Password" required>
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__group">
                        <button type="submit" name ="submit" class="btn">Login!</button>
                    </div>
                    <div class="form__group">
                        <button class="btn m-btm-medium" id="register">Sign up!</button>
                    </div>
                </div>
                </div>
            </form>
            
        </div>

        <form id="test" class="modal hidden" action="includes/signup.php" method="post">
                <h2 class="heading-register">Register!</h2>
                    <div class="form__main">
                    <div class="form__group">
                        <input type="text" id="uName" name="uName" class="form__input" placeholder="Username" required>
                        <label for="uName" class="form__label">Username</label>
                    </div>    
                    <div class="form__group">
                        <input type="email" id="email" name="email"  class="form__input" placeholder="Email address" required>
                        <label for="email" class="form__label">Email address</label>
                    </div>
                    <div class="form__group"></div>
                    <div class="form__group">
                        <input type="text" id="password" name="pwd" class="form__input" placeholder="Password" required>
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__group">
                        <input type="text" id="password" name="pwdRepeat" class="form__input" placeholder="Password" required>
                        <label for="password" class="form__label">Password</label>
                    </div>
                    <div class="form__group">
                        <button type="submit" class="btn m-left-medium" name="submit">Register!</button>
                    </div>
                    <div class="form__group">
                        <button class="btn m-left-medium" id="back">&#8592; Back</button>
                    </div>
            
            </form>
    </main>
    <footer class="footer">
        <p>Copyright &copy; by Kavindu Ranasinghe </p>
        
    </footer>
    <div class="overlay hidden"></div>
</body>
</html>