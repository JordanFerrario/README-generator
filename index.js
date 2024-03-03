import inquirer from "inquirer";
import fs from "fs/promises";

const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description of your project:",
  },
  // add more questions here (i.e. installation, usage, etc.)
];

function generateReadme(answers) {
  // README content is generated using template literals
  // customize table of contents
  return `
    # ${answers.title}
    
    ## Description
    ${answers.description}
    
    ## Table of Contents
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)
    
    ## Installation
    ${answers.installation}

    ## Usage
    ${answers.usage}

    ## License
    ![License Badge](insert url for license badge)
    This project is licensed under the ${answers.license} license.

    ## Contributing
    ${answers.contributing}

    ## Tests
    ${answers.tests}

    ## Questions
    If you have any questions, please contact me at [${answers.email}](mailto:${answers.email}). Find more of my work at [${answers.github}](https://github.com/${answers.github}).
    `
    .replace(/^\s*[\r\n]/gm, "")
    .trim();
}

async function createReadme() {
  try {
    const answers = await inquirer.prompt(questions);
    const readmeContent = generateReadme(answers);
    await fs.writeFile("README.md", readmeContent);
    console.log("Successfully wrote README.md");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

createReadme();
