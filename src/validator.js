const validator = {
    isValid: function (numero) {
        const separarCadena = numero.split("");
        const invCadena = separarCadena.reverse();
        let total = 0;
        for (let i = 0; i < invCadena.length; i++) {
            if (i % 2 === 1) {
                numero = parseInt(invCadena[i]) * 2;
                if (numero >= 10) {
                    numero = numero.toString().split("")
                    invCadena[i] = parseInt(numero[0]) + parseInt(numero[1]);
                } else {
                    invCadena[i] = numero;
                }
            }
            total += parseInt(invCadena[i]);
        }
        // Validar tarjeta
        if (total % 10 === 0) {
            return true;
        } else {
            return false;
        }
    },
    maskify: function (numero) {
        numero = numero.toString();
        let acumulador = "";
        for (let i = 0; i < numero.length; i++) {
            if (numero[i] === " ") {
                acumulador = acumulador + " ";
            }
            else if (i < numero.length - 4) {
                acumulador = acumulador + "#";
            } else {
                acumulador = acumulador + numero[i];
            }
        }
        return acumulador;
    }
};
export default validator;