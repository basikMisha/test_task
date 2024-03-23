<?php
//добавляем файл подключения к базе данных
include './db_config.php';

//проверяем, успешно ли загружен файл, если да, то выполняем функцию обработки
if (isset($_FILES['department_file']) && $_FILES['department_file']['error'] === UPLOAD_ERR_OK) {
    $department_file = $_FILES['department_file']['tmp_name'];
    processCSVFile($department_file, 'department');
}

//функция обработки csv файла
function processCSVFile($file, $table) {
    global $conn;

    //открываем файл в режиме для чтения
    if (($handle = fopen($file, "r")) !== FALSE) {
        //считываем данные из файла
        //указываем на то, что разделитель в нашем файле это точка с запятой
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            //пропускаем первую строку, если она содержит заголовки)
            if ($data[0] == 'XML_ID' && $data[1] == 'PARENT_XML_ID' && $data[2] == 'NAME_DEPARTMENT') {
                continue;
            }

            //подготовка запроса на вставку данных в таблицу
            $insert_query = "INSERT INTO $table (XML_ID, PARENT_XML_ID, NAME_DEPARTMENT) VALUES (";

            //генерация строки запроса на вставку данных
            foreach ($data as $key => $value) {
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