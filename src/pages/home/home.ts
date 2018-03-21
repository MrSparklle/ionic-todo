import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
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
  
  constructor(private toastController:ToastController, public navCtrl: NavController, private alertController: AlertController, private todoProvider: TodoProvider) {
    this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivePage() { //desativado (usado parametro archiveTodosPage é mais simples )
    this.navCtrl.push(ArchiveTodosPage);
    /* passando parametros entre as páginas 
    this.navCtrl.push(ArchiveTodosPage, {
      thing1: data1,
      thing2: data2
    });
    */
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
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });

          }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex) {
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: inputData=> {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(() => {
              let editTodoToast = this.toastController.create({
                message: "Todo Edited",
                duration: 2000
              });
              editTodoToast.present();
            });

          }
        }
      ]
    });
    editTodoAlert.present();
  }

}
