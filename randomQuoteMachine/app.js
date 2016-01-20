

var quoteLibrary = [
							{
 								quote: "Every good product I've ever seen is because a group of people cared deeply about making something wonderful that they and their friends wanted. They wanted to use it themselves.",
								author : "Steve Jobs (1955 - 2011), Apple WWDC Closing Keynote, 1997"
							},	
							{ quote: "Remember that nobody will ever get ahead of you as long as he is kicking you in the seat of the pants.",
								author : "Walter Winchell (1897 - 1972)"
							},
							{ quote: "Getting ahead in a difficult profession requires avid faith in yourself. That is why some people with mediocre talent, but with great inner drive, go much further than people with vastly superior talent.",
								author : "Sophia Loren (1934 - )"
							},
							{ quote: "Everyone in the world was programmed by the place they were born, hemmed in by their beliefs, but you had to at least try to grow your own brain.",
								author : "Scott Westerfeld, Pretties, 2005"
							}, 
							{
 								quote: "When you're a team of one, you're always captain.",
								author : "Takayuki Ikkaku, Arisa Hosaka and Toshihiro Kawabata, Animal Crossing: Wild World, 2005"
							},
							{
 								quote: "I think wholeness comes from living your life consciously during the day and then exploring your inner life or unconscious at night.",
								author : "Margery Cuyler"
							},
							{
 								quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
								author : "Thomas A. Edison (1847 - 1931)"
							},
							{
 								quote: "When I step into this library, I cannot understand why I ever step out of it.",
								author : "Marie de Sevigne, O Magazine, December 2003 "
							},
							{
 								quote: "It hurts to find out that what you wanted doesn't match what you dreamed it would be.",
								author : "Randy K. Milholland, Something Positive Comic, 09-07-04 "
							},
							{
 								quote: "I don't think there is a proper way to celebrate something which makes you happy.",
								author : "Matthew Oliphant, Usability Works, 04-01-2006"
							},
							{
 								quote: "Be brief, for no discourse can please when too long.",
								author : "Miguel de Cervantes (1547 - 1616)"
							},
							{
 								quote: "When one loses the deep intimate relationship with nature, then temples, mosques and churches become important.",
								author : "Krishnamurti, Beginnings of Learning"
							},
							{
 								quote: "No fear. No distractions. The ability to let that which does not matter truly slide.",
								author : "Chuck Palahniuk (1962 - ), Fight Club, 1996"
							}
						];
var quoteButton = getElem("quoteButton");
var flickrButton = getElem('flickrButton');
var quoteArea = getElem('quote');
var authorArea = getElem('author');
var tweetButton = getElem('tweetButton');

function getRandomIndex(array) {
	return Math.floor(Math.random() * array.length);
}

function getElem(element) {
	return document.getElementById(element);
} 

function clicked() {
	var random = getRandomIndex(quoteLibrary);
	quoteButton.innerHTML = "Getting..."
	window.setTimeout(function() {
		quoteArea.innerHTML = quoteLibrary[random].quote;
		authorArea.innerHTML = quoteLibrary[random].author;
		quoteButton.innerHTML = "New Quote";
	}, 250);
}


	


tweetButton.onclick = function() {
	window.open("https://twitter.com/intent/tweet?text="+quote.innerHTML +" - " + author.innerHTML);
}

function getFlickrPhotos() {
	var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
	var tags = {
			tags: "quotes",
			format: "json"
		};
	flickrButton.innerHTML = "Getting...";
	$.getJSON(flickrAPI, tags, function(data) {
		var flickrPhoto = getElem("flickrPhoto");
		var photoHTML = '<img src="'+ data.items[getRandomIndex(data.items)].media.m +'"class="photoFeed"></a>'
		
		window.setTimeout(function() {
			flickrPhoto.style.display="block";
			flickrPhoto.innerHTML = photoHTML;
			flickrButton.innerHTML = "See More Quotes";
		},250);
	});
}

function showFlickr() {
	getElem('flickrWrap').style.display = "block";
	getElem('quoteWrapper').style.display = "none";
	getElem('showFlickr').className = "headerButtons selected";
	getElem('showQuotes').className = 'headerButtons unselected';
}
function showQuotes() {
	getElem('flickrWrap').style.display = "none";
	getElem('quoteWrapper').style.display = "block";
	getElem('showFlickr').className = "headerButtons unselected";
	getElem('showQuotes').className = 'headerButtons selected';
}

getElem("quotationsPage").onclick = function() {
  window.open("http://www.quotationspage.com")
}

window.addEventListener("load", clicked);



