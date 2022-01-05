let stateArray = []

function selectLevel() {
    let level = document.getElementById('level');
    let startButton = document.getElementById('startButton');
    if (level.value == '1') {
        startButton.disabled = true;
        startButton.classList.add('btn-outline-primary');
        startButton.classList.remove('btn-primary');
    } else {
        startButton.classList.add('btn-primary');
        startButton.classList.remove('btn-outline-primary');
        startButton.disabled = false;
    }
}

function start() {
    let startView = document.getElementById('startView');
    let mainView = document.getElementById('mainView');
    startView.classList.add('hidden');
    mainView.classList.remove('hidden');

    history.pushState(null, null);
    window.addEventListener('popstate', (() => {
        location.reload();
    }));

    init();
    let time = document.getElementById('time');
    let startTime = Date.now();
    setInterval(() => {
        let d = new Date(Date.now() - startTime);
        let m = String(d.getMinutes()).padStart(2, "0");
        let s = String(d.getSeconds()).padStart(2, "0");
        time.innerText = m + ':' + s;
    }, 100);
}

function init() {
    let level = document.getElementById('level');
    let table = document.getElementById('table');
    stateArray = [];
    table.innerHTML = null;
    for (let i = 0; i < Number(level.value); i++) {
        let childArray = [];
        for (let j = 0; j < Number(level.value); j++) {
            childArray.push(Math.floor(Math.random() * 2));
        }
        stateArray.push(childArray);
    }
    for (let i = 0; i < Number(level.value); i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < Number(level.value); j++) {
            let td = document.createElement('td');
            td.setAttribute('class', 'border border-3 border-dark');
            td.setAttribute('id', String(i) + String(j));
            if (stateArray[i][j] == 1) {
                td.classList.add('bg-primary');
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
