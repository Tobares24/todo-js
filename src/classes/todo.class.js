
export class Todo {

    // Crear instrucción para crear un anueva instancia en base al local storage
    static fromJson({ id, tarea, completado, creado }) {

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        // Retorna la instancia
        return tempTodo;

    }

    constructor(tarea) {

        this.tarea = tarea;
        this.id = new Date().getTime(); // 12836873823
        this.completado = false;
        this.creado = new Date();
    }
}