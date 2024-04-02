export const searchEvent = (data) => {
  const headerBlock = document.querySelector(".header__search-content");
  headerBlock.childNodes.forEach((child) => {
    child.remove();
  });
  let searchData = [];
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const button = document.createElement("button");
  data.forEach((element) => {
    let fio = element.surname + " " + element.name + " " + element.lastName;
    if (fio.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchData.push(element);
      const liClone = li.cloneNode(true);
      const buttonClone = button.cloneNode(true);
      buttonClone.classList.add("header__search-button");
      buttonClone.setAttribute("type", "button");
      buttonClone.setAttribute("data-id", element.id);
      buttonClone.setAttribute("id", `button_${element.id}`);
      buttonClone.textContent = fio;
      buttonClone.addEventListener("focus", focus);
      liClone.append(buttonClone);
      ul.append(liClone);
      headerBlock.classList.add("d-block");
    }
    headerBlock.append(ul);

    if (searchData.length <= 0) {
      headerBlock.classList.remove("d-block");
      window.removeEventListener("keydown", moveInList);
    } else {
      window.addEventListener("keydown", moveInList);
    }
  });
  if (searchInput.value.length <= 0) {
    headerBlock.childNodes.forEach((child) => {
      child.remove();
    });
    headerBlock.classList.remove("d-block");
    return data;
  }
  return searchData;
};

export const searchInput = document.querySelector(".header__search");

const focus = (e) => {
  document.querySelectorAll(".section-table__table-tr").forEach((tr) => {
    tr.classList.remove("prime");
    tr.classList.remove("not-prime");
    if (tr.getAttribute("data-id") === e.target.getAttribute("data-id")) {
      tr.classList.add("prime");
    } else {
      tr.classList.add("not-prime");
    }
  });
};

let selected = false;
let list = [];
const moveInList = (e) => {
  if (e.keyCode == 38 || e.keyCode == 40) {
    if (!selected) {
      document
        .querySelectorAll(".header__search-button")
        .forEach((button, index) => {
          let obj = {};
          obj.index = index;
          obj.id = button.getAttribute("data-id");
          if (button.getAttribute("data-selected")) {
            obj.selected = true;
          } else {
            obj.selected = false;
          }
          list.push(obj);
        });
    }
  }
  if (e.keyCode == 38) {
    //UP
    e.preventDefault();
    for (const item of list) {
      if (item.selected) {
        if (list[item.index - 1]) {
          item.selected = false;
          list[item.index - 1].selected = true;
          document.getElementById(`button_${list[item.index - 1].id}`).focus();
          break;
        } else {
          item.selected = false;
          list[list.length - 1].selected = true;
          document.getElementById(`button_${list[list.length - 1].id}`).focus();
          break;
        }
      }
    }
    if (!selected) {
      list[list.length - 1].selected = true;
      document.getElementById(`button_${list[list.length - 1].id}`).focus();
      document
        .getElementById(`button_${list[list.length - 1].id}`)
        .setAttribute("data-selected", true);
      selected = true;
    }
  }
  if (e.keyCode == 40) {
    e.preventDefault();
    for (const item of list) {
      if (item.selected) {
        if (list[item.index + 1]) {
          item.selected = false;
          list[item.index + 1].selected = true;
          document.getElementById(`button_${list[item.index + 1].id}`).focus();
          break;
        } else {
          item.selected = false;
          list[0].selected = true;
          document.getElementById(`button_${list[0].id}`).focus();
          break;
        }
      }
    }
    if (!selected) {
      list[0].selected = true;
      document.getElementById(`button_${list[0].id}`).focus();
      document
        .getElementById(`button_${list[0].id}`)
        .setAttribute("data-selected", true);
      selected = true;
    }
  }
};

let observer = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach((mutation) => {
    if (mutation.type == "childList") {
      if (
        !document.querySelector(".header__search-content").childNodes.length
      ) {
        window.removeEventListener("keydown", moveInList);
        list = [];
        selected = false;
      }
    }
  });
});

observer.observe(document.querySelector(".header__search-content"), {
  childList: true, 
});
