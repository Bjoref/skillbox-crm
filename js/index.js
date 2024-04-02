import { fillTable } from "./modules/fillTable.js";
import { clearTable } from "./modules/clearTable.js";
import { tooltipsInit } from "./modules/tooltips.js";
import { modalEvents } from "./modules/modal.js";
import { filterBy, idFilterButton, fioFilterButton, createdAtFilterButton, updatedAtFilterButton } from "./modules/filterId.js";

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

let clientsData;

const fillingTable = (data, filterBy, type) => {
  clearTable();
  filterBy(data, type).forEach((user) => {
    fillTable(user);
  });
};
clearTable();

fetch("http://localhost:3000/api/clients")
  .then((response) => response.json())
  .then((data) => {
    clientsData = data;
    fillingTable(data, filterBy, 'id');
  });

idFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, 'id');
});

fioFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, 'fio');
});

createdAtFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, 'createdAt');
});

updatedAtFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, 'updatedAt');
});


tooltipsInit();
modalEvents();
