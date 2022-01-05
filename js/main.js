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
