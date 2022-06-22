// Global Variables
//Import inquirer and node modules
const { prompt } = require('inquirer');
const { writeFile } = require('fs');
const { promisify } = require('util');

//Import questions.js 
const questions = require('./Develop/utils/questions')

// Import interface.js
const generateREADME = require('./Develop/utils/interface')


// Wrap fs.writeFile inside util.promisify
const writeFileAsync = promisify(writeFile);


// Funcionts
// Inital message
console.log('Welcome to the Github README generator!');

//Create a function to prompt user questions
function promptUser() {
	return prompt(questions);
}

// Use async... await
async function init() {
	try {
    const answers = await promptUser();
    
    console.log(JSON.stringify(answers, null, '\t'));

		const readme = generateREADME(answers);

    await writeFileAsync('README.md', readme);

		console.log('The README file has been generated!');
	} catch (err) {
		console.log(err);
	}
}

init();
