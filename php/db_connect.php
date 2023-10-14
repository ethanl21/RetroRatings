<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "CPSC349";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
    die("failed to connect");
}

function check_login($con) // keeps user login valid until log out
{
   if(isset ($_SESSION['id']))
   {
    $id = $_SESSION['id'];
    $query = "Select * from users where id = '$id' limit 1";
    $result = mysqli_query($con,$query);
    if($result and mysqli_num_rows($result) > 0)
    {
        $user_data = mysqli_fetch_assoc($result);
        return $user_data;
    }
   }
   else{
    return false;
   }
   header("Location: login.php");
   die;
}
?>

