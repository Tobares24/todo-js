import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

// Si es el único argumento quitar todo y hacerlo así
// Manera extensa -> todoList.todos.forEach(todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml);


