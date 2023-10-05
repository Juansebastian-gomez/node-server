const readline = require ("readline"); // estamos importanto el modulo "readline" en Node.js y permite la entrada de datos en el comando

const fs = require ("fs"); // estamos importando el modulo "fs" en Node.js permite interactuar con el sistema de archivos (leer y escribir archivos )

const rl = readline.createInterface({ //rl es un simple parametro (red line)

    input:process.stdin, //Esto especifica que la fuente de entrada será la entrada estándar (stdin), es decirl el rl esta esperando que ingresemos algo a la terminal

    output:process.stdout, //Esto especifica que la salida se enviará a la salida estándar (stdout), que es la terminal. Cuando rl necesita mostrar algo  en la terminal.
})  

let tasks = []; //El array está vacío cuando se ponen las llaves vacias []

function showtasks() {
    console.log("Lista de tareas:"); //Se define que siempre muestre la lista de tareas esté vacía o no
    tasks.forEach((task,index)=>{
        const status = task.completed ? "[x]": "[]"; //Se creo task.foreach para que el index recorra todas las tareas, y en el status ponga que la tarea se completó, el número de la tarea, y lo que se añadió en la tarea
        console.log(`${index+1}. ${status} ${task.description}`) //El $ muestra todo en una misma linea con los corchetes se define que es lo que quiero que muestre el +1 muestra un solo elemento, el status muestra el estado de la tarea, el task.description describe la tarea.
    }); //Index son cada uno de los elementos que están dentro de los array 

};

function addTask(description) {
    tasks.push({description,completed:false}); // este false representa un estado inicial, significa que no esta completada, se utiliza como parte de la logica. Además se agrega la descripción que queramos.
    saveTasks(); //Se creó un espacio de guardado para cuando se llene 
    console.log("Tarea añadida correctamente"); 
    saveTasks() //Vuelve y se guarda
}

function removeTask(index) {
    if(index >= 0 && index < tasks.lenght){
        tasks.splice(index,1); //splice remueve, editar, o agregar un index del array
       saveTasks();
       console.log("Tarea eliminada correctamente");

    }else{
        console.log("Tarea no encontrada");
    }
    showtasks();//showtasks me permite ver las tareas después de la ejecución de la función
    
}

function completeTask(index){
    if(index >= 0 && index < tasks.lenght){
        tasks[index].completed = true; //Las [] me buscan los elementos dentro del array
        saveTasks();
        console.log("La tarea se completó con exito");

    }else{
        console.log("La tarea no fue completada");
    }
    showtasks();

}
//  el null es un filtro de reemplazo opcional para modificar la forma en que se realiza el objeto
    //  JSON.stringify comvierte un objeto a javascript
    //  JSON.parse se usa para convertir una cadena JSON en un objeto JavaScript
    //No tiene parametro porque esta va tener es lo que nosotros agregamos
    // El "2" Es el número de espacio utilizado, para hacerlo también más legible.
function saveTasks(){
    fs.writeFileSync("tasks.json",JSON.stringify(tasks,null,2)); 

} 
//Se llaman a las tareas
// si el archivo 'tasks.json' existe, este bloque de código lo lee, lo convierte de JSON a un objeto de JavaScript y lo asigna a la variable tasks.
// Si el archivo no existe, la variable tasks probablemente conservará su valor anterior o será undefined.
// parse y el stringify hace compatible entre java y json


if(fs.existsSync("tasks.json")){
    tasks = JSON.parse(fs.readFileSync("tasks.json"))

    
}
 
rl.question("¿Qué acción deseas realizar?(add/remove/complete/exit): ",
(action)=>{
    if(action === "add"){
        rl.question("Escribe la descripción de la tarea: ",(description)=>{
            addTask(description);
            rl.close();
            
        })
    }else if(action === "remove"){
        showtasks();
        rl.question("Escribe el número de tarea que deseas eliminar: ",(index)=>{
            removeTask(index-1);
            rl.close();
            
        })
    }else if(action === "complete"){
        showtasks();
        rl.question("Escribe el número de tarea que deseas marcar como completada: ",(index)=>{
            completeTask(index-1);
            rl.close();
        })
    }else if(action === "exit"){
        rl.close();
    }else{
        console.log(" acción no válida, debes elegir entre: add, remove, complete o exit ");
        rl.close();
    }
}
)


