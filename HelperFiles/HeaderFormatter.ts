const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter string: ', (answer:string) => {
  console.log(CleanString(answer));
  rl.close();
});

function CleanString(input:string):string{
for (let i = 0; i < input.length; i++) {
	if (i == 0) { input = "\"" + input; }

	if (input[i] == '\n') {
		input = Insert(input,i + 1, "\"");
		input = Insert(input,i, "\"");
		i++;
		i++;
	}

	else if (input[i] == ':') {
		input = Insert(input,i + 2, "\"");
		input = Insert(input,i, "\"");
		i++;
		i++;
	}

	console.log(i);
}
return input;
}

function Insert(input:string,position:number,value:string):string{

	return input.slice(0,position) + value + input.slice(position,input.length);
}