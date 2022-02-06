const {response} = require('express');
const Busquedas = require("../models/busquedas");
const respuestas = require("../helpers/respuestas");

const usPost = async (req, res = response) => {

    let {dominio, vehiculo_year, vehiculo_kms} = req.body;
    const busquedas = new Busquedas();

    try {
            
        if(!dominio){res.json( { Error:"debe mandar un dominio"} )}
        else{
            if(!vehiculo_year){
                vehiculo_year = (await busquedas.buscarYearByDominio(dominio)).year;
                if (!vehiculo_year) {
                    return res.json({
                        'Error': 'Error de dominio',
                        'dominio':`${dominio} invalido`
                    })
                }
            };
            if(!vehiculo_kms) vehiculo_kms = 1;
            if(vehiculo_kms === 60000) vehiculo_kms++;

            let vehiculo = await busquedas.vehiculo( dominio, vehiculo_year, vehiculo_kms );
            let resp = await respuestas(vehiculo);
            res.json(resp);
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};


module.exports = usPost;