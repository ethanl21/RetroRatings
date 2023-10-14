<?php
session_start();
include("db_connect.php");

$user_data = check_login($con); //check login

 if($user_data){ // if user is logged in do something
      echo "hello " . $user_data['username'] . "<br>";
      ?>
      <a href='logout.php'>Logout</a>
      <?php

 }
 else{ // user did not login redirect
    header('Location: login.php');
 }
 ?>