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
    message: "What is your project?",
  },
  {
    type: "input",
    name: "installation",
    message: "How do you install it?",
  },
  {
    type: "input",
    name: "usage",
    message: "How do you use it?",
  },
  {
    type: "list",
    name: "license",
    message: "Which license will you need?",
    choices: ["MIT", "Apache 2.0", "GPLv3", "BSD 3-Clause", "None"],
  },
  {
    type: "input",
    name: "contributing",
    message: "How would someone contribute to it?",
  },
  {
    type: "input",
    name: "tests",
    message:
      "Are there any tests for your project and if so, how do you run them?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
  // add more questions here
];

function generateReadme(answers) {
  // README content is generated using template literals
  // customize table of contents
  let licenseBadge = "";
  let licenseNotice = "";

  if (answers.license !== "None") {
    licenseBadge = `![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license.replace(/ /g, '_')}-blue.svg)`;
    licenseNotice = `This project is licensed under ${answers.license} license.`;
  }
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
    .replace(/^\s+/gm, "")
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
