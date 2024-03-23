//функция для загрузки файлов
function uploadFileAndList(e, formId) {
  //предотвращаем стандартное поведение при отправке формы
  e.preventDefault();
  //получаем элементы с помощью соответствующих селекторов
  let form = document.getElementById(formId);
  let fileInput = form.querySelector('input[type="file"]');
  let formName = form.getAttribute('name');
  //создаем новый объект FormData, который будет содержать данные формы
  let formData = new FormData(form);
  //проверяем загружен ли файл в форму, прекращаем выполнение, если файл не загружен
  if (fileInput.files.length === 0) {
    alert('Пожалуйста, выберите файл.');
    return;
  }
  //отправляем AJAX запрос с помощью fetch
  fetch(form.action, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (response.ok) {
          console.log("Файл успешно загружен.");
          let fileName = fileInput.files[0].name;
          //получаем элемент для отображения списка загруженных файлов
          let fileListElement = document.getElementById('file_list');
          //создаем элемент списка
          let listItem = document.createElement('li');
          listItem.textContent = 'Загружен файл для ' + formName + ': ' + fileName;
          //добавляем элемент списка
          fileListElement.appendChild(listItem);
      } else {
          console.error("Произошла ошибка при загрузке файла.");
      }
  })
  .catch(error => {
      console.error("Произошла ошибка:", error);
  });
}

//функция для обновления таблиц users и department
//получаем json из файла getTableData.php с помощью AJAX запроса
function refreshUsersAndDepartments() {
    fetch('src/php/getTableData.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка соединения');
        }
        return response.json();
    })
    .then(data => {
        //получаем с помощью селекторов нужные элементы таблиц
        const usersTable = document.getElementById('usersTable');
        const departmentsTable = document.getElementById('departmentsTable');
        
        //очищаем таблицы перед обновлением
        usersTable.innerHTML = '';
        departmentsTable.innerHTML = '';

        //создаем заголовки таблиц
        const usersTableHeader = 
        `<tr>
            <th>XML_ID</th>
            <th>Last Name</th>
            <th>Name</th>
            <th>Second Name</th>
            <th>Department</th>
            <th>Work Position</th>
            <th>Email</th>
            <th>Mobile Phone</th>
            <th>Phone</th>
            <th>Login</th>
            <th>Password</th>
        </tr>`;

        const departmentsTableHeader = 
        `<tr>
            <th>XML_ID</th>
            <th>Parent XML_ID</th>
            <th>Department Name</th>
        </tr>`;
        usersTable.insertAdjacentHTML('beforeend', usersTableHeader);
        departmentsTable.insertAdjacentHTML('beforeend', departmentsTableHeader);

        //заполняем строки таблицы users полученными данными
        data.users.forEach(user => {
            const row = 
            `<tr>
                <td>${user.XML_ID}</td>
                <td>${user.LAST_NAME}</td>
                <td>${user.NAME}</td>
                <td>${user.SECOND_NAME}</td>
                <td>${user.DEPARTMENT}</td>
                <td>${user.WORK_POSITION}</td>
                <td>${user.EMAIL}</td>
                <td>${user.MOBILE_PHONE}</td>
                <td>${user.PHONE}</td>
                <td>${user.LOGIN}</td>
                <td>${user.PASSWORD}</td>
            </tr>`;
            usersTable.insertAdjacentHTML('beforeend', row);
        });
        //заполняем строки таблицы department полученными данными
        data.departments.forEach(department => {
            const row = 
            `<tr>
                <td>${department.XML_ID}</td>
                <td>${department.PARENT_XML_ID}</td>
                <td>${department.NAME_DEPARTMENT}</td>
            </tr>`;
            departmentsTable.insertAdjacentHTML('beforeend', row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

//обновляем данные о users и department когда загружается страница
document.addEventListener('DOMContentLoaded', refreshUsersAndDepartments);

//добавление обработчика событий для кнопки обновления данных в таблицах
document.getElementById('updateButton').addEventListener('click', refreshUsersAndDepartments);


















// function refreshUsers() {
//     fetch('src/php/getTableData.php')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Предполагая, что ваш PHP-скрипт возвращает JSON
//     })
//     .then(data => {
//         const usersTable = document.getElementById('usersTable');
//         usersTable.innerHTML = ''; // Очищаем таблицу перед обновлением

//         // Создаем заголовок таблицы
//         const tableHeader = "<tr><th>XML_ID</th><th>Last Name</th><th>Name</th><th>Second Name</th><th>Department</th><th>Work Position</th><th>Email</th><th>Mobile Phone</th><th>Phone</th><th>Login</th><th>Password</th></tr>";
//         usersTable.insertAdjacentHTML('beforeend', tableHeader);

//         // Добавляем строки таблицы для каждого пользователя
//         data.forEach(user => {
//             const row = `<tr><td>${user.XML_ID}</td><td>${user.LAST_NAME}</td><td>${user.NAME}</td><td>${user.SECOND_NAME}</td><td>${user.DEPARTMENT}</td><td>${user.WORK_POSITION}</td><td>${user.EMAIL}</td><td>${user.MOBILE_PHONE}</td><td>${user.PHONE}</td><td>${user.LOGIN}</td><td>${user.PASSWORD}</td></tr>`;
//             usersTable.insertAdjacentHTML('beforeend', row);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching users:', error);
//     });
// }

// function refreshDepartments() {
//     fetch('src/php/getTableData.php')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Предполагая, что ваш PHP-скрипт возвращает JSON
//     })
//     .then(data => {
//         const departmentsTable = document.getElementById('departmentsTable');
//         departmentsTable.innerHTML = ''; // Очищаем таблицу перед обновлением

//         // Создаем заголовок таблицы
//         const tableHeader = "<tr><th>XML_ID</th><th>Parent XML_ID</th><th>Department Name</th></tr>";
//         departmentsTable.insertAdjacentHTML('beforeend', tableHeader);

//         // Добавляем строки таблицы для каждого отдела
//         data.forEach(department => {
//             const row = `<tr><td>${department.XML_ID}</td><td>${department.PARENT_XML_ID}</td><td>${department.NAME_DEPARTMENT}</td></tr>`;
//             departmentsTable.insertAdjacentHTML('beforeend', row);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching departments:', error);
//     });
// }


// document.getElementById('refreshUsersButton').addEventListener('click', refreshUsers);
// document.getElementById('refreshDepartmentsButton').addEventListener('click', refreshDepartments);

// // Refresh users and departments when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     refreshUsers();
//     refreshDepartments();
// });