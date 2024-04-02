import { showDeleteModal } from "./deleteUser.js";

export const modalEvents = () => {
  showButton.addEventListener("click", showModal);
  background.addEventListener("click", hideModal);
};

export { background, modalDelete };

export const showModal = (e) => {
  document.querySelector("body").classList.add("hide-overflow");
  background.classList.add("d-block");
  modal.classList.add("d-block");
  const submitButton = document.querySelector(".modal__submit-button");

  if (e && e.target.getAttribute("id") == "addClient") {
    modalTitle.innerText = "Добавить клиента";
    submitButton.textContent = "Добавить";
    editForm.addEventListener("submit", updateOrAddUser);
    submitButton.setAttribute("data-submit", "add");
    createModalContent();
  } else {
    modalTitle.innerText = "Изменить данные";
    if (Number(window.location.hash.slice(1))) {
      userId = Number(window.location.hash.slice(1));
    } else {
      userId = e.target.getAttribute("data-id");
    }
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

  let shownInterval = setInterval(() => {
    if(userId) {
      window.location.hash = userId;
    }
    if (document.querySelector(".modal__invalid-field")) {
      clearInterval(shownInterval);
      modal.classList.add("modal_show");
    }
  }, 200);
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
const closeModalButton = document.querySelector(".modal__close-modal");

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
  let validContacts = true;

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

  document.querySelectorAll('.modal__select-input').forEach((input) => {
    if(!input.value) {
      input.classList.add("is-invalid")
      validContacts = false
    } else {
      validContacts = true
    }
  })

  if (!obj.surname || !obj.name || !validContacts) {
    let invalidField = document.querySelector(".modal__invalid-field");
    invalidField.classList.add("d-inline-block");
    if (!obj.surname) {
      document.querySelector("#surname").classList.add("is-invalid");
    }
    if (!obj.name) {
      document.querySelector("#name").classList.add("is-invalid");
    }
    if (!obj.surname && !obj.name && validContacts) {
      invalidField.textContent =
        'Ошибка: Поля "Фамилия" и "Имя" обязательны для заполнения';
    } else if (!obj.surname) {
      invalidField.textContent =
        'Ошибка: Поле "Фамилия" обязательны для заполнения';
    } else if (!obj.name) {
      invalidField.textContent =
        'Ошибка: Поле "Имя" обязательны для заполнения';
    } else if (obj.surname && obj.name && !validContacts) {
      invalidField.textContent =
        'Ошибка: Полностью заполните контакты';
    }
  } else {
    if (e.submitter.getAttribute("data-submit") === "edit") {
      fetch(
        `http://localhost:3000/api/clients/${e.target.getAttribute("data-id")}`,
        {
          method: "PATCH",
          body: JSON.stringify(obj),
        }
      );
    } else {
      fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    }
  }
};

const createModalContent = () => {
  const div = document.createElement("div");
  div.classList.add("modal__select-input-wrapper");
  const input = document.createElement("input");
  input.classList.add("modal__input");
  const label = document.createElement("label");
  label.classList.add("modal__label");
  const span = document.createElement("span");
  span.classList.add("modal__star");
  span.textContent = "*";

  const addContactBtn = document.createElement("button");
  addContactBtn.classList.add("modal__add-contact-button");
  addContactBtn.setAttribute("type", "button");
  addContactBtn.textContent = "Добавить Контакт";

  const modalInvalidField = document.createElement("button");
  modalInvalidField.classList.add("modal__invalid-field");

  const inputSurname = input.cloneNode(true);
  inputSurname.setAttribute("id", "surname");
  inputSurname.setAttribute("name", "surname");
  inputSurname.setAttribute("autocomplete", "family-name");
  inputSurname.addEventListener("input", removeError);

  const labelSurname = label.cloneNode(true);
  labelSurname.setAttribute("for", "surname");
  labelSurname.textContent = "Фамилия";
  labelSurname.append(span.cloneNode(true));

  const inputName = input.cloneNode(true);
  inputName.setAttribute("id", "name");
  inputName.setAttribute("name", "name");
  inputName.setAttribute("autocomplete", "given-name");
  inputName.addEventListener("input", removeError);

  const labelName = label.cloneNode(true);
  labelName.setAttribute("for", "name");
  labelName.textContent = "Имя";
  labelName.append(span.cloneNode(true));

  const inputPatronymic = input.cloneNode(true);
  inputPatronymic.setAttribute("id", "patronymic");
  inputPatronymic.setAttribute("name", "patronymic");
  inputPatronymic.setAttribute("autocomplete", "off");
  inputPatronymic.addEventListener("input", removeError);
  const labelPatronymic = label.cloneNode(true);
  labelPatronymic.setAttribute("for", "patronymic");
  labelPatronymic.textContent = "Отчество";

  addContactBtn.addEventListener("click", () => addNewSelectInput(null));

  editForm.insertBefore(
    addContactBtn,
    document.querySelector(".modal__submit-button")
  );

  editForm.insertBefore(
    modalInvalidField,
    document.querySelector(".modal__submit-button")
  );
  editForm.prepend(div);

  editForm.prepend(inputPatronymic);
  editForm.prepend(labelPatronymic);

  editForm.prepend(inputName);
  editForm.prepend(labelName);

  editForm.prepend(inputSurname);
  editForm.prepend(labelSurname);
};

const removeModalContent = () => {
  removeClassElement(".modal__label");
  removeClassElement(".modal__input");
  removeClassElement(".modal__form-select-content");
  removeClassElement(".modal__add-contact-button");
  removeClassElement(".modal__invalid-field");
  removeClassElement(".modal__select-input-wrapper");
};

const removeClassElement = (elementsClass) => {
  document.querySelectorAll(elementsClass).forEach((element) => {
    element.remove();
  });
};

const removeApproveDeleteModal = () => {
  modalDelete.classList.remove("d-block");
  modalDelete.removeAttribute("data-create-in-list");
  document.querySelector("body").classList.remove("hide-overflow");
  background.classList.remove("d-block");
};

const checkoutToModal = () => {
  modalDelete.classList.remove("d-block");
  modal.classList.add("d-block");
};

const closeModal = () => {
  document.querySelector("body").classList.remove("hide-overflow");
  background.classList.remove("d-block");
  modal.classList.remove("d-block");
  modal.classList.remove("modal_show");
  removeModalContent();
  document.querySelector(".modal__id").textContent = '';
  userId = ''
  if (Number(window.location.hash.slice(1))) {
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL) 
  }
};

const addNewSelectInput = (data = null) => {
  if (document.querySelectorAll(".modal__form-select-content").length < 10) {
    const wrapper = document.querySelector(".modal__select-input-wrapper");
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
    deleteButton.setAttribute("type", "button");
    deleteButton.addEventListener("click", removeInput);
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
    inputClone.addEventListener("input", removeError);
    if (data) {
      inputClone.value = data.value;
      inputClone.setAttribute("data-type", data.type);
      inputClone.setAttribute("autocomplete", "off");
      select.setAttribute("autocomplete", "off");
      select.setAttribute("name", "select");
    }

    select.addEventListener("change", (e) => {
      select.nextElementSibling.setAttribute("data-type", select.value);
      select.blur();
    });

    inputClone.setAttribute("name", "contact_input");

    div.append(select);
    div.append(inputClone);
    div.append(deleteButton);

    wrapper.append(div);

    if (wrapper.offsetHeight >= 245) {
      wrapper.classList.add("yScroll");
    }

    if (document.querySelectorAll(".modal__form-select-content").length == 10) {
      document
        .querySelector(".modal__add-contact-button")
        .classList.add("inactive");
    }
  } else {
    document
      .querySelector(".modal__add-contact-button")
      .classList.add("inactive");
  }
};

const removeInput = (e) => {
  e.target.parentNode.remove();
  if (document.querySelectorAll(".modal__form-select-content").length < 10) {
    document
      .querySelector(".modal__add-contact-button")
      .classList.remove("inactive");
  }
  const wrapper = document.querySelector(".modal__select-input-wrapper");
  if (wrapper.offsetHeight < 245) {
    wrapper.classList.remove("yScroll");
  }
};

const removeError = (e) => {
  document
    .querySelector(".modal__invalid-field")
    .classList.remove("d-inline-block");
  e.target.classList.remove("is-invalid");
};

closeModalButton.addEventListener("click", closeModal);

if (window.location.hash) {
  showModal();
}
