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

const table = document.querySelector('#table');  //Выбираем таблицу

const tr = document.createElement('tr');
tr.classList.add('section-table__table-tr', 'section-table__table-tr_content');

const td = document.createElement('td');
td.classList.add('section-table__table-td');

const pId = document.createElement('p');
pId.classList.add('section-table__table-td_id', 'section-table__text');


const pName = document.createElement('p');
pName.classList.add('ection-table__text_black');

clearTable = () => {  //Чистим таблицу
    document.querySelectorAll('.section-table__table-tr_content').forEach((child) => {
      if(child.classList.contains('section-table__table-tr_content')) {
        child.remove()
      }
    })
}

fillTable = (user) => {  //Изначальное заполнение таблицы при загрузке
  const trClone = tr.cloneNode(true);  

  const tdIdClone = td.cloneNode(true)
  const pIdClone = pId.cloneNode(true)
  pIdClone.innerHTML = user.id

  const tdNameClone = td.cloneNode(true)
  const pNameClone =  pName.cloneNode(true)
  pNameClone.innerHTML = user.name

  tdIdClone.append(pIdClone);
  tdNameClone.append(pNameClone);
  trClone.append(tdIdClone);
  trClone.append(tdNameClone);

  table.append(trClone)

}

fetch("http://localhost:3000/api/clients")
  .then((response) => response.json())
  .then((data) => {
    clearTable()
    data.forEach((user) => {
      fillTable(user)
    })
  }); 


