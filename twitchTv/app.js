console.log("allo :)");

var allStreamers = document.getElementById("allStreamers");
var onlineStreamers = document.getElementById("onlineStreamers");
var offlineStreamers = document.getElementById("offlineStreamers")
var showAll = document.getElementById("showAll");
var showOnline = document.getElementById("showOnline");
var showOffline = document.getElementById("showOffline");
var imageSrc = "http://vignette1.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/29/Tom-cruise-funny-face.png/revision/latest?cb=20130216121424";

var id = "?client_id=hglge7s2kly7qyjgv8gk43c0i0kc9ms?callback=";

var users = ["freecodecamp", "storbeck", "terakilobyte", "MedryBW", 
						"habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];


function getData() {					

	$.get("https://api.twitch.tv/kraken?", function(data) {
		// console.log(data)

		users.forEach(function(streamerId) {
			var myDiv = document.createElement("div");
			var myDiv2 = document.createElement('div');

			//Call to get user information
			$.getJSON(data._links.user + "s/" + streamerId +id, function(data) {
				// console.log(data)
				//Var to hold users profile photo 
				var image;
				//Check is user image exists
				if(data.logo !== null) {
					//...if so set image var to user image
					image = data.logo
				} else {
					//...if not set image var to default image
					image = imageSrc
				}
				myDiv.innerHTML = "<img src=" + image + " alt='no-image'>";
				myDiv.innerHTML += "<h4>" + data.display_name +"</h4>";


			});

			
			//Call to get online/offline status
			$.getJSON(data._links.streams +"/" + streamerId + id, function(data) {
				console.log(data)

				//if stream is online
				if(data.stream !== null) {
					myDiv.className = "streamer online";
					myDiv.innerHTML += "<h3>&#9989</h3>"
					myDiv.innerHTML += "<p>" + shortString(data.stream.channel.status) +"</p>"

					//Add myDiv to online streamers div
					onlineStreamers.appendChild(myDiv);
					//if stream is offline
				} else {
					myDiv.innerHTML += "<h3>&#10060</h3>"
					myDiv.className = "streamer offline";
					// console.log(data);
					//Add myDiv to offline streamers div
					offlineStreamers.appendChild(myDiv);
				}
				myDiv2.innerHTML = myDiv.innerHTML;
				myDiv2.className = "streamer"
			})
			//Add myDiv to all streamers div
			allStreamers.appendChild(myDiv2);

			myDiv.onclick = function() {
				var url = "http://www.twitch.tv/";
				window.open(url + streamerId);
			}
			myDiv2.onclick = function() {
				var url = "http://www.twitch.tv/";
				window.open(url + streamerId);
			}
		})//...end forEach function

	},"json");//..end json request
}

//Onlick handlers to show different divs
showAll.onclick = function() {
	offlineStreamers.style.display = "none";
	onlineStreamers.style.display = "none";
	allStreamers.style.display = "block";
	showAll.className = "statusTitle active";
	showOnline.className = "statusTitle inactive";
	showOffline.className = "statusTitle inactive";
}

showOnline.onclick = function() {
	offlineStreamers.style.display = "none";
	allStreamers.style.display = "none";
	onlineStreamers.style.display = "block";
	showAll.className = "statusTitle inactive";
	showOnline.className = "statusTitle active";
	showOffline.className = "statusTitle inactive";
}

showOffline.onclick = function() {
	allStreamers.style.display = "none";
	onlineStreamers.style.display = "none";
	offlineStreamers.style.display = "block";
	showAll.className = "statusTitle inactive";
	showOnline.className = "statusTitle inactive";
	showOffline.className = "statusTitle active";
}



function shortString(str) {
	if(str.length > 30) {
		return str.substring(0, 30) + "...";
	}
	return str;
}

window.addEventListener('load', getData, false);

function me(str) {
	console.log(str)
}

