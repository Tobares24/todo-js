// Importaciones
import { Todo } from '../classes';
import { todoList } from '../index';

// Creación de los elementos  HTML

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Método que agrega la lista al html
export const crearTodoHtml = (todo) => {

    const htmlTodo =
        `<li class="${(todo.completado) ? 'completed' : ''} " data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


// Eventos
txtInput.addEventListener('keyup', (event) => {

    // Significa que el usuario presionó enter y valida strings vacíos
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        // Enviar el texto digitado a nuestra clase Todo
        const nuevoTodo = new Todo(txtInput.value);
        // Agregar el Todo a la lista con parámetro por refencia
        todoList.nuevoTodo(nuevoTodo);
        // Llamar al método crear todoHtml para insertarlo
        crearTodoHtml(nuevoTodo);
        // Borrar caja de texto
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    /**
     * event.target.localName
     * Nos permite identificar en qué elemento se hace click
     * 
     * event.target.parentElement
     * Devuelve el nodo del padre
     * 
     * getAttribute('atributo')
     * Obtiene cualquier atributo que deseemos
     * 
     * includes('elemento')
     * Nos retorna si el elemento incluye algo
     * 
     * classList.toggle()
     * Agrega o cambia las clases a la que deseamos
     */

    // Se obtiene el elemento clickeado
    const nombreElemento = event.target.localName;
    // Se obtiene el elemento padre
    const todoElemento = event.target.parentElement.parentElement;
    // Se obtiene el atributo id de la lista
    const todoId = todoElemento.getAttribute('data-id')

    // Marcar el todo completado por defecto
    if (nombreElemento.includes('input')) { // click en el check
        // ´Poner en true el completado de la lista
        todoList.marcarCompletado(todoId);
        // Marcar el check en el elemento html
        todoElemento.classList.toggle('completed')

    } else if (nombreElemento.includes('button')) { // Saber si el evento incluye el botón
        // Eliminar elemento seleccionado del arreglo
        todoList.eliminarTodo(todoId);
        // Eliminarlo del html
        divTodoList.removeChild(todoElemento);
    }
});

// Evento click del botón para borrar todos los seleccionados de la lista
btnBorrar.addEventListener('click', () => {
    // Se llama el método que cumple como función de borrar completados
    todoList.eliminarCompletados();
    // Eliminar elementos de abajo hacia arriba en el html
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        // Obtiene el elemento hijo seleccionado del html
        const elemento = divTodoList.children[i];

        // Valida que tenga la clase completed
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click', (event) => {
    // Almacenar filtro
    const filtro = event.target.text;

    // Si el filtro no existe retorna
    if (!filtro) { return; }

    // Barrer cada anchorTags para borrar la clase selected
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    // Aplicar filtro 
    for (const elemento of divTodoList.children) {

        // Quitar la clase hidden
        elemento.classList.remove('hidden');
        // Saber si el elemento actual está marcado
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});
