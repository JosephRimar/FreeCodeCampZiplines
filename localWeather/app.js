console.log("allo :)");

//Gobal Variables...DOM objects
var cityTag = getEl('cityTag');
var conditionsTag = getEl('conditionsTag');
var temperatureTag = getEl('temperatureTag');
var hourlyForcast = getEl('hourlyForcastTag');
var weeklyForcast = getEl('weeklyForcastTag');
var mainWrapper = getEl('mainWrapper');
var smallWeatherDiv = getEl('smallWeather');
var bigWeatherDiv = getEl('bigWeather');
var exitButton = getEl("exitButton");
var dailySummaryRightTag = getEl('dailySummaryRight');

//Global variables to be used with onclick functions to change F-C
function Thermometer() {
	this.degree = "F";
	this.temperature = 0;
}

var thermometer = new Thermometer();
// var degree = "F";
// var temperature;

//Ajax request function
function getAjax() {
	var latitude;
	var longitude;
	var url;
	var windConditions;
	var hourlyForcastTagElements;

	// Get local info from ajax call
	$.get("http://ipinfo.io/", function(data) {
		console.log(data)
		//Latitude and longitude set from ipinfo.com
		latitude = data.loc.split(",")[0];
		longitude = data.loc.split(",")[1];
		
		//Populate cityTag with current location
		cityTag.innerHTML = data.city + ", " + data.region; 
		//Set url for ajax weather call
		url = "https://api.forecast.io/forecast/9fee182fc07504729932ea13a3a595b0/" + latitude +
		"," + longitude;


			//Get weather data from ajax call
			$.get(url, function(data) {
				var iconURl = "http://openweathermap.org/img/w/";
				//Set background image based on current conditions
				mainWrapper.style.backgroundImage = "linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5)), url(" + getBackground(data.currently.icon) + ")";
				
				//Set current temperature
				thermometer.temperature = parseInt(data.currently.temperature)

				//Set wind conditions
				if(data.currently.windSpeed > 15) {
					windConditions = "Windy";
				} else {
					windConditions = "Calm";
				}

				// Set Small Weather Divs Content
				smallWeatherDiv.innerHTML = "<h1>" + thermometer.temperature + "&deg" + "<h1>";
				smallWeatherDiv.innerHTML += "<p>" + data.currently.summary + "</p>";
				smallWeatherDiv.innerHTML += "<p>Feels Like: " + parseInt(data.currently.apparentTemperature) + "</p>";
				smallWeatherDiv.innerHTML += "<p>More >>></p>";


				//Set Big Weather Div Content
					//Current Info Div
					conditionsTag.innerHTML = data.currently.summary;
					getEl('windConditionsTag').innerHTML = windConditions;
					temperatureTag.innerHTML = thermometer.temperature;

					//Small Conditions Div
					getEl("smallConditionsTag").innerHTML = "<p>Today: " + getDayOfWeek() + "</p>";
					getEl("smallConditionsTag").innerHTML += "<p>" + parseInt(data.daily.data[0].temperatureMax) + " " + parseInt(data.daily.data[0].temperatureMin) + "</p>";

					//Hourly Forcast Tag
					data.hourly.data.forEach(function(e,i) {
						if(i < 25) {
							var newDiv = document.createElement("div");
							newDiv.className = 'hourlyForcast';

							if(i === 0) {
								newDiv.innerHTML = "<p>Now<p>"
							} else {
								newDiv.innerHTML = "<p>" + formatTime(e.time) + "</p>";
							}
							
							newDiv.innerHTML += "<p><img src=" + iconURl + getIcon(e.icon) + "></p>";
							newDiv.innerHTML += "<p>" + Math.round(e.temperature) + '</p>';
							
							hourlyForcastTag.appendChild(newDiv);
						}
					});

					//Weekly Forcast Tag
					data.daily.data.forEach(function(e) {
						var newDiv = document.createElement("div");
						newDiv.className = 'dailyWeather';

						newDiv.innerHTML = "<p>" + getDayOfWeek(e.time) + "</p>";
						newDiv.innerHTML += "<p><img src=" + iconURl + getIcon(e.icon) + "></p>";
						newDiv.innerHTML += "<p>" + parseInt(e.temperatureMax) + " " + parseInt(e.temperatureMin);

						weeklyForcastTag.appendChild(newDiv);
					});

					//Summary Tag
					getEl("summary").innerHTML = data.hourly.summary + " " + data.daily.summary;
					
					//Daily Summary Tag
					dailySummaryRightTag.innerHTML = "<p>" + formatTime(data.daily.data[0].sunriseTime, true) + "</p>";
					dailySummaryRightTag.innerHTML += "<p>" + formatTime(data.daily.data[0].sunsetTime, true) + "</p>";
					dailySummaryRightTag.innerHTML += "<p>" + (data.currently.precipProbability * 100) + "%</p>";
					dailySummaryRightTag.innerHTML += "<p>" + (data.currently.humidity * 100) + "%</p>";
					dailySummaryRightTag.innerHTML += "<p>" + data.currently.windSpeed + "</p>";
					dailySummaryRightTag.innerHTML += "<p>" + parseInt(data.currently.apparentTemperature) + "</p>";






				console.log(data.currently);
				console.log(data.hourly);
				console.log(data.daily);
			},"jsonp");
		}, "jsonp");
 }

//Call getAjax on load
 window.addEventListener("load", getAjax, false);

 //DOM onclick functions..................

//Change degrees (C/F)
temperatureTag.onclick = function() {
	if(degree === "F") {
		degree = "C"
	thermometer.temperature = Math.round((5/9) * (thermometer.temperature - 32));
	}
	else {
		degree = "F";
		thermometer.temperature = Math.round((thermometer.temperature * 9/5) + 32);
	}

	temperatureTag.innerHTML = thermometer.temperature + "&deg" + degree;
}



//Show more info by brining up Big Weather Div
smallWeatherDiv.onclick = function() {
	smallWeatherDiv.style.display = "none";
	bigWeatherDiv.style.display = "block";
	getEl('footer').style.display = "none";
}

//Show less info by hiding Big Weather Div
exitButton.onclick = function() {
	smallWeatherDiv.style.display = "block";
	bigWeatherDiv.style.display = "none";
	getEl('footer').style.display = "block";
}


//Helper functions..................
function getEl(el) {
	return document.getElementById(el);
}

//Format time from Unix time
	//If minutes are needed pass true for second parameter
		//If not needed leave blank
function formatTime(time, minNeeded) {
	var hours, min;
	var date = new Date(time * 1000);
	if(arguments.length == 1) {
		minNeeded = false;
	}
	hours = date.getHours();
	min = date.getMinutes();
	
		if(hours === 0) {
			if(minNeeded) {
				return "12:" + min + "AM";
			}
			return "12AM";
		}
		else if(hours < 12) {
			if(minNeeded) {
				return hours.toString() + ":" + min + "AM";
			}
			return hours.toString() + "AM";
		}
		else if(hours === 12) {
			if(minNeeded) {
				return hours.toString() + ":" + min + "PM";
			}
			return hours.toString() + "PM";
		}
		else {
			if(minNeeded) {
				return (hours - 12).toString() + ":" + min + "PM";
			}
			return (hours - 12).toString() + "PM";
		}
}

//Function to get the day of the week
//If needed for Unix time stamp pass in time as the parameter
//If needed for current day leave parameter empty
function getDayOfWeek(time) {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Satuday"];
	var d, x; 
	if(arguments.length < 1) {
		d = new Date();
		return days[d.getDay()];
	}
	else {
		x = new Date(time*1000);
		return days[x.getDay()];
	}
}

//Function to get the appropriate icon
	//Icons are hotlinked from Open Weather Map
function getIcon(data) {
	var icons = [
		{ 
			name : "sunny day",
			index : 0,
			pic : "01d.png"
		},
		{
			name : "clear night",
			index : 1,
			pic : "01n.png" 
		},
		{
			name : "partly Cloudy day",
			index : 2,
			pic : "02d.png"
		},
		{
			name: "partly cloudy night",
			index : 3,
			pic : "02n.png"
		},
		{
			name : "Cloudy day or night",
			index : 4,
			pic : "04d.png"
		},
		{
			name : "rainy day or night",
			index : 5,
			pic  : "09d.png"
		},
		{
			name : "thunderstorm",
			index : 6,
			pic : "11d.png"
		},
		{
			name : "snow",
			index : 7,
			pic : "13d.png"
		}
	]

	if(data === "clear-night") {
		return icons[1].pic;
	}
	else if(data === "rain") {
		return icons[5].pic;
	}
	else if(data === "snow" || data === "sleet") {
		return icons[7].pic;
	}
	else if(data === "cloudy") {
		return icons[4].pic;
	}
	else if(data === "partly-cloudy-day") {
		return icons[2].pic;
	}
	else if (data === "partly-cloudy-night") {
		return icons[3].pic;
	}
	else {
		return icons[0].pic;
	}
}

//Function to get background Image based on current conditions
function getBackground(data) {
	var sunnyDayImage = "https://lenslessness.files.wordpress.com/2014/01/a-cold-and-clear-day-by-the-sea.jpg";
	var rainyDayImage = "http://lovecourtxoxo.com/wp-content/uploads/2013/05/rainy-days-2.jpg";
	var clearNightImage = "https://asparkofmoonlight.files.wordpress.com/2012/12/moon-stars-and-clouds.jpg";
	var cloudyNightImage = "https://weavinglight.files.wordpress.com/2013/09/img_0667-1_1200.jpg";
	var cloudDayImage = "https://devonapixie.files.wordpress.com/2015/08/img_0890.jpg";
	var cloudyImage = 'https://s3.amazonaws.com/rapgenius/Overcast_skies_from_Tropical_Storm_Danny.jpg';
	var snowyDayImage = "http://s3-media4.fl.yelpcdn.com/bphoto/K6ucDigUgvDHpvL1HQELCA/o.jpg";

	//uses the icon data retrieved from Dark Sky Forcast
	if(data === "clear-night") {
		return clearNightImage;
	}
	else if(data === "rain") {
		return rainyDayImage;
	}
	else if(data === "snow" || data === "sleet") {
		return snowyDayImage;
	}
	else if(data === "cloudy") {
		return cloudyImage;
	}
	else if(data === "partly-cloudy-day") {
		return cloudDayImage;
	}
	else if (data === "partly-cloudy-night") {
		return cloudyNightImage;
	}
	else {
		return sunnyDayImage;
	}
}




