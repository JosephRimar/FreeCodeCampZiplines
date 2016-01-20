console.log('Allo :)');

var increaseSession = getElem('increaseSession');
var decreaseSession = getElem('decreaseSession');
var increaseBreak = getElem('increaseBreak');
var decreaseBreak = getElem('decreaseBreak');
var breakLabel = getElem('breakLabel');
var sessionLabel = getElem('sessionLabel');
var timerText = getElem('timerText');
var mainTimer = getElem('mainTimerDiv');
var sessionTag = getElem('sessionTag');
var breakTag = getElem('breakTag');
var reset = getElem('Reset');
var initialSessionTime = 1500;
var initialBreakTime = 300;
var txtColor = "rgba(255,255,255,0.6)"

var timer = new Timer(initialSessionTime, initialBreakTime);
timer.drawTime();

breakLabel.innerHTML = Math.floor(initialBreakTime/60);
sessionLabel.innerHTML = Math.floor(initialSessionTime/60);

function Timer(sessionTime, breakTime) {
	var that = this;
	this.sessionTime = sessionTime;
	this.breakTime = breakTime;
	

	this.sessionMinutes = function() {
		return Math.floor(this.sessionTime / 60);
	}
	this.sessionSeconds = function() {
		return Math.floor(this.sessionTime % 60);
	}
	this.breakMinutes = function() {
		return Math.floor(this.breakTime / 60);
	}
	this.breakSeconds =  function() {
		return Math.floor(this.breakTime % 60);
	}
	this.sessionActive = true;
	this.breakActive = false;
	this.active = false;

	(this.increaseSession = function() {
		increaseSession.onclick = function() {
			if(initialSessionTime < 60*50) {
				initialSessionTime += 60;
				that.sessionTime += 60;
				that.updateSessionTime();

			}
		}
	}());

	(this.decreaseSession = function() {
		decreaseSession.onclick = function() {
			if(initialSessionTime > 60) {
				initialSessionTime -=60;
				that.sessionTime -= 60;
				that.updateSessionTime();
			}
		}
	}());

	(this.increaseBreak = function() {
		increaseBreak.onclick = function() {
			if(initialBreakTime < 60*50) {
				initialBreakTime += 60;
				that.breakTime += 60;
				that.updateBreakTime();
			}
		}
	}());

	(this.decreaseBreak = function() {
		decreaseBreak.onclick = function() {
			if(initialBreakTime >= 60) {
				initialBreakTime -=60;
				that.breakTime -= 60;
				that.updateBreakTime();
				
			}
		}
	}());

	(this.toggleActive = function() {
		mainTimer.onclick = function() {
			function changeClass(name) {
				if(that.sessionActive) 
					sessionTag.className = name;
				if(that.breakActive) {
					breakTag.className = name;
				}
			}
			
			if(that.active) { 
				changeClass('paused');
				timerText.style.color = 'rgba(0,0,0,.2)';
				that.active = false;
			} 
			else {
				that.active = true;
				changeClass("active");
			}
		}
	}());

	(this.reset = function() {
		reset.onclick = function() {
			document.location.reload();
		}
	}());

	this.updateSessionTime = function() {
		sessionLabel.innerHTML = Math.floor(initialSessionTime/60);
		if(that.sessionActive) {
			timerText.innerHTML = timeOutput(that.sessionMinutes.bind(that), that.sessionSeconds.bind(that));
		}
	}

	this.updateBreakTime = function() {
		breakLabel.innerHTML = Math.floor(initialBreakTime/60)
		if(that.breakActive) {
			timerText.innerHTML = timeOutput(that.breakMinutes.bind(that), that.breakSeconds.bind(that));
		}
	}

	this.drawTime = function() {
			timerText.innerHTML = timeOutput(that.sessionMinutes.bind(that), that.sessionSeconds.bind(that))
		};

	this.drawBreakTime = function() {
			timerText.innerHTML = timeOutput(that.breakMinutes.bind(that), that.breakSeconds.bind(that))
		};

	this.countdown = setInterval(function() {
		if(that.active) {
			if(that.sessionActive) {
				timerText.style.color = txtColor;
				sessionTag.className = "active";
				that.drawTime();
				if(that.sessionTime <= 0) {
					that.sessionActive = false;
					that.breakTime = initialBreakTime;
					that.breakActive = true;
					sessionTag.className = "inactive";
				}
				that.sessionTime--;
			}

			if(that.breakActive) {
				timerText.style.color = txtColor;
				breakTag.className = "active";
				that.drawBreakTime();
				if(that.breakTime <= 0) {
					that.breakActive = false;
					that.sessionTime = initialSessionTime;
					that.sessionActive = true;
					breakTag.className = 'inactive';
				}
				that.breakTime--;
			}
		}
	},1000)
}

function timeOutput(func1, func2) {
	if (func1() < 1) {
		timerText.style.color = 'orange';
		return func2();
		}
	else if(func2() < 10) {
		return func1() + ":0" + func2();
	} 
	else {
		return func1() + ":" + func2();
	}
}

function getElem(e) {
	return document.getElementById(e);
}

