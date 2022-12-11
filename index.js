// Si existe el local storage, lo carga en la variable reminders
// si no existe, crea un array vacío
if(localStorage.notas != null)
    var notas = JSON.parse(localStorage.getItem('notas'))
else
    var notas = [];


$(document).ready(function(){

    cargarTareas();

    var btn = $("#boton");
    var input = $("#texto");
    var div = $("#tareas");
    var borrarTodo = $("#borrarTodo");
    var tareasTotales = 0;
    var tareasCompletadas = 0;

    // Función que añade una tarea con enter
    btn.click(function(event){
        var fechaCreacion = new Date();

        var divs = $("<div id='tarea'><i class='fa-regular fa-circle' id='hecho'></i><h2>"+input.val()+"</h2><i class='fa-solid fa-ban' id='elimina'></i>"+"<br><h6>Prioridad: <button id='low' name='low' class='noselected'><i class='fa-solid fa-angle-down'></i>Low</button><button id='normal' name='normal' class='noselected'>Normal</button><button id='high' name='high' class='noselected'><i class='fa-solid fa-angle-up'></i>High</button>||  Añadido hace "+Math.floor(((Date.now() - fechaCreacion)/1000)/60)+" minutos</h6>"+"</div>");
        // div.append(divs);
        div.fadeIn("normal", function() {
            $(this).append(divs);
        });
        input.val("");
        event.preventDefault();
        tareasTotales++;
        actualizarTareas();
        // guardarTareas();
    });

    // borrar clickando en el icono
    div.on("click", "#elimina", function(){
        $(this).parent().fadeOut("normal", function() {
            $(this).remove()
        });
        tareasTotales--;
        actualizarTareas();
    });

    // marcar como hecho clickando en el icono
    div.on("click", "#hecho", function(){
        $(this).toggleClass("fa-circle fa-check-circle");
        $(this).siblings("h2").toggleClass("tachado");
        if($(this).hasClass("fa-regular fa-circle")){
            tareasCompletadas--;
            // Guardar en el local storage que la tarea está completada
            var index = $(this).parent().parent().index();
            reminders[index].completed = false;

            localStorage.reminders = JSON.stringify(reminders);
        }
        else if($(this).hasClass("fa-regular fa-check-circle")){
            tareasCompletadas++;
            // Guardar en el local storage que la tarea no está completada
            var index = $(this).parent().parent().index();
            reminders[index].completed = true;

            localStorage.reminders = JSON.stringify(reminders);
        }
        actualizarTareas();
    });

    // borrar todo
    borrarTodo.click(function(){
        div.empty();
        tareasTotales = 0;
        tareasCompletadas = 0;
        actualizarTareas();
        borrarTareas();
        notas = [];
    });

    // seleccionar prioridad
    div.on("click", "#low", function(){
        $(this).toggleClass("noselected selected");
        $(this).parent().siblings("#normal","#high").toggleClass("noselected selected");
    });
    div.on("click", "#normal", function(){
        $(this).toggleClass("noselected selected");
        $(this).parent().siblings("#low","#high").toggleClass("noselected selected");
    });
    div.on("click", "#high", function(){
        $(this).toggleClass("noselected selected");
        // cambiar clase de los otros botones
        $(this).parent().siblings("#low","#normal").toggleClass("noselected selected");
    });

    // mostrar tareas pendientes y totales que se actualiza automáticamente
    function actualizarTareas(){
        $("#tareas-pendientes").html(tareasTotales - tareasCompletadas);
        $("#tareas-totales").html(tareasTotales);
    }

    // cargar del local storage
    function cargarTareas(){
        var tareas = JSON.parse(localStorage.getItem("tareas"));
        if(tareas != null){
            for(var i = 0; i < tareas.length; i++){
                var divs = $("<div id='tarea'><i class='fa-regular fa-circle' id='hecho'></i><h2>"+tareas[i].texto+"</h2><i class='fa-solid fa-ban' id='elimina'></i>"+"<br><h6>Prioridad: <button id='low' name='low' class='noselected'><i class='fa-solid fa-angle-down'></i>Low</button><button id='normal' name='normal' class='noselected'>Normal</button><button id='high' name='high' class='noselected'><i class='fa-solid fa-angle-up'></i>High</button></h6>"+"</div>");
                div.append(divs);
                input.val("");
                // event.preventDefault();
                tareasTotales++;
                actualizarTareas();
            }
        }
    }

});