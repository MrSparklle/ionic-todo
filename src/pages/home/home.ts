import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";
import { ArchiveTodosPage } from "../archive-todos/archive-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled:Boolean = false;
  public archiveTodosPage = ArchiveTodosPage;
  
  constructor(public navCtrl: NavController, private alertController: AlertController, private todoProvider: TodoProvider) {
    this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivePage() { //desativado (usado parametro archiveTodosPage é mais simples )
    this.navCtrl.push(ArchiveTodosPage);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: inputData=> {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText)
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
