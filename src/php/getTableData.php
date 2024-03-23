<?php
include "./db_config.php";

//запрос на получение данных из таблицы users
$sqlUsers = "SELECT * FROM users";
//выполнение запроса и сохранение результата в переменную
$resultUsers = $conn->query($sqlUsers);

//запрос на получение данных из таблицы department
$sqlDepartments = "SELECT * FROM department";
$resultDepartments = $conn->query($sqlDepartments);

//создание массива на основе полученных данных
$data = array(
    "users" => [],
    "departments" => []
);

//если есть результат выполнения запроса,
//то добавляем каждую его строку в массив $data 
if ($resultUsers->num_rows > 0) {
    while ($row = $resultUsers->fetch_assoc()) {
        $data["users"][] = $row;
    }
}

if ($resultDepartments->num_rows > 0) {
    while ($row = $resultDepartments->fetch_assoc()) {
        $data["departments"][] = $row;
    }
}
//преобразование массива в json и вывод json
echo json_encode($data);

$conn->close();