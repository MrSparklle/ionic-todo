import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos() {
    return this.todos;
  }

  getArchivedTodos() {
    return this.archivedTodos;
  }

  archiveTodo(todoIndex) {
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1); // remove o todo do array
    this.archivedTodos.push(todoToBeArchived); // adiciona o todo excluido no array dos arquivados
  }

  addTodo (todo) {
    this.todos.push(todo);
  }

}
