// Little helper file that converts the output of chrome's 
// network tool into a valid json

var fs = require('fs');

// Read in data
try {  
    var data = fs.readFileSync('file.txt', 'utf8');
    console.log(CleanString(data.toString()));    
} catch(e) {
    console.log('Error:', e.stack);
}

function CleanString(input:string):string{
for (let i = 0; i < input.length; i++) {

	// Insert quotes at start of key and end of value, and add a comma
	if (input[i] == '\n') {
		input = Insert(input,i + 1, "\"");
		input = Insert(input,i, "\",");

		// Move i to compensate for adding 2 more string elements
		i++;
		i++;
	}

	// Insert quote at end of key and start of value
	// Also checks to make sure we're not at the end of the string
	// otherwise next check will throw an outofbounds error
	else if (input[i] == ':' && i != input.length + 1) {
		// Makes sure next value after the colon is a space to stop quotation marks
		// being inserted into urls or similar elements
		if (input[i+1] == ' '){
		input = Insert(input,i + 2, "\"");
		input = Insert(input,i, "\"");

		// Move i to compensate for adding 2 more string elements
		i++;
		i++;
		}
	}

}
return "{\"" + input + "\"}";
}

// Returns a string containing the given value inserted at the given index of the input string 
function Insert(input:string,index:number,value:string):string{
	return input.slice(0,index) + value + input.slice(index,input.length);
}