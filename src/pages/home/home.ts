import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  constructor(public navCtrl: NavController, private alertController: AlertController, private todoProvider: TodoProvider) {
    this.todos = this.todoProvider.getTodos();
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