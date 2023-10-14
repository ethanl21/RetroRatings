<?php

session_start();

include("db_connect.php");

if($_SERVER['REQUEST_METHOD'] == "POST")
{
  //get info from form
$username = $_POST['username'];
$password = $_POST['pwd'];

//query to find username in db
$query = "select * from users where username = '$username' limit 1";
$result = mysqli_query($con, $query);
if($result && mysqli_num_rows($result) > 0){ //check if user name is in db 
$user_data = mysqli_fetch_assoc($result);    //user_data now has information from db
}

if($user_data['password'] == $password){   // check if password matches 
  //set user information
    $_SESSION['id'] = $user_data['id'];   
   $_SESSION['email'] = $user_data['email'];
   header("Location: index.php"); // redirect 
   die;
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
        <h2>(Logo here)</h2>
        <form method="post">
            <div class="form-group">
                <input type="username" class="form-control-sm" id="username" required autofocus placeholder="Username" name ="username">
              </div>
          <div class="form-group">
            <input type="password" class="form-control-sm" id="pwd" required placeholder="Password" name ="pwd">
          </div>
     
          <button class="btn btn-success    ">Submit</button>
        </form>
      </div>
    </div>

   


</body>
</html>