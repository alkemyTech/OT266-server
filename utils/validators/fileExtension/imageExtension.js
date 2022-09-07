
//Validate image extension function
//If its valid returns true / otherwise returns no
const ValidateExtension = (fileName) => {
    //Array of valid extensions    
    let validExtensions = [ 'pdf', 'jpg','jpeg', 'png',];

    let fileExtension = fileName.split('.').pop();

    if(validExtensions.includes(fileExtension)){
        return true
    } else {
        return false
    }
}

module.exports = {ValidateExtension}