<?php
//добавляем файл подключения к базе данных
include './db_config.php';

//проверяем, успешно ли загружен файл, если да, то выполняем функцию обработки
if (isset($_FILES['users_file']) && $_FILES['users_file']['error'] === UPLOAD_ERR_OK) {
    $users_file = $_FILES['users_file']['tmp_name'];
    processCSVFile($users_file, 'users');
}
//функция обработки csv файла
function processCSVFile($file, $table) {
    global $conn;

    //открываем файл в режиме для чтения
    if (($handle = fopen($file, "r")) !== FALSE) {

        //считываем данные из файла
        //указываем на то, что разделитель в нашем файле это точка с запятой
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) { 
            //пропускаем первую строку, если она содержит заголовки
            if ($data[0] == 'XML_ID' && $data[1] == 'LAST_NAME' && $data[2] == 'NAME' && $data[3] == 'SECOND_NAME' && $data[4] == 'DEPARTMENT' && $data[5] == 'WORK_POSITION' && $data[6] == 'EMAIL' && $data[7] == 'MOBILE_PHONE' && $data[8] == 'PHONE' && $data[9] == 'LOGIN' && $data[10] == 'PASSWORD') {
                continue;
            }
            //подготовка запроса на вставку данных в таблицу
            $insert_query = "INSERT INTO $table (XML_ID, LAST_NAME, NAME, SECOND_NAME, DEPARTMENT, WORK_POSITION, EMAIL, MOBILE_PHONE, PHONE, LOGIN, PASSWORD) VALUES (";

            //генерация строки запроса на вставку данных
            foreach ($data as $value) {
                $insert_query .= "'" . $conn->real_escape_string(trim($value)) . "',";
            }
            //закрываем скобки и удаляем запятую в конце
            $insert_query = rtrim($insert_query, ',') . ')';

            //выполнение запроса на вставку данных
            if ($conn->query($insert_query) !== TRUE) {
                echo "Ошибка при загрузке данных в таблицу $table: " . $conn->error;
                fclose($handle);
                return;
            }
        }

        fclose($handle);
    } else {
        echo "Ошибка: Не удалось открыть файл.";
    }
}