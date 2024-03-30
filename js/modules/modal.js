export const modalEvents = () => {
  showButton.addEventListener("click", showModal);
  background.addEventListener("click", hideModal);
};

export const showModal = (e) => {
  document.querySelector("body").classList.add("hide-overflow-x");
  background.classList.add("d-block");
  modal.classList.add("d-block");

  if (e.target.getAttribute("id") == "addClient") {
    modalTitle.innerText = "Добавить клиента";
  } else if (e.target.classList.contains("section-table__table-edit")) {
    modalTitle.innerText = "Изменить клиента";
    userId = e.target.getAttribute("data-id");
    getUserData(`http://localhost:3000/api/clients/${userId}`).then(
      (editUser) => {
        console.log(editUser.surname)
        const submitButton = document.querySelector(".modal__submit-button");
        editForm.setAttribute('data-id', userId)
        document.querySelector(".modal__id").textContent = `ID: ${editUser.id}`;
        submitButton.textContent = "Сохранить";
        editForm.addEventListener("submit", changeUser);
        createModalContent()

        document.getElementById("surname").setAttribute("value", editUser.surname);
        document.getElementById("name").setAttribute("value", editUser.name);
        document.getElementById("patronymic").setAttribute("value", editUser.lastName);
      }
      );
  }
};

const showButton = document.getElementById("addClient");
const background = document.getElementById("background");
const modal = document.getElementById("modal");
const editForm = document.querySelector(".modal__form");
const modalTitle = document.querySelector(".modal__title");

let userId;
const hideModal = (e) => {
  if (e.target.classList.contains("background")) {
    document.querySelector("body").classList.remove("hide-overflow-x");
    background.classList.remove("d-block");
    modal.classList.remove("d-block");
    removeModalContent()
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
  console.log(e.target)
  let obj = {};
  obj.id = e.target.getAttribute('data-id');
  obj.surname = document.getElementById('surname').value
  obj.name = document.getElementById('name').value
  obj.lastName = document.getElementById('patronymic').value

  console.log(obj)
  // fetch(url, {
  //   method: "PATCH",
  //   body: JSON.stringify(obj),
  // });
};

const createModalContent = () => {
  const input = document.createElement("input");
  input.classList.add('modal__input');
  const label = document.createElement("label");
  label.classList.add('modal__label');

  const inputSurname = input.cloneNode(true);
  inputSurname.setAttribute('id', 'surname');
  inputSurname.setAttribute('name', 'surname');

  const labelSurname = label.cloneNode(true);
  labelSurname.setAttribute('for', 'surname');
  labelSurname.textContent = 'Фамилия*';

  const inputName = input.cloneNode(true);
  inputName.setAttribute('id', 'name');
  inputName.setAttribute('name', 'name');

  const labelName = label.cloneNode(true);
  labelName.setAttribute('for', 'name');
  labelName.textContent = 'Имя*';

  const inputPatronymic = input.cloneNode(true);
  inputPatronymic.setAttribute('id', 'patronymic');
  inputPatronymic.setAttribute('name', 'patronymic');

  const labelPatronymic = label.cloneNode(true);
  labelPatronymic.setAttribute('for', 'patronymic');
  labelPatronymic.textContent = 'Отчество*';

  editForm.prepend(inputPatronymic)
  editForm.prepend(labelPatronymic)

  editForm.prepend(inputName)
  editForm.prepend(labelName)

  editForm.prepend(inputSurname)
  editForm.prepend(labelSurname)
}

const removeModalContent = () => {
  document.querySelectorAll('.modal__label').forEach((label) => {
    label.remove()
  })
  document.querySelectorAll('.modal__input').forEach((label) => {
    label.remove()
  })
}