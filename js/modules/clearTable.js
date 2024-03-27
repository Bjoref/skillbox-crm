export const clearTable = () => {
  //Чистим таблицу
  document
    .querySelectorAll(".section-table__table-tr_content")
    .forEach((child) => {
      if (child.classList.contains("section-table__table-tr_content")) {
        child.remove();
      }
    });
};
