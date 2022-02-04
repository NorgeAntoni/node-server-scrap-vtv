


const respuestas = async veh =>{

    let resp = veh.result;
    let arr = resp.split(' ');
    const length = arr.length;

    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];    
    let mes = meses.indexOf(arr[12]) + 1;
    let yearVen = Number(arr[14]);
    
    if (length === 22) {
        //caso 1- Vehículo sin VTV vigente, por ser nuevo (3 años)
        return {
            "vigente": false,
            "requerida": false,
            "vencida": false,
            "puede_circular": true,
            "proximo_vencimiento_mes": mes,
            "proximo_vencimiento_year": yearVen,
            "caso_codigo": "vtv_no_requerida_por_vehiculo_nuevo",
            "caso_descripcion": "El vehículo, por ser nuevo, no requiere VTV hasta el vencimiento o llegar a los 60.000 kms"
           }
    } 
    else if( length === 36 ) {
        //Caso 2 - Vehículo sin VTV vigente por ser nuevo pasado de 60000 km o por ya requerirlo y no haberla realizado
        mes = arr[15];
        mes = mes.slice(1, mes.length -2);
        mes = meses.indexOf(mes) +1;

        const fecha = new Date();
        const mesAct = fecha.getMonth() +1;
        
        if (mesAct > mes) {
            yearVen = fecha.getFullYear();
        } else { 
            yearVen = fecha.getFullYear() - 1;
        }
        return {
            "vigente": false,
            "requerida": true,
            "vencida": true,
            "puede_circular": false,
            "proximo_vencimiento_mes": mes,
            "proximo_vencimiento_year": yearVen,
            "caso_codigo": "vtv_vencida",
            "caso_descripcion": "El vehículo posee la VTV vencida"
           }        
    }
    else if (length === 35) {
        //Caso 4 - Vehículo sin VTV vigente, por ser nuevo, pero en último año de gracia (3 años)
        return {
            "vigente": false,
            "requerida": false,
            "vencida": false,
            "puede_circular": true,
            "proximo_vencimiento_mes": mes,
            "proximo_vencimiento_year": yearVen,
            "caso_codigo": "vtv_no_requerida_por_vehiculo_nuevo_last_year",
            "caso_descripcion": "El vehículo, por ser nuevo, no requiere VTV hasta el vencimiento o llegar a los 60.000 kms. Adelantar VTV no posterga vencimiento."
        }           
    }
}

module.exports = respuestas