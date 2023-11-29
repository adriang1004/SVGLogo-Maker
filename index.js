const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

function generateSVG(shape, text, textColor) {
    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shape.render()}
    <text x="150" y="109" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text></svg>`;
}

inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or hexadecimal for the text:',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or hexadecimal for the shape:',
      }
    ])
    .then(answers => {
      let shape;
      switch (answers.shape) {
        case 'circle':
          shape = new Circle(answers.shapeColor);
          break;
        case 'triangle':
          shape = new Triangle(answers.shapeColor);
          break;
        case 'square':
          shape = new Square(answers.shapeColor);
          break;
      }
    
      const svgContent = generateSVG(shape, answers.text, answers.textColor);
      fs.writeFile('./examples/logo.svg', svgContent, err => {
        if (err) {
          console.error('An error occurred:', err);
          return;
        }
        console.log('Generated logo.svg');
      });
    });