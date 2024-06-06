const http = new coreHTTP;
const url = 'http://localhost:5500/list';
let theList = [];

const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");
const checkButton =  document.querySelector(".check-btn");

//Event Listeners
addButton.addEventListener("click", () => httpPost(input.value));
delButton.addEventListener("click", () => httpDelete(input.value));
checkButton.addEventListener("click", () => httpPut(input.value));

function ShowList() {
    let output = "";
    for (var itm of theList) {
        let li = '<li class="task-item';

        if(itm.completed){
            li += ' completed">';
        } else {
            li += ' incomplete">';
        }

        li += `${itm.name}</li>`;
        output += li;
    }
    result.innerHTML = output;

    // Add event listeners to toggle completion state
    document.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('completed');
            item.classList.toggle('incomplete');
        });
    });
}
async function GetTasks() {
    tasks = await http.get('/list');
    theList = tasks.task;
    ShowList();
}

async function NewTask(input) {
    await http.post('/list', {name: input});
}

async function UpdateTask(input) {
    await http.put('/list', {name: input});
}

async function DeleteTask(input) {
    await http.delete('/list', {name: input});
}

async function httpPost(input) {
    if(input) {
        await NewTask(input);
        await GetTasks();
    }
}

async function httpPut(input) {
    if(input) {
        await UpdateTask(input);
        await GetTasks();
    }
}

async function httpDelete(input) {
    if(input) {
        await DeleteTask(input);
        await GetTasks();
    }
}

function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();
  await GetTasks();
  addButton.disabled = false;
  delButton.disabled = false;
}

main();