import { background } from "./modal.js";

export const showDeleteModal = (id, modal, modalDelete) => {
  if (!background.classList.contains("d-block")) {
    document.querySelector("body").classList.add("hide-overflow");
    background.classList.add("d-block");
    modalDelete.classList.add("d-block");
    modalDelete.setAttribute("data-create-in-list", "true");
    modalDelete.classList.add("modal_show");
  } else {
    modal.classList.remove("d-block");
    modalDelete.classList.add("d-block");
    modal.classList.add("modal_show");
  }

  modalDeleteButton.addEventListener("click", (e) => {
    deleteUser(e, id);
  });
};

const modalDeleteButton = document.querySelector(
  ".modal-delete__button-confirm"
);

const deleteUser = (e, id) => {
  e.preventDefault();
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
};
