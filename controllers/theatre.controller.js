const { get } = require('mongoose');
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

const getTheatres = async(req,res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message = "Successfully fetched the theatres"
        return res.status(200).json(successResponseBody);
    } catch (error) {

        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
} 

const getAllTheatres = async(req,res) => {
    try {
        const response = await theatreService.fetchTheatres();

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all theatres";
        
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
module.exports = {
    create,
    getTheatres,
    getAllTheatres
}