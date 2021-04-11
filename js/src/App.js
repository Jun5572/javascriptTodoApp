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
    this.todoListModel.onChange(function() {
      // todoをまとめるList表示
      const todoListElement = element`</ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      console.log(todoItems);
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数： ${this.TodoListModel.getTotalCount()}`;
    });

    // フォームを送信したら、新しいtodoItemModelを追加する
    formElement.addEventListener("submit", function(event) {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      // console.log(this.todoListModel);
      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    })
    /* // todoアイテム数
    let todoItemCount = 0;
    formElement.addEventListener("submit", function (event) {
      //submitイベントの本来の動作を止める
      event.preventDefault();
      // console.log(`input: ${inputElement.value}`);
      // 追加するTodoアイテムの要素(li要素)をさくせいする
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      // Todoアイテムをcontrainerに追加する
      containerElement.appendChild(todoItemElement);
      // Todoアイテム数を＋１し、表示されてるテキストを更新する
      todoItemCount += 1;
      todoItemCountElement.textContent = `ToDoアイテム数： ${todoItemCount}`;
      // 入力欄リセット
      inputElement.value = "";
    }); */
  }
}
