let stateArray = []
let position = '00';
let emoji = '';

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
    if (isSolved()) {
        init();
        return;
    }
    for (let i = 0; i < Number(level.value); i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < Number(level.value); j++) {
            let td = document.createElement('td');
            td.setAttribute('class', 'border border-3 border-dark');
            let div = document.createElement('div');
            div.setAttribute('class', 'mx-auto');
            div.setAttribute('style', 'width: 2em; height: 2em; font-size: 30px;');
            div.setAttribute('id', String(i) + String(j));
            td.appendChild(div);
            if (stateArray[i][j] == 1) {
                td.classList.add('bg-primary');
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    position = '00';
    let emojis = '😃 😁 😆 😂 😉 😗 😍 🤩 😋 😝 🤪 😇 🤔 🥱 🤨 🙄 🥺 😳 😵 😴'.split(' ');
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
    document.getElementById('00').innerText = emoji;
}

function isSolved() {
    if (!stateArray.some(a => a.includes(0)) || !stateArray.some(a => a.includes(1))) {
        return true;
    }
    return false;
}

function move(row, col) {
    let level = document.getElementById('level');
    let newPosition = String(Number(position.slice(0, 1)) + row) + String(Number(position.slice(1)) + col);
    if (newPosition.split('').includes('-') || newPosition.split('').includes(level.value)) {
        return;
    }
    let i = Number(newPosition.slice(0, 1));
    let j = Number(newPosition.slice(1));
    stateArray[i][j] = (stateArray[i][j] + 1) % 2
    document.getElementById(position).innerText = '';
    let newEl = document.getElementById(newPosition);
    newEl.innerText = emoji;
    newEl.parentNode.classList.toggle('bg-primary');
    position = newPosition;
    if (isSolved()) {
        finish();
    }
}

function finish() {
    let time = document.getElementById('time');
    let resultTime = document.getElementById('resultTime');
    resultTime.innerText += time.innerText;

    let level = document.getElementById('level');
    let resultLevel = document.getElementById('resultLevel');
    resultLevel.innerText += level.options[level.value].text;

    let twShare = document.getElementById('twShare');
    twShare.href += '塗り替えゲームをクリアしました！！%0A%0Aレベル： ' + resultLevel.innerText + '%0Aタイム： ' + resultTime.innerText + '%0A%0Aみんなも挑戦してみよう！！%0A#塗り替えゲーム%0A';

    let mainView = document.getElementById('mainView');
    let resultView = document.getElementById('resultView');
    mainView.classList.add('hidden');
    resultView.classList.remove('hidden');
}
