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

    let time = document.getElementById('time');
    let startTime = Date.now();
    setInterval(() => {
        let d = new Date(Date.now() - startTime);
        let m = String(d.getMinutes()).padStart(2, "0");
        let s = String(d.getSeconds()).padStart(2, "0");
        time.innerText = m + ':' + s;
    }, 100);
}
