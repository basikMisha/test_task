<?php

$server = "localhost:3307";
$user = "root";
$password = "misha1946";
$database = "test_task";

$conn = new mysqli($server, $user, $password, $database);
if ($conn->connect_error) {
    die("Соединение не доступно". $conn->connect_error);
}