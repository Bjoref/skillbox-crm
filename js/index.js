const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const testClient = {
  // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
  id: "1234567890",
  // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
  createdAt: "2021-02-03T13:07:29.554Z",
  // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
  updatedAt: "2021-02-03T13:07:29.554Z",
  // * обязательное поле, имя клиента
  name: "Василий",
  // * обязательное поле, фамилия клиента
  surname: "Пупкин",
  // необязательное поле, отчество клиента
  lastName: "Васильевич",
  // контакты - необязательное поле, массив контактов
  // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
  contacts: [
    {
      type: "Телефон",
      value: "+71234567890",
    },
    {
      type: "Email",
      value: "abc@xyz.com",
    },
    {
      type: "Facebook",
      value: "https://facebook.com/vasiliy-pupkin-the-best",
    },
  ],
};

// postData('http://localhost:3000/api/clients', testClient)
//   .then((data) => {
//     console.log(data);
//   });

let users;

const table = document.querySelector("#table"); //Выбираем таблицу

const tr = document.createElement("tr");
tr.classList.add("section-table__table-tr", "section-table__table-tr_content");

const td = document.createElement("td");
td.classList.add("section-table__table-td");

const pId = document.createElement("p");
pId.classList.add("section-table__table-td_id", "section-table__text");

const pName = document.createElement("p");
pName.classList.add("ection-table__text_black");

clearTable = () => {
  //Чистим таблицу
  // document.querySelectorAll('.section-table__table-tr_content').forEach((child) => {
  //   if(child.classList.contains('section-table__table-tr_content')) {
  //     child.remove()
  //   }
  // })
};

fillTable = (user) => {
  //Изначальное заполнение таблицы при загрузке
  console.log(user);
  const trClone = tr.cloneNode(true);

  //ID
  const tdIdClone = td.cloneNode(true);
  const pIdClone = pId.cloneNode(true);
  pIdClone.innerHTML = user.id;

  //FIO
  const tdNameClone = td.cloneNode(true);
  const pNameClone = pName.cloneNode(true);
  pNameClone.classList.add("section-table__text_black");
  pNameClone.innerHTML = user.surname + " " + user.name + " " + user.lastName;

  //Created
  const tdCreatedClone = td.cloneNode(true);
  const pDateCreatedClone = pName.cloneNode(true);
  pDateCreatedClone.classList.add("section-table__text_black");
  pDateCreatedClone.innerHTML = new Date(user.createdAt).toLocaleDateString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );
  const pTimeCreatedClone = pName.cloneNode(true);
  pTimeCreatedClone.classList.add(
    "section-table__table-td_id",
    "section-table__text"
  );
  pTimeCreatedClone.innerHTML = new Date(user.createdAt).toLocaleTimeString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );

  //Updated
  const tdUpdatedClone = td.cloneNode(true);
  const pDateUpdatedClone = pName.cloneNode(true);
  pDateUpdatedClone.classList.add("section-table__text_black");
  pDateUpdatedClone.innerHTML = new Date(user.updatedAt).toLocaleDateString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );

  const pTimeUpdatedClone = pName.cloneNode(true);
  pTimeUpdatedClone.classList.add(
    "section-table__table-td_id",
    "section-table__text"
  );
  pTimeUpdatedClone.innerHTML = new Date(user.createdAt).toLocaleTimeString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );

  //Заполнение ячейки

  //Заполнение ID
  tdIdClone.append(pIdClone);
  //Заполнение FIO
  tdNameClone.append(pNameClone);
  //Заполнение Created
  tdCreatedClone.append(pDateCreatedClone);
  tdCreatedClone.append(pTimeCreatedClone);
  //Заполнение Updated
  tdUpdatedClone.append(pDateUpdatedClone);
  tdUpdatedClone.append(pTimeUpdatedClone);

  //Заполнение ряда
  trClone.append(tdIdClone);
  trClone.append(tdNameClone);
  trClone.append(tdCreatedClone);
  trClone.append(tdUpdatedClone);

  //Заполнение таблицы
  table.append(trClone);
};

fetch("http://localhost:3000/api/clients")
  .then((response) => response.json())
  .then((data) => {
    clearTable();
    data.forEach((user) => {
      fillTable(user);
    });
  });
