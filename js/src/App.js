// console.log("App.js is loaded.");
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    // console.log("App initialized.");
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // TodoListModelの状態が変更されたら表示を更新する
    this.todoListModel.onChange(() => {
      // todoをまとめるList表示
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      // console.log(todoItems);
      todoItems.forEach((item) => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数： ${this.todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら、新しいtodoItemModelを追加する
    // formElement.addEventListener("submit", function(event) {
    //   event.preventDefault();
    //   // 新しいTodoItemをTodoListへ追加する
    //   // console.log(this.todoListModel);
    //   this.todoListModel.addTodo(new TodoItemModel({
    //     title: inputElement.value,
    //     completed: false
    //   }));
    //   inputElement.value = "";
    // });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
