import { fillTable } from "./modules/fillTable.js";
import { clearTable } from "./modules/clearTable.js";
import { tooltipsInit } from "./modules/tooltips.js";
import { modalEvents } from "./modules/modal.js";
import { searchEvent, searchInput } from "./modules/searchInput.js";
import {
  filterBy,
  idFilterButton,
  fioFilterButton,
  createdAtFilterButton,
  updatedAtFilterButton,
} from "./modules/filterId.js";

let clientsData;

const fillingTable = (data, filterBy, type) => {
  clearTable();
  filterBy(data, type).forEach((user) => {
    fillTable(user);
  });
};
clearTable();

const getUsers = (search = false) => {
  fetch("http://localhost:3000/api/clients")
    .then((response) => response.json())
    .then((data) => {
      clientsData = data;
      if(search) {
        clientsData = searchEvent(clientsData);
        fillingTable(clientsData, filterBy, "id");
      } else {
        fillingTable(data, filterBy, "id");
      }
    });
};

getUsers();

idFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, "id");
});

fioFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, "fio");
});

createdAtFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, "createdAt");
});

updatedAtFilterButton.addEventListener("click", () => {
  fillingTable(clientsData, filterBy, "updatedAt");
});

const debounce = (callback, wait = 300) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const handleInputEvent = debounce((inputEvent) => {
  getUsers(true);
}, 300);

searchInput.addEventListener("input", handleInputEvent);

tooltipsInit();
modalEvents();
