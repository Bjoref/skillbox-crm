export const filterBy = (data, type) => {
  switch (type) {
    case "id":
      if (idFilterButton.classList.contains("filter-up")) {
        removeFilterClass();
        data.sort((a, b) => b.id - a.id);
        idFilterButton.classList.add("filter-down");
      } else {
        removeFilterClass();
        data.sort((a, b) => a.id - b.id);
        idFilterButton.classList.add("filter-up");
      }
      return data;
      break;

    case "fio":
      if (fioFilterButton.classList.contains("filter-up")) {
        removeFilterClass();
        data.sort((a, b) =>
          `${a.surname} ${a.name} ${a.lastName}`.localeCompare(
            `${b.surname} ${b.name} ${b.lastName}`
          )
        );
        fioFilterButton.classList.add("filter-down");
      } else {
        removeFilterClass();
        data.sort((a, b) =>
          `${b.surname} ${b.name} ${b.lastName}`.localeCompare(
            `${a.surname} ${a.name} ${a.lastName}`
          )
        );
        fioFilterButton.classList.add("filter-up");
      }
      return data;
      break;
    case "createdAt":
      if (createdAtFilterButton.classList.contains("filter-up")) {
        removeFilterClass();
        data.sort((a, b) => sortDate(a.createdAt, b.createdAt, "down"));
        createdAtFilterButton.classList.add("filter-down");
      } else {
        removeFilterClass();
        data.sort((a, b) => sortDate(a.createdAt, b.createdAt, "up"));
        createdAtFilterButton.classList.add("filter-up");
      }
      return data;
      break;
    case "updatedAt":
      if (updatedAtFilterButton.classList.contains("filter-up")) {
        removeFilterClass();
        data.sort((a, b) => sortDate(a.updatedAt, b.updatedAt, "down"));
        updatedAtFilterButton.classList.add("filter-down");
      } else {
        removeFilterClass();
        data.sort((a, b) => sortDate(a.updatedAt, b.updatedAt, "up"));
        updatedAtFilterButton.classList.add("filter-up");
      }
      return data;
      break;
  }
};

export const idFilterButton = document.querySelector(
  ".section-table__table-th_id"
);
export const fioFilterButton = document.querySelector(
  ".section-table__fio-button"
);
export const createdAtFilterButton = document.querySelector(
  ".section-table__date"
);
export const updatedAtFilterButton = document.querySelector(
  ".section-table__last-update"
);

const removeFilterClass = () => {
  document.querySelectorAll(".filter-up").forEach((item) => {
    item.classList.remove("filter-up");
  });
  document.querySelectorAll(".filter-down").forEach((item) => {
    item.classList.remove("filter-down");
  });
};

const sortDate = (a, b, type) => {
  if (type === "up") {
    return new Date(a) - new Date(b);
  } else {
    return new Date(b) - new Date(a);
  }
};
