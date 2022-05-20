// Almacenar todas las tareas pendientes en una lista

import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        this.cargarLocalStorage();

    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        // Barrer los todos y regresamos un nuevo arreglo
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        // Recorre la lista
        for (const todo of this.todos) {
            // Condición para saber si el check seleccionado contiene el mismo id del arreglo
            if (todo.id == id) {
                // Lo selecciona como completado
                todo.completado = !todo.completado;
                // Guardar Local Storage
                this.guardarLocalStorage();
                // Detiene el for 
                break;
            }
        }

    }

    eliminarCompletados() {
        // Regresa todos los elementos no completados
        this.todos = this.todos.filter(todo => !todo.completado);
        // Llamar el local storage
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        // Salida: object Object / No se recupera estructura original
        // localStorage.setItem('todo', this.todos);
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {
        // Importante hacerlo así en local storage
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        // map nos permite barrer cada uno de los elementos dentro de un arreglo y retorna un nuevo arreglo con sus objetos mutados
        this.todos = this.todos.map(Todo.fromJson);
    }
}