import validator from './validator.js';

const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logo = document.querySelector('#logo');
const mesExpiracion = document.querySelector('#tarjeta #expiracion .mes');
const yearExpiracion = document.querySelector('#tarjeta #expiracion .year');


//Botón de abrir formulario.
btnAbrirFormulario.addEventListener('click', () => {
    //Para que gire el botón
    btnAbrirFormulario.classList.toggle('active');
    //Para mostras el formulario
    formulario.classList.toggle('active');
});

// Select del mes

for (let i = 1; i <= 12; i++) {
    const opcion = document.createElement('option'); //Dentro del ciclo se crea la variable opcion, el createElement permite crear un elemento, es como una etiqueta de tipo opcion que va dentro del select
    opcion.value = i; //Esta etiqueta requiere un atributo value (le da el valor a opcion), este valor se va a ir incrementando
    opcion.innerText = i; //Es para el texto que va ir dentro de la opcion, y luego hay que insertarla dentro del select
    formulario.selectMes.appendChild(opcion);//Con esto se pone dentro del select la opcion
}

// Select del año

const yearActual = new Date().getFullYear(); //Con esto se obtiene el año del sistema
for (let i = yearActual; i <= yearActual + 8; i++) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

//Validacion de la tarjeta, input numero de tarjeta

formulario.inputNumero.addEventListener('keyup', (e) => { /*con el keyup al presionar y soltar la tecla se ejecuta este evento, 
entonces se le pasa una función como 2 parametro que es la que se va a ejecutar, se pone (e) porque se quiere recibir el evento,
quiere decir que el input va a recibir un evento cuando presione una tecla y con este parametro se va acceder a el*/

    const valorInput = e.target.value; //El target es el elemento que recibio, junto value se accede al valor que tiene dentro

    formulario.inputNumero.value = valorInput

        //Se guarda el valor en el mismo lado donde se esta tomando, esto es para plicar el metodo replace
        //eliminamos espacios en blanco
        .replace(/\s/g, '') //Permite pasar una expresión regular, una pequeña fracción del codigo que permite leer en la expresión que se tenga y poderla reemplazar si hay alguna coincidencia
        //En este caso se esta utilizando para reemplazar los espacios por "nada" así no permite agregarlos
        //Ahora se utiliza para eliminar las letras. TODO desde formulario hasta el siguiente replace debería ir una linea pero estoy describiendo para estudiar 
        .replace(/\D/g, '')
        //Poner espacio cada 4 números
        .replace(/([0-9]{4})/g, '$1 ')
        //Elimina el último espaciado
        .trim();
    //Se hace la llamada maskify para que los 1eros 12 número se muestren con # y los últimos 4 normal en números
    const mask = validator.maskify(formulario.inputNumero.value)
    //console.log(mask); 

    const numerox = formulario.inputNumero.value.replace(/ /g, "");

    const tcValida = validator.isValid(numerox);
    //console.log(tcValida);

    if (numerox.length === 16) {
        if (tcValida === true) {
            document.getElementById("valida").innerHTML = 'Tarjeta Valida';
        }
        else {
            document.getElementById("valida").innerHTML = 'Tarjeta Invalida';
        }
    }
    else {
        document.getElementById("valida").innerHTML = 'XXXX';
    }


    //Ahora se hará para que se muestre el # de tarjeta en el frente de la tarjeta

    numeroTarjeta.textContent = mask;

    if (valorInput[0] === ' ' || valorInput === '') {
        numeroTarjeta.textContent = '#### #### #### ####';
        logo.innerHTML = ''; //De esta forma escribe el numero y si borra desaparece el logo
    }

    //Para identificar si es visa o mastercard
    if (valorInput[0] == 4) {
        logo.innerHTML = ''; //Reinicia el elemento, en este caso la imagen
        const imagen = document.createElement('img');
        imagen.src = 'img/visa.png';
        logo.appendChild(imagen);
    } else if (valorInput[0] == 5) {
        logo.innerHTML = ''; //Cada que se ejecuta 1ero elimina el logo y luego vuelve a gregar la imagen (en este caso es la imagen pero es el contenido que tenga dentro)
        const imagen = document.createElement('img');
        imagen.src = 'img/master.png';
        logo.appendChild(imagen);
    }
});

//Input nombre de la tarjeta

formulario.inputNombre.addEventListener('keyup', (e) => {
    const valorInput = e.target.value;
    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '').replace(/[!"#$%&/()=?¿+¨*{}.,:;-_~]/g, '');
    nombreTarjeta.textContent = valorInput;

    if (valorInput === '') {
        nombreTarjeta.textContent = 'NOMBRE APELLIDO';
        logo.innerHTML = '';
    }
});

// Select mes

formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
});

formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
});

formulario.inputCVV.addEventListener('keyup', () => {

    formulario.inputCVV.value = formulario.inputCVV.value
        .replace(/\s/g, '')
        .replace(/\D/g, '');
});
