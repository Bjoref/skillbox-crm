import { showModal } from "./modal.js";

const table = document.querySelector("#table"); //Выбираем таблицу

const tr = document.createElement("tr");
tr.classList.add("section-table__table-tr", "section-table__table-tr_content");

const td = document.createElement("td");
td.classList.add("section-table__table-td");

const p = document.createElement("p");

const ul = document.createElement("ul");
ul.classList.add("section-table__contact-list");

const li = document.createElement("li");
li.classList.add("section-table__contact-item");

const button = document.createElement("button");

const divButton = document.createElement("div");

export const fillTable = (user) => {
  //Изначальное заполнение таблицы при загрузке
  const trClone = tr.cloneNode(true);

  //ID
  const tdIdClone = td.cloneNode(true);
  const pIdClone = p.cloneNode(true);
  pIdClone.classList.add("section-table__table-td_id", "section-table__text");
  pIdClone.innerHTML = user.id;

  //FIO
  const tdNameClone = td.cloneNode(true);
  const pNameClone = p.cloneNode(true);
  pNameClone.classList.add("section-table__text_black");
  pNameClone.innerHTML = user.surname + " " + user.name + " " + user.lastName;

  //Created
  const tdCreatedClone = td.cloneNode(true);
  const pDateCreatedClone = p.cloneNode(true);
  pDateCreatedClone.classList.add("section-table__text_black");
  pDateCreatedClone.innerHTML = new Date(user.createdAt).toLocaleDateString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );
  const pTimeCreatedClone = p.cloneNode(true);
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
  const pDateUpdatedClone = p.cloneNode(true);
  pDateUpdatedClone.classList.add("section-table__text_black");
  pDateUpdatedClone.innerHTML = new Date(user.updatedAt).toLocaleDateString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );

  const pTimeUpdatedClone = p.cloneNode(true);
  pTimeUpdatedClone.classList.add(
    "section-table__table-td_id",
    "section-table__text"
  );
  pTimeUpdatedClone.innerHTML = new Date(user.updatedAt).toLocaleTimeString(
    "ru-RU",
    { timeZone: "Europe/Moscow" }
  );

  //Contacts
  const tdContactsClone = td.cloneNode(true);
  const ulContactsClone = ul.cloneNode(true);

  user.contacts.forEach((contact) => {
    const liContactsClone = li.cloneNode(true);
    const buttonContactsClone = button.cloneNode(true);
    buttonContactsClone.classList.add("section-table__contact-button");

    if (contact.type === "Телефон") {
      buttonContactsClone.classList.add("section-table__contact-button_phone");
      buttonContactsClone.setAttribute('data-tooltip', `Телефон: ${contact.value}`);
    } else if (contact.type === "Email") {
      buttonContactsClone.classList.add("section-table__contact-button_mail");
      buttonContactsClone.setAttribute('data-tooltip', `Почта: ${contact.value}`);
    } else if (contact.type === "Facebook") {
      buttonContactsClone.classList.add("section-table__contact-button_fb");
      buttonContactsClone.setAttribute('data-tooltip', `Facebook: ${contact.value}`);
    } else if (contact.type === "Vkontakte") {
      buttonContactsClone.classList.add("section-table__contact-button_vk");
      buttonContactsClone.setAttribute('data-tooltip', `Вконтакте: ${contact.value}`);
    } else {
      buttonContactsClone.setAttribute('data-tooltip', `Контакт: ${contact.value}`);
      buttonContactsClone.classList.add("section-table__contact-button_default");
    }

    liContactsClone.append(buttonContactsClone);
    ulContactsClone.append(liContactsClone);
  });

  //Actions
  const tdActionsClone = td.cloneNode(true);
  const divActionsClone = divButton.cloneNode(true);
  const editButton = button.cloneNode(true);
  editButton.classList.add("section-table__table-button");
  editButton.textContent = "Изменить";
  editButton.classList.add("section-table__table-edit");
  editButton.setAttribute('data-id', user.id)
  editButton.addEventListener('click', showModal)
  divActionsClone.append(editButton);
  const deleteButton = button.cloneNode(true);
  deleteButton.textContent = "Удалить";
  deleteButton.classList.add("section-table__table-button");
  deleteButton.classList.add("section-table__table-delete");

  tdActionsClone.append(divActionsClone);
  tdActionsClone.append(deleteButton);

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

  //Заполнение Contacts
  tdContactsClone.append(ulContactsClone);

  //Заполнение Actions
  tdActionsClone.append(divActionsClone);
  tdActionsClone.append(deleteButton);

  //Заполнение ряда
  trClone.append(tdIdClone);
  trClone.append(tdNameClone);
  trClone.append(tdCreatedClone);
  trClone.append(tdUpdatedClone);
  trClone.append(tdContactsClone);
  trClone.append(tdActionsClone);

  //Заполнение таблицы
  table.append(trClone);
};
