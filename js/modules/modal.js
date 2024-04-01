import { showDeleteModal } from "./deleteUser.js";

export const modalEvents = () => {
  showButton.addEventListener("click", showModal);
  background.addEventListener("click", hideModal);
};

export { background, modalDelete };

export const showModal = (e) => {
  document.querySelector("body").classList.add("hide-overflow-x");
  background.classList.add("d-block");
  modal.classList.add("d-block");
  const submitButton = document.querySelector(".modal__submit-button");

  if (e.target.getAttribute("id") == "addClient") {
    modalTitle.innerText = "Добавить клиента";
    submitButton.textContent = "Добавить";
    editForm.addEventListener("submit", updateOrAddUser);
    submitButton.setAttribute("data-submit", "add");
    createModalContent();
  } else if (e.target.classList.contains("section-table__table-edit")) {
    modalTitle.innerText = "Изменить данные";
    userId = e.target.getAttribute("data-id");
    getUserData(`http://localhost:3000/api/clients/${userId}`).then(
      (editUser) => {
        editForm.setAttribute("data-id", userId);
        document.querySelector(".modal__id").textContent = `ID: ${editUser.id}`;
        submitButton.textContent = "Сохранить";
        submitButton.setAttribute("data-submit", "edit");
        editForm.addEventListener("submit", updateOrAddUser);
        deleteButton.addEventListener("click", () => {
          showDeleteModal(editUser.id, modal, modalDelete);
        });
        cancelDeleteButton.addEventListener("click", hideModal);
        createModalContent();

        editUser.contacts.forEach((contact) => {
          addNewSelectInput(contact);
        });

        document
          .getElementById("surname")
          .setAttribute("value", editUser.surname);
        document.getElementById("name").setAttribute("value", editUser.name);
        document
          .getElementById("patronymic")
          .setAttribute("value", editUser.lastName);
      }
    );
  }
};

const showButton = document.getElementById("addClient");
const background = document.getElementById("background");
const modal = document.getElementById("modal");
const modalDelete = document.getElementById("modalDelete");
const editForm = document.querySelector(".modal__form");
const modalTitle = document.querySelector(".modal__title");
const deleteButton = document.querySelector(".modal__delete-button");
const cancelDeleteButton = document.querySelector(
  ".modal-delete__button-cancel"
);
const addSelectInputButton = document.querySelector(
  ".modal__add-contact-button"
);
const addNewOptions = [
  {
    value: "Телефон",
    class: "modal__option",
  },
  {
    value: "Доп. Телефон",
    class: "modal__option modal__option_hide",
  },
  {
    value: "Email",
    class: "modal__option",
  },
  {
    value: "Vk",
    class: "modal__option",
  },
  {
    value: "Facebook",
    class: "modal__option",
  },
];
let userId;
const hideModal = (e) => {
  if (e.target.classList.contains("background")) {
    if (modalDelete.classList.contains("d-block")) {
      if (modalDelete.getAttribute("data-create-in-list") === "true") {
        removeApproveDeleteModal();
      } else {
        checkoutToModal();
      }
    } else {
      closeModal();
    }
  } else if (
    e.target.classList.contains("modal-delete__button-cancel") &&
    modalDelete.getAttribute("data-create-in-list") === "true"
  ) {
    removeApproveDeleteModal();
  } else if (e.target.classList.contains("modal-delete__button-cancel")) {
    checkoutToModal();
  }
};

function getUserData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .then((json) => {
      const user = json;
      return user;
    });
}

const updateOrAddUser = (e) => {
  console.log(e);
  e.preventDefault();
  let obj = {};
  obj.id = e.target.getAttribute("data-id");
  obj.surname = document.getElementById("surname").value;
  obj.name = document.getElementById("name").value;
  obj.lastName = document.getElementById("patronymic").value;
  obj.updatedAt = new Date();
  if (e.submitter.getAttribute("data-submit") === "add") {
    obj.createdAt = new Date();
  }

  let contactsArray = [];

  document.querySelectorAll(".modal__select-input").forEach((option) => {
    if (e.submitter.getAttribute("data-submit") === "edit") {
      contactsArray.push({
        type: option.getAttribute("data-type"),
        value: option.value,
      });
    } else {
      contactsArray.push({
        type: option.previousElementSibling.value,
        value: option.value,
      });
    }
  });

  obj.contacts = contactsArray;

  if (e.submitter.getAttribute("data-submit") === "edit") {
    fetch(
      `http://localhost:3000/api/clients/${e.target.getAttribute("data-id")}`,
      {
        method: "PATCH",
        body: JSON.stringify(obj),
      }
    );
  } else {
    const response = fetch("http://localhost:3000/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  }
};

const createModalContent = (addNew) => {
  const input = document.createElement("input");
  input.classList.add("modal__input");
  const label = document.createElement("label");
  label.classList.add("modal__label");
  const span = document.createElement("span");
  span.classList.add("modal__star");
  span.textContent = "*";

  addSelectInputButton.addEventListener("click", () => {
    addNewSelectInput(null);
  });

  const inputSurname = input.cloneNode(true);
  inputSurname.setAttribute("id", "surname");
  inputSurname.setAttribute("name", "surname");
  inputSurname.setAttribute("autocomplete", "family-name");

  const labelSurname = label.cloneNode(true);
  labelSurname.setAttribute("for", "surname");
  labelSurname.textContent = "Фамилия";
  labelSurname.append(span.cloneNode(true));

  const inputName = input.cloneNode(true);
  inputName.setAttribute("id", "name");
  inputName.setAttribute("name", "name");
  inputName.setAttribute("autocomplete", "given-name");

  const labelName = label.cloneNode(true);
  labelName.setAttribute("for", "name");
  labelName.textContent = "Имя";
  labelName.append(span.cloneNode(true));

  const inputPatronymic = input.cloneNode(true);
  inputPatronymic.setAttribute("id", "patronymic");
  inputPatronymic.setAttribute("name", "patronymic");
  inputPatronymic.setAttribute("autocomplete", "off");

  const labelPatronymic = label.cloneNode(true);
  labelPatronymic.setAttribute("for", "patronymic");
  labelPatronymic.textContent = "Отчество";
  labelPatronymic.append(span.cloneNode(true));

  editForm.prepend(inputPatronymic);
  editForm.prepend(labelPatronymic);

  editForm.prepend(inputName);
  editForm.prepend(labelName);

  editForm.prepend(inputSurname);
  editForm.prepend(labelSurname);
};

const removeModalContent = () => {
  document.querySelectorAll(".modal__label").forEach((label) => {
    label.remove();
  });
  document.querySelectorAll(".modal__input").forEach((label) => {
    label.remove();
  });
  document.querySelectorAll(".modal__form-select-content").forEach((div) => {
    div.remove();
  });
};

const removeApproveDeleteModal = () => {
  modalDelete.classList.remove("d-block");
  modalDelete.removeAttribute("data-create-in-list");
  document.querySelector("body").classList.remove("hide-overflow-x");
  background.classList.remove("d-block");
};

const checkoutToModal = () => {
  modalDelete.classList.remove("d-block");
  modal.classList.add("d-block");
};

const closeModal = () => {
  document.querySelector("body").classList.remove("hide-overflow-x");
  background.classList.remove("d-block");
  modal.classList.remove("d-block");
  removeModalContent();
};

const addNewSelectInput = (data = null) => {
  const div = document.createElement("div");
  div.classList.add("modal__form-select-content");
  const select = document.createElement("select");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("modal__select-input");
  input.placeholder = "Введите данные контакта";
  select.classList.add("modal__select");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("modal__select-delete-button");
  deleteButton.setAttribute('type', 'button');
  deleteButton.addEventListener('click', removeInput)
  const optionHtml = document.createElement("option");

  addNewOptions.forEach((option) => {
    let optionHtmlClone = optionHtml.cloneNode(true);
    if (data && data.type === option.value) {
      optionHtmlClone.setAttribute("selected", true);
      optionHtmlClone.value = data.type;
      optionHtmlClone.innerText = data.type;
    } else {
      select.setAttribute("name", "select");
      optionHtmlClone.value = option.value;
      optionHtmlClone.innerText = option.value;
    }
    optionHtmlClone.setAttribute("class", option.class);

    select.append(optionHtmlClone);
  });
  let inputClone = input.cloneNode(true);
  if (data) {
    inputClone.value = data.value;
    inputClone.setAttribute("data-type", data.type);
    inputClone.setAttribute("autocomplete", "off");
    select.setAttribute("autocomplete", "off");
    select.setAttribute("name", "select");
  }
  inputClone.setAttribute("name", "contact_input");

  div.append(select);
  div.append(inputClone);
  div.append(deleteButton);

  editForm.insertBefore(
    div,
    document.querySelector(".modal__add-contact-button")
  );
};

const removeInput = (e) => {
  e.target.parentNode.remove()
}