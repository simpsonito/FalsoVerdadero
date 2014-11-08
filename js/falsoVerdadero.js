/**
 * Created by Adib Abud Jaso on 07/11/14.
 */
var pregunta1 = {texto:"No todo lo que brilla es oro", valor:true};
var pregunta2 = {texto:"La suma del cuadrado de los catetos es igual a la raíz cuadrada de la hipotenusa. La suma del cuadrado de los catetos es igual a la raíz cuadrada de la hipotenusa. La suma del cuadrado de los catetos es igual a la raíz cuadrada de la hipotenusa.", valor:false};
var pregunta3 = {texto:"Realizar lecturas con poca luz ejercita la visión y es bueno para la salud", valor:false};

var conjuntoPreguntas = [pregunta1, pregunta2, pregunta3];
var buenas = 0;
var bodyOriginal;

window.addEventListener("load", alCargar);
function alCargar(){
    bodyOriginal = document.body.innerHTML;
    iniciar();
    window.removeEventListener("load", alCargar);
}
function iniciar(){
    crearPreguntas();
    document.getElementById("botonRevisar").addEventListener("click", revisar);
}
function reiniciar(){
    document.body.innerHTML = bodyOriginal;
    iniciar();
}
function crearPreguntas(){
    conjuntoPreguntas = shuffle(conjuntoPreguntas);//Remover esta línea si no se quiere revolver
    var contenido = "";
    for (var i=0; i<conjuntoPreguntas.length; i++) {
        contenido += "<tr class='setPregunta'><td class='preguntaOpciones'><img class='palomita' style='display:none' src='css/palomita.png' /><img class='tache' style='display:none' src='css/tache.png' /><input type='radio' name='pregunta"+i+"' value='true'> </td><td class='preguntaOpciones'><input type='radio' name='pregunta"+i+"' value='false'> </td><td class='preguntaTexto'>" + conjuntoPreguntas[i].texto + "</td></tr>";
    }
    document.getElementById("preguntasEjercicio").outerHTML = contenido;
}
function revisar(){
    //alert("revisando");
    for(var i = 0; i<conjuntoPreguntas.length; i++){
        revisarReactivo(i);
    }

    retroalimentar('Obtuviste '+ buenas + " de " + conjuntoPreguntas.length +'. <input type="button" value="Otra vez" onClick=reiniciar()>');
    buenas = 0;
}
function revisarReactivo(numero){
    var radios = document.getElementsByName('pregunta'+numero);
    document.getElementsByClassName('palomita').item(numero).style.display = "none";
    document.getElementsByClassName('tache').item(numero).style.display = "none";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value+ " - " + conjuntoPreguntas[numero].valor);
            // only one radio can be logically checked, don't check the rest
            if(radios[i].value.toString() == conjuntoPreguntas[numero].valor.toString()){
                buenas++;
                document.getElementsByClassName('palomita').item(numero).style.display = "";
            } else {
                document.getElementsByClassName('tache').item(numero).style.display = "";
            }
            break;
        }
    }
}

function retroalimentar(texto){
    document.getElementById("retroalimentacion").innerHTML = texto;
}
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
