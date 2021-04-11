// ユニークなidを管理する変数
let todoIndex = 0;

export class TodoItemModel {
  /* 
  @param {string} title Todoアイテムのタイトル
  @param {boolean} completed Todoアイテムが完了ならばtrue、そうでない場合はfalse
  */
  constructor({ title, completed }) {
    this.id = todoIndex++;
    this.title = title;
    this.completed = completed;
  }
}
