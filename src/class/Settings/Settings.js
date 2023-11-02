class Settings {
  constructor() {
    this.target = document.querySelector('#root');
    this.screen = `
        <div class='container'>
    <div class='logo logoSettings'></div>
    <h2 class='textSetts settingsMenu_text text_settings'>Settings</h2>
    <div class='settingsMenu'>
        <div class='settings_volume'>
            <div class='volume_label'></div>
            <div class='time_wrapper'>
                <div class='volume_wrapper'>
                    <button class='volume_label volume_label-second' title='Toggle sound'></button>
                    <input class='value_checker' id='value_checker' name='value-range' type='range' value='50' min='0' max='100' step='1'/>
                </div>
                <input class='check check_volume' id='check-volume' type='checkbox'>
                <label for='check-volume' class='label label-volume'></label>
                <h2 class='text text_label'>on/off</h2>
            </div>
            <h2 class='text text_bold'>volume</h2>
        </div>
        <div class='settings_time'>
            <div class='time_label'></div>
            <div class='time_wrapper'>
                <div class='input_wrapper'>
                    <input class='progress_timer' id='progress_timer' name='time-range' type='range' min='5' max='30' step='5' value='5'/>
                    <div class='text text_timer-value'>5</div>
                </div>
                <input class='check timer_checked' id='check' type='checkbox'>
                <label for='check' class='label'></label>
                <h2 class='text text_label'>on/off</h2>
            </div>
            <h2 class='text text_bold'>volume</h2>
        </div>
    </div>
    <div class='btnContainer'>
            <button class='return button button_return'>Return</button>
            <button class='save button button_save'>Save</button>
        </div>
</div>
        `;
    this.target.innerHTML = this.screen;
    this.target.querySelector('.container').classList.add('animation');
    this.checkVolume = document.querySelector('.check_volume');
    this.valumeChecker = document.querySelector('.value_checker');
    this.checkTimer = document.querySelector('#check');
    this.timerChecker = document.querySelector('.progress_timer');


    if (localStorage.getItem('checkVolume') === 'true') {
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
