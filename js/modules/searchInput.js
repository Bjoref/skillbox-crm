export const searchEvent = (data) => {
    let searchData = []
    data.forEach(element => {
        let fio = element.surname + ' ' + element.name + ' ' + element.lastName
        if(fio.toLowerCase().includes(searchInput.value.toLowerCase())) searchData.push(element)
    });
    if(searchInput.value.length <= 0) return data
    return searchData
};

export const searchInput = document.querySelector(".header__search");