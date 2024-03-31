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
    createModalContent();
  } else if (e.target.classList.contains("section-table__table-edit")) {
    modalTitle.innerText = "Изменить клиента";
    userId = e.target.getAttribute("data-id");
    getUserData(`http://localhost:3000/api/clients/${userId}`).then(
      (editUser) => {
        editForm.setAttribute("data-id", userId);
        document.querySelector(".modal__id").textContent = `ID: ${editUser.id}`;
        submitButton.textContent = "Сохранить";
        editForm.addEventListener("submit", changeUser);
        deleteButton.addEventListener("click", () => {
          showDeleteModal(editUser.id, modal, modalDelete);
        });
        cancelDeleteButton.addEventListener("click", hideModal);
        createModalContent();

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

const changeUser = (e) => {
  e.preventDefault();
  let obj = {};
  obj.id = e.target.getAttribute("data-id");
  obj.surname = document.getElementById("surname").value;
  obj.name = document.getElementById("name").value;
  obj.lastName = document.getElementById("patronymic").value;

  console.log(obj);
  // fetch(url, {
  //   method: "PATCH",
  //   body: JSON.stringify(obj),
  // });
};

const createModalContent = (addNew) => {
  const input = document.createElement("input");
  input.classList.add("modal__input");
  const label = document.createElement("label");
  label.classList.add("modal__label");

  addSelectInputButton.addEventListener("click", addNewSelectInput);

  const inputSurname = input.cloneNode(true);
  inputSurname.setAttribute("id", "surname");
  inputSurname.setAttribute("name", "surname");

  const labelSurname = label.cloneNode(true);
  labelSurname.setAttribute("for", "surname");
  labelSurname.textContent = "Фамилия*";

  const inputName = input.cloneNode(true);
  inputName.setAttribute("id", "name");
  inputName.setAttribute("name", "name");

  const labelName = label.cloneNode(true);
  labelName.setAttribute("for", "name");
  labelName.textContent = "Имя*";

  const inputPatronymic = input.cloneNode(true);
  inputPatronymic.setAttribute("id", "patronymic");
  inputPatronymic.setAttribute("name", "patronymic");

  const labelPatronymic = label.cloneNode(true);
  labelPatronymic.setAttribute("for", "patronymic");
  labelPatronymic.textContent = "Отчество*";

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

const addNewSelectInput = (e) => {
  const div = document.createElement("div");
  div.classList.add('modal__form-select-content')
  const select = document.createElement("select");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("modal__select-input");
  input.placeholder = "Введите запрос";
  select.classList.add("modal__select");

  const optionHtml = document.createElement("option");

  addNewOptions.forEach((option) => {
    let optionHtmlClone = optionHtml.cloneNode(true);
    optionHtmlClone.value = option.value;
    optionHtmlClone.innerText = option.value;
    optionHtmlClone.setAttribute("class", option.class);

    select.append(optionHtmlClone);
  });
  let inputClone = input.cloneNode(true);

  div.append(select);
  div.append(inputClone);

  editForm.insertBefore(div, e.target);
};
