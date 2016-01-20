console.log("allo :)")

var mainWrapper = document.getElementById("mainWrapper");

function getData() {
	var url = "http://www.freecodecamp.com/news/hot";
	//Ajax call
	$.get(url, function(data) {

		data.forEach(function(entry) {
			var myDiv = document.createElement("div");
			var picDiv = 	document.createElement("div");
				
				picDiv.style.backgroundImage = "url(" + entry.author.picture + ")";

				picDiv.className = "image";
				myDiv.className = "entry";
				myDiv.appendChild(picDiv);

				myDiv.innerHTML += "<p class='title'>" + formatString(entry.headline) + "</p>";
				myDiv.innerHTML += "<p class='author'>" + entry.author.username + "</p>";
				myDiv.innerHTML += "<p class='likes'>&#9829 " + entry.upVotes.length + "</p>";
				myDiv.innerHTML += "<p class='date'>" + formatDate(entry.timePosted) + "</p>";

				myDiv.onclick = function() {
					window.open(entry.link);
				}

				mainWrapper.appendChild(myDiv);		

		});
		

	});

}

//Helper functions
function formatString(str) {
	if(str.length > 20) {
		if(str[20] === " ") {
			return str.substring(0,19) + "...";
		}
		return str.substring(0,20) + "..."
	}

	return str;
}

function formatDate (time) {
	var myDate = new Date(time);
	var months = ["January", "February", "March", "April", "May", "June", 
	"July", "August", "September", "October", "November", "December"];
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return days[myDate.getDay()] + " " + months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear();
}


