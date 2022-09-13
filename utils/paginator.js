//Build complete url with the entire req object
const getUrl = (reqbody) => {
    return `${reqbody.protocol}//${reqbody.get('Host')}${reqbody.baseUrl}`
}

//Define query for db
const getPagination = (page, size, ) => {
    const limit = size ? +size : 10;
    
    const offset = page > 0 ? (page - 1) * limit : 0;

    return { limit, offset };
};

//GetPagingData receive: 
    //data = model.findAndCountAll result
    //page = const { page = 1, size } = req.query;
    //limit = const { page = 1, size } = req.query;
    //link =  const url : `${req.protocol}//${req.get('Host')}${req.baseUrl}`
const getPagingData = (data, page, limit, link) => {
    const { count: totalItems, rows: items } = data;
    
    const totalPages = Math.ceil(totalItems / limit);
    
    const url = link;

    //Send currentpage number to check if current page > totalPages
    let currentPage = page;
    if(currentPage == 0 ){
        currentPage = 1;
    }else if(currentPage > 0){
        currentPage = page
    }

    //Prev page link 
    let prevPage;
    if(currentPage == 0 || currentPage == 1 ) {
        prevPage = null
    }else if(currentPage <= totalPages){
        prevPage = url + `/?page=${(currentPage)-1}`
    }

    //Next page link
    const nextPage =
        currentPage < totalPages ?
        url + `/?page=${parseInt(currentPage)+1}` :
        null;


    return {
        totalItems,
        items,
        totalPages,
        prevPage,
        currentPage,
        nextPage,
    };
};


module.exports = {
    getUrl,
    getPagination,
    getPagingData
}