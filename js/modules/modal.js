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
        document.getElementById("surname").placeholder = editUser.surname;
        document.getElementById("name").placeholder = editUser.name;
        document.getElementById("patronomic").placeholder = editUser.lastName;
      }
    );
  }
};

const showButton = document.getElementById("addClient");
const background = document.getElementById("background");
const modal = document.getElementById("modal");
const modalTitle = document.querySelector(".modal__title");
let userId;
const hideModal = (e) => {
  if (e.target.classList.contains("background")) {
    document.querySelector("body").classList.remove("hide-overflow-x");
    background.classList.remove("d-block");
    modal.classList.remove("d-block");
  }
};

const checkUser = async (url) => {
  let userData = await fetch(url);
  //use string literals
  let userJson = await userData.json();
  return userJson;
};

// Gets the fullname of the customer from an id.
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
      const customer_name = json;
      return customer_name;
    });
}
