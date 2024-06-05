document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = '';
                data.forEach(task => {
                    addTaskToDOM(task);
                });
            });
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task._id;
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        li.querySelector('.complete-btn').addEventListener('click', () => {
            toggleCompleteTask(task._id, !task.completed);
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task._id);
        });

        taskList.appendChild(li);
    }

    function addTask(task) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(data => {
                addTaskToDOM(data);
            });
    }

    function toggleCompleteTask(id, completed) {
        fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        })
            .then(() => {
                fetchTasks();
            });
    }

    function deleteTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchTasks();
            });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            addTask({ name: taskName, completed: false });
            taskInput.value = '';
        }
    });

    fetchTasks();
});
