<?php
session_start();

if(isset ($_SESSION['user_id'])) //if user i
{
    unset($_SESSION['user_id']);
}

header("location: login.php");
?>