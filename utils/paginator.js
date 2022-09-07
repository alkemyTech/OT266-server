const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page > 0 ? (page - 1) * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit, entity) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    const url = "http://localhost:3000/";

    const nextPage =
        page < totalPages ?
        url + `${entity}/?page=${parseInt(page)+1}` :
        null;

    const prevPage =
        page > 1 ?
        url + `${entity}/?page=${(page)-1}` :
        null;

    return {
        totalItems,
        items,
        totalPages,
        currentPage,
        nextPage,
        prevPage
    };
};


module.exports = {
    getPagination,
    getPagingData
}