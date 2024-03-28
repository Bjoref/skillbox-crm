import { fillTable } from "./modules/fillTable.js";
import { clearTable } from "./modules/clearTable.js";
import { tooltipsInit } from "./modules/tooltips.js";
import { modalEvents } from "./modules/modal.js";

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

clearTable();

fetch("http://localhost:3000/api/clients")
  .then((response) => response.json())
  .then((data) => {
    clearTable();
    data.forEach((user) => {
      fillTable(user);
    });
  });

tooltipsInit();
modalEvents();
