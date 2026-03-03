const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')

const create = async (req,res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of request body";
            return res.status(response.code).json(errorResponseBody)
        }  //missing ko middleware se handle karo hai wo bhi validation error hi
        successResponseBody.data = response
        // console.log(response)
        successResponseBody.message = "Successfully created the theatre"

        return res.status(201).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    create
}