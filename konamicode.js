// Konami code in reverse
var succesfulCodeSequence = [65, 66, 39, 37, 39, 37, 40, 40, 38, 38]; 
var pressedKeys = [];

document.onkeydown = function(keyboardEvent) 
{
    // Debugging to get key code
    //console.log(keyboardEvent.keyCode);
    
    // Adds an element to the 0 spot in the array and shifts the other elements
	pressedKeys.unshift(keyboardEvent.keyCode); 
	
	// Keeps the array at length 10 by truncating the elements by
	// the length of the successful code sequence
	pressedKeys.length = succesfulCodeSequence.length;
	
	if (isValidCode()) 
	{
		alert("CONGRATULATIONS, YOU'RE A NERD.");
	}
};

	
function isValidCode() 
{
	for (var i = 0; i <= succesfulCodeSequence.length; i++)
	{
		if (succesfulCodeSequence[i] !== pressedKeys[i]) 
		{
			return false;
		}
	}
	
	return true;
}