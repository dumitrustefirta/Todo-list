const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const inputCount = document.getElementById('input-count');
const itemCount = document.getElementById('total');
const totalDoneCount = document.getElementById('total-done');

addButton.addEventListener('click', addItemToList);
addButton.addEventListener('click', handleItemCount);
todoList.addEventListener('click', handleItemClick);
todoList.addEventListener('click', handleItemCount);
todoList.addEventListener('change', handleItemTotalCount);
todoInput.addEventListener('keydown', handleInputCount);

function handleInputCount(event) {
    const count = event.target.value.length;

    if(count === 0) {
        inputCount.innerText = '';
        return;
    }

    inputCount.innerText = 'Characters count: ' + count;
}

function handleItemCount(event) {
    const listCount = todoList.childElementCount;

    if (listCount >= 1) {
       itemCount.innerText = 'Total items = ' + listCount;
    }
}

function handleItemTotalCount(event) {
    const checkedItems = this.querySelectorAll('input[type="checkbox"]:checked').length;

    totalDoneCount.innerText = 'Completed: ' + checkedItems;
}
// ??? cum de facut in procente??? completed/total

function handleItemClick(event) {
    if(event.target.dataset.action === 'remove') {
        event.target.closest('li').remove();
    }
    if(event.target.dataset.action === 'status') {
        event.target.closest('li').classList.toggle('complete');
     }
}

function addItemToList() {
    if(!todoInput.value) return;

    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');

    listItem.classList.add('todolist__item');
    //listItem.classList.add('complete');

    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('data-action', 'remove');
    listTextSpan.innerText = todoInput.value;
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.setAttribute('data-action', 'status');

    listItem.append(listCheckboxStatus)
    listItem.append(listTextSpan)
    listItem.append(listItemRemoveBtn)

    todoInput.value = '';
    inputCount.innerText = '';
    todoList.append(listItem);
}

/*const todos = document.getElementById('todo-input');
const value = listItem.value;
localStorage.setItem ('todos', JSON.stringify(value));*/