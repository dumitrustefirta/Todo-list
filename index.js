const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const inputCount = document.getElementById('input-count');
const itemCount = document.getElementById('total');
const dateElement = document.getElementById('date');

let tempStorage = getTodosFromLocalStorage();
tempStorage === null ? tempStorage = [] : tempStorage;
setTodosToLocalStorage(tempStorage);

addButton.addEventListener('click', handleAddTodoItem);
addButton.addEventListener('click', handleItemCount);
todoList.addEventListener('click', handleItemClick);
todoList.addEventListener('click', handleItemCount);
todoList.addEventListener('change', handleItemTotalCount);
//todoInput.addEventListener('keydown', handleInputCount);

/* function handleInputCount(event) {
    const count = event.target.value.length;

    if (count === 0) {
        inputCount.innerText = '';
        return;
    }

    inputCount.innerText = 'Characters count: ' + count;
} */

function handleItemCount(event) {
    const listCount = todoList.childElementCount;

    if (listCount === 0) {
        itemCount.innerText = '';
        return;
    }
    itemCount.innerText = 'Total items = ' + listCount;
}

function handleItemTotalCount(event) {
    const totalDoneCount = document.getElementById('total-done');
    const checkedItems = this.querySelectorAll('input[type="checkbox"]:checked').length;

    if(checkedItems === 0) {
        totalDoneCount.innerText = '';
        return;
    }
    totalDoneCount.innerText = 'Completed: ' + checkedItems;
}
// ??? cum de facut in procente??? completed/total

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function handleItemClick(event) {
    let tempStorage = JSON.parse(localStorage.getItem('todos'));
    const itemId = parseInt(event.target.closest('li').dataset.todoid);
    let newStorageArray = [];
    if (event.target.dataset.action === 'remove') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) {
            if (itemId !==  tempStorage[i].id) {
                newStorageArray.push(tempStorage[i]);
            }
        }
        setTodosToLocalStorage(newStorageArray);
        event.target.closest('li').remove();
    }
    if (event.target.dataset.action === 'status') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) {
            if (itemId  === tempStorage[i].id) {
                tempStorage[i].status = !tempStorage[i].status;
            }
            newStorageArray.push(tempStorage[i]);
        }
        setTodosToLocalStorage(newStorageArray);
        event.target.closest('li').classList.toggle('complete');
    }
}

for (let i = 0; i < tempStorage.length; i++) {
    renderTodoItem(tempStorage[i].text, tempStorage[i].status, tempStorage[i].id);
}

function handleAddTodoItem() {
    let tempStorage = getTodosFromLocalStorage();
    let id = tempStorage.length;

    tempStorage.push({
        id: id,
        text: todoInput.value,
        status: false,
    })
    setTodosToLocalStorage(tempStorage);
    renderTodoItem(todoInput.value, false, id);
    todoInput.value = '';
    inputCount.innerText = '';
}

function renderTodoItem(text, status, id) {
    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');
    listItem.classList.add('todolist__item');
    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('data-action', 'remove');
    listTextSpan.innerText = text;
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.checked = status;
    if (status) {
        listItem.classList.add('complete');
    }
    listCheckboxStatus.setAttribute('data-action', 'status')

    listItem.append(listCheckboxStatus)
    listItem.append(listTextSpan)
    listItem.append(listItemRemoveBtn)
    listItem.setAttribute('data-todoid', id);
    todoList.append(listItem);
}

// Helper functions 

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'))
}
function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}