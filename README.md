<h4 align="center">
    <br><img src="static/logo.png" alt="ArminC AutoExec"></a>
</h4>

<h4 align="center">SFU Open-source Development Club<br>Fall 2023 Project<br><br>Resume Evaluator Application using Naive Bayes Classifiers
    <div>
    <br>
        <a href=".">
          <img src="https://github.com/sfuosdev/swe-resume-evaluator/actions/workflows/node.js.yml/badge.svg"/>
        </a>
    <div>
</h4>

<p align="center">
  <a href="#credits">Credits</a> •
  <a href="#storybook">Storybook</a> •
  <a href="#testing">Testing</a> •
  <a href="#development-setup">Development Setup</a> •
  <a href="#production-setup">Production Setup</a>
</p>

<br><br>
The demo website is live at  
https://sfuswso.github.io/Macm316/

## Credits
### `Project Lead` Jusung Park [@Pentaminum](https://github.com/Pentaminum)

## Storybook
A Storybook server is provided to allow browsing the components used in this project.  
```
npm run storybook
```

## Testing
Run Jest and React-Testing-Library tests on React code.
```
npm run test
```

Run server-side API testing code.
```
cd server
npm run test
```

## Development Setup
In the development environment, you need to turn on both the React dev server and the Express.js server. The React dev server will listen on port 4000, while Express.js will listen on port 3000.

**Run React dev server**
```
npm start
```

**Run Express.js server**
```
cd server
npm start
```

**Navigate to `localhost:4000/` in your browser.**  


## Production Setup
For every merge event into the main branch, the workflow will create an Express.js bundle with an optimized build of the React app.
```
cd server
npm start
```
**Navigate to `localhost:3000/` in your browser.**  