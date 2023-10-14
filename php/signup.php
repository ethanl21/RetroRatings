
<?php
session_start();

include("db_connect.php");
if ($_SERVER['REQUEST_METHOD'] == "POST"){
  $validInfo = true;

  // avoid sql injection
  $email = mysqli_real_escape_string($con,$_POST["email"]);
  $username = mysqli_real_escape_string($con,$_POST["username"]);
  $password = mysqli_real_escape_string($con,$_POST["pwd"]);


  $query = "SELECT * FROM users WHERE username = '$username'"; // check if user name is unique
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) > 0) // if it returns a value greater than 0 means name exsist in database
  {
      echo '<script>window.confirm("Username taken, please try again")</script>';
      $validInfo = false;
  }
  $query = "SELECT * FROM users WHERE email = '$email'"; // check if email is unique
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) > 0) // if it returns a value greater than 0 means name exsist in database
  {
      echo '<script>window.confirm("Email taken, please try again")</script>';
      $validInfo = false;
  }
  if($validInfo){
    $sql = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$password')";
    if(mysqli_query($con, $sql)){
      header("Location: login.php");
    }
    else{
      header("Location: signup.php");
    }
  }
   
}

?>     
 <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="signupstyle.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
</head>
<body class ="d-flex align-items-center py-4 bg-body-tertiary">
    <div class="container ">
    <div class="mx-auto text-center">
        <h2>Sign up for ____ Today!</h2>
        <form method="post">
            <div class="form-group">
                <input type="email" class="form-control-sm" id="email" required autofocus placeholder="Email" name ="email">
              </div>
          <div class="form-group">
            <input type="username" class="form-control-sm" id="username" required  placeholder="Username" name = "username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control-sm" id="pwd" required placeholder="Password" name ="pwd">
          </div>
     
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

   


</body>
</html>

