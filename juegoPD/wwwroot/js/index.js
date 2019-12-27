var caracteristicas = [{
    nombre: "Principios SOLID",
    identificador: "001",
    subcaracteristicas: [
        { nombre: "Responsabilidad Unica", texto: "" },
        { nombre: "Abierto/Cerrado", texto: "" },
        { nombre: "Sustitucion de Liskov", texto: "" },
        { nombre: "Segregacion de Interfaces", texto: "" },
        { nombre: "Inversion de Dependencias", texto: "" }
    ],
    texto: "Son guías que pueden ser aplicadas en el desarrollo de software para eliminar código sucio provocando que el programador tenga que refactorizar el código fuente hasta que sea legible y extensible."
}, {
    nombre: "Arquitecturas de Software",
    identificador: "002",
    subcaracteristicas: [
        { nombre: "Pipeline", texto: "" },
        { nombre: "Por Capas", texto: "" },
        { nombre: "Cliente-Servidor", texto: "" },
        { nombre: "Microservicios", texto: "" }
    ],
    texto: "A semejanza de los planos de un edificio o construcción, estas indican la estructura, funcionamiento e interacción entre las partes del software."
},
{
    nombre: "Patrones de Diseno Estructurales",
    identificador: "003",
    subcaracteristicas: [
        { nombre: "Decorator", texto: "" },
        { nombre: "Proxy", texto: "" },
        { nombre: "Bridge", texto: "" },
        { nombre: "Composite", texto: "" },
        { nombre: "Flyweight", texto: "" },
        { nombre: "Adapter", texto: "" },
        { nombre: "Facade", texto: "" }
    ],
    texto: "Son los patrones de diseño software que solucionan problemas de composición (agregación) de clases y objetos."
}, {
    nombre: "Patrones de Diseno Creacionales",
    identificador: "004",
    subcaracteristicas: [
        { nombre: "Prototype", texto: "" },
        { nombre: "Factory Method", texto: "" },
        { nombre: "Singleton", texto: "" },
        { nombre: "Abstract Factory", texto: "" },
        { nombre: "Builder", texto: "" }
    ],
    texto: "Corresponden a patrones de diseño de software que solucionan problemas de creación de instancias. Nos ayudan a encapsular y abstraer dicha creación."
},
{
    nombre: "Patrones de Diseno de Comportamiento",
    identificador: "005",
    subcaracteristicas: [
        { nombre: "Strategy", texto: "" },
        { nombre: "State", texto: "" },
        { nombre: "Template Method", texto: "" },
        { nombre: "Chain of Responsibility", texto: "" },
        { nombre: "Command", texto: "" },
        { nombre: "Iterator", texto: "" },
        { nombre: "Mediator", texto: "" },
        { nombre: "Observer", texto: "" },
        { nombre: "Visitor", texto: "" },
        { nombre: "Interpreter", texto: "" },
        { nombre: "Memento", texto: "" }
    ],
    texto: "Se definen como patrones de diseño software que ofrecen soluciones respecto a la interacción y responsabilidades entre clases y objetos, así como los algoritmos que encapsulan."
},
{
    nombre: "Modelo 4+1",
    identificador: "006",
    subcaracteristicas: [
        { nombre: "Vista Logica", texto: "" },
        { nombre: "Vista de Desarrollo", texto: "" },
        { nombre: "Vista de Procesos", texto: "" },
        { nombre: "Vista Fisica", texto: "" },
        { nombre: "Vista de Escenarios", texto: "" }
    ],
    texto: "Describe la arquitectura de software, basado en el uso de múltiples vistas concurrentes."
}];
var template_carta = `<div class="card hoverable subCaracteristica">
<div class="front">

</div>
<div class="back">

</div>
Este es una carta
</div>`;
var icon = $("i#icon");
var colores = ["#69f0ae", "#69f0ae", "#18ffff", "#b388ff", "#ff8a80", "#ea80fc ", "#b0bec5", "#ffe57f"];

$(document).ready(function () {
    caracteristicas.forEach(element => {
        templateCaracteristica(element.nombre, "#caracteristicas", colores[Math.round(Math.random() * colores.length - 1)], element.identificador, element.texto)
        element.subcaracteristicas.forEach(subcaracteristicas => {
            templateSubCaracteristica(subcaracteristicas.nombre, "#subCaracteristicas", colores[Math.round(Math.random() * colores.length - 1)], Math.round(Math.random() * 50), element.identificador, subcaracteristicas.texto)
        })
    });
    $(".dragable").draggable({
        opacity: 0.70,
        cursor: "move",
        helper: "original"
    });
    $(".caracteristica").droppable({
        drop: function (event, ui) {
            comparacion($(this).attr("data-identificador"), $(ui.draggable).attr("data-identificador"), ui.draggable, this)
        }
    });
    $(".card").tooltip({ show: { effect: "explode", duration: 500, delay: 700 }, position: { my: "left center", at: "right center" } });
});


function templateSubCaracteristica(nombre, identificador, colorFondo, zindex, identificadorPadre, tooltip) {
    let template = `<div class="card hoverable subCaracteristica dragable" title='${tooltip}' data-identificador=${identificadorPadre} style="background:${colorFondo};z-index:${zindex}">
<div class="front">
<h4> ${nombre}</h4> 
</div>

</div>`;
    $(identificador).append(template);
}


function comparacion(caracteristicaNumero, SubCaNumero, elementoDrag, elementoDrpp) {

    console.log(caracteristicaNumero, SubCaNumero);
    let estado = false;
    if (parseInt(caracteristicaNumero) === parseInt(SubCaNumero)) {
        estado = aciertos(elementoDrpp);
        activarEstrella(elementoDrpp);
    } else {
        estado = fallidos(elementoDrpp);
    }
    let TextoElementoDrag = $(elementoDrag).find("h4").text();
    $(elementoDrpp).find("ul.resultados").append(`<ol >${TextoElementoDrag}<i class="material-icons " style="color:${estado ? 'green' : 'red'}">${estado ? 'check' : 'close'}</i></ol>`);


    $(elementoDrag).remove();
}


function aciertos(elementoDrop) {
    elemnetoPositivo = $(elementoDrop).find("p.positivo");
    elemnetoPositivo.text(parseInt(elemnetoPositivo.text()) + 1);
    $("p.acierto strong").text((parseInt($("p.acierto strong").text()) + 1));
    $("#val1").val((parseInt($("p.acierto strong").text())));
    $("i#icon").html("mood");
    return true;

}


function fallidos(elementoDrop) {
    $(elementoDrop).find("p.negativo").text(parseInt($(elementoDrop).find("p.negativo").text()) + 1);
    $("p.fallido strong").text((parseInt($("p.fallido strong").text()) + 1));
    $("#val2").val((parseInt($("p.fallido strong").text())));
    $("i#icon").html("mood_bad");
    return false;
}


function activarEstrella(elementoDrag) {
    $(elementoDrag).find("i.start").animate({
        color: "yellow",
        fontSize: "+=2rem"
    }, {
        duration: 500,
        complete: function () {
            $(this).animate({ color: "black", fontSize: "2rem" });
        }
    });
}


function templateCaracteristica(nombre, identificador, colorFondo, identificadorPadre, tooltip) {

    let template = ` <div class="col s12 m3 " style="position:relative" >
    <div class="card small  hoverable caracteristica" title='${tooltip}' data-identificador=${identificadorPadre} style="background:${colorFondo}">
    <div class="card-content">
    <div class="row">
    <div class="col s10">
    <span class="card-title activator grey-text text-darken-4">${nombre}</span>
    </div>
    <div class="col s2">
    <i class="material-icons right start small">star_border</i>
    </div>
    </div>
    
                        
                    <div class="divider"></div>
                    <div class="re">
                    <ul class="resultados overflow">
    
                    </ul>
                    </div>
                    
                      
    </div>
    

    

<div id="resultado">
<p class="numero positivo" >0</p>
<p class="numero  negativo" >0</p>
</div>


    </div>`;
    $(identificador).append(template);
}