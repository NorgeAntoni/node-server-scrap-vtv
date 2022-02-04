
const axios = require('axios');
const fetch = require('node-fetch');

class Busquedas {
    async vehiculo( dominio = '', year, km = 1){
        try {
            //peticion http
            const resp = await fetch("https://www.suvtv.com.ar/controller/ControllerDispatcher.php", {
                "headers": {
                  "accept": "application/json, text/javascript, */*; q=0.01",
                  "accept-language": "es-ES,es;q=0.9",
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  "cookie": "PHPSESSID=qqvg9vo1e00hu24ebvq9drojt1",
                  "Referer": "https://www.suvtv.com.ar/turnos/",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": `controllerName=OperacionController&actionName=obtenerMensajeCalculadora&dominio=${dominio}&anioVeh=${year}&kmVeh=${km}`,
                "method": "POST"
            }).then( resp => resp.json());
            return resp;
        } catch (error) {
            throw error;
        }        
    }

    async buscarYearByDominio(dominio){
        try{
            const resp = await axios.get(`https://cetaweb.afip.gob.ar/api/v1/automotor?dominio=${dominio}`);
            const carro = resp.data;

            return {
                marca_y_modelo:  carro.p_aut_fmm_ds,
                year: carro.p_aut_anio,
                valuacion: carro.p_aut_valuacion,
                dominio: carro.dominio
            };
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Busquedas;