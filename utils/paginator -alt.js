const getPagination = (page, size) => {
    const limitForQuery = size ? size : 10;
    const offsetForQuery = page * limitForQuery;
    return { limitForQuery, offsetForQuery };
};



const getPagingData = (data, page, limit, entity) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? page : 0;

    let totalPages;
    //si es uno significa que x ej: 16 / 10
    if((totalItems%limit) > 0){
        totalPages = Math.ceil(totalItems / limit);
    } else {
        totalPages = Math.floor(totalItems / limit);
    }
    
    //Last page number
    let lastPageNumber = totalPages - 1;

    const url = "http://localhost:3000/";

    //Variable with max page number

    //Array with pages with content
    let pagesWithContentIndex = [];
    for (let i = 0; i < totalPages; i++) {
        pagesWithContentIndex.push(i)
    }

    //Prev page link 
    let prevPage;
    if(currentPage == 0) {
        prevPage = null
    }else if(currentPage <= lastPageNumber){
        prevPage = url + `${entity}/?page=${(currentPage)-1}`
    } else if(currentPage > lastPageNumber){
        prevPage = url + `${entity}/?page=${(lastPageNumber)}`
    }

    //Current page link
    const currentPageLink = url + `${entity}/?page=${parseInt(currentPage)}`;

    //Next page link 
    const nextPage =
        currentPage < lastPageNumber ?
        url + `${entity}/?page=${parseInt(currentPage)+1}` :
        null;

    return {
        totalItems,
        items,
        totalPages,
        pagesWithContentIndex,
        currentPage,
        prevPage,
        currentPageLink,
        nextPage,
    };
};

module.exports = {
    getPagination,
    getPagingData
}