//default regexList (for testing)
//var regexList = /(forever)|(call of duty)|(balls of steel)+/ig;
var regexList;
var specialReg = /([\(\)\.\^\$\"\?\*\+\[\]]|^[\(\)\.\^\$\"\?\*\+\[\]])/ig;

// Attempt to load filters from chrome and parse to regex string.
chrome.storage.sync.get({filters: 'justin, bieber, yolo, swag, anything you want, even multiple words!',}, function(items) 
{
	if(items.filters!="")
	{
		// Split what was in storage by commas OR by comma space.
		var temp1 = items.filters.split(/,\s|,/g);
		console.log(temp1);
		var temp2 = "";
		// Regex list constructor
		for(var i = 0; i < temp1.length; i++) // Iterate through what was split and append "(var)|"
		{
			var filter = temp1[i];//.replace(specialReg, ""); // Remove special characters.
			
			if(filter!=="") // Check for special blank filter case.
				temp2 += "\\b" + filter + "\\b";
			else
				temp2 += "\\b" + "a^" + "\\b";
			
			if(i<temp1.length-1)
			{
				temp2 += "|";
			}
		}
		console.log(temp2);
		regexList = new RegExp(temp2, "i");
	}
	else
	{
		regexList = /a^/; // Regex for 'no match'
	}
});
  
  
function findMatch(feed)
{
	//Loops through all child nodes of a parent
	Array.prototype.forEach.call(feed, function(parent) {
		Array.prototype.forEach.call(parent.childNodes, function(child) {

			var text = child.textContent;//.replace(specialReg, "");
			if(text.match(regexList)) //If text matches regex expression
			{
				topNode = child.parentNode; // Find the top element of the post
				while(topNode && !topNode.hasAttribute("data-dedupekey"))
				{
					topNode = topNode.parentNode;
				}
				
				if(topNode.style.display!='none')
				{
					console.log("Match!");
					topNode.style.display = 'none';
				}
			}
		});
	});
}



// Update var prevents the script from running indefinitely without any user input.
var update = 10;

window.onscroll = function()
{
	update = 10;
}

window.onfocus = function()
{
	update = 10;
}

window.setInterval(
function()
{
	if(update>0)
	{
		update--;
		console.log("Started..."); //Debug text to show code is running
		findMatch(document.getElementsByClassName('_5pbx userContent'));
		findMatch(document.getElementsByClassName('_6m3'));
		findMatch(document.getElementsByClassName('mtm plm _5pcm'));
		findMatch(document.getElementsByClassName('userContentWrapper'));
		findMatch(document.getElementsByClassName('pts pbm _50f6'));
	}
}, 1000);