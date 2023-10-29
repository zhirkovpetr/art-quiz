import settingsScreen from "../../pages/Settings/settings.html";

class Settings {
  constructor() {
    this.target = document.querySelector('#root');
    this.screen = settingsScreen;
    this.target.innerHTML = this.screen;

    this.target.querySelector('.container').classList.add('animation');

    this.checkVolume = document.querySelector('.check_volume');
    this.valumeChecker = document.querySelector('.value_checker');
    this.checkTimer = document.querySelector('#check');
    this.timerChecker = document.querySelector('.progress_timer');


    if (localStorage.getItem('checkVolume') === "true") {
      this.checkVolume.checked = true;
    }

    if (localStorage.getItem('volumeChecker')) {
      this.valumeChecker.value = localStorage.getItem('volumeChecker');
    }

    if (!this.checkVolume.checked) {
      this.valumeChecker.disabled = true;
    }

    if (localStorage.getItem('checkTimer') === 'true') {
      this.checkTimer.checked = true;
    }

    if (localStorage.getItem('timerChecker')) {
      this.timerChecker.value = localStorage.getItem('timerChecker');
    }

    if (!this.checkTimer.checked) {
      this.timerChecker.disabled = true;
    }


    this.checkVolume.addEventListener('input', this.turnNotifyValue.bind(this));
    this.valumeChecker.addEventListener('input', this.changeVolume.bind(this));
    this.checkTimer.addEventListener('input', this.turnNotifyTimer.bind(this));
    this.timerChecker.addEventListener('input', this.changeTimer.bind(this));
  }

  turnNotifyValue() {
    if (this.valumeChecker.disabled) {
      this.valumeChecker.disabled = false;
    } else if (!this.valumeChecker.disabled) {
      this.valumeChecker.disabled = true;
    }
    if (!this.checkVolume.checked) {
      localStorage.setItem('volumeChecker', 0);
    }
    localStorage.setItem('checkVolume', this.checkVolume.checked);
  }

  changeVolume() {
    if (this.checkVolume.checked) {
      localStorage.setItem('volumeChecker', this.valumeChecker.value);
      this.valumeChecker.setAttribute('volumeChecker', localStorage.getItem('volumeChecker'));
    }
  }

  turnNotifyTimer() {
    if (this.timerChecker.disabled) {
      this.timerChecker.disabled = false;
    } else if (!this.timerChecker.disabled) {
      this.timerChecker.disabled = true;
    }
    if (!this.checkTimer.checked) {
      localStorage.setItem('timerChecker', 0);
    }
    localStorage.setItem('checkTimer', this.checkTimer.checked);
  }

  changeTimer() {
    if (this.checkTimer.checked) {
      localStorage.setItem('timerChecker', this.timerChecker.value);
      this.timerChecker.setAttribute('timerChecker', localStorage.getItem('timerChecker'));
    }
  }
}

export default Settings;
