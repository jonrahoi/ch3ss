This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Ch3ss

A 3D game of chess

[![](https://img.shields.io/badge/npm-v6.4.1-green)]
[![]]

*这么一长串实际上是 Markdown 里图片的语法，加超链接的语法组合成的* 

![图片的语法](https://img.shields.io/badge/ForgiveDB-HuiZ-brightgreen.svg) 

[超链接的语法](https://github.com/hui-z/ForgiveDB) 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


 list of methods to use
 game1: new Game(1);

********  moving: ***********
if (game1.isValidSpaceFromString(space from user input from textbox)) && game1.isValidSpaceFromString(space from user input from textbox))  {
  boolean value if move executed = game1.move(game1.getPositionFromString(input1), game1.getPositionFromString(input2));
}
if (boolean = false) {
  message to user "move invalid"
}
if (boolean = true) {
  if (game.getCheckMat()) {
    message to users : "checkmate, Player (whoever's turn it is wins)"
  }
  else if (game.getStalemate()) {
    message to users : "checkmate, Player (whoever's turn it is wins)"
  }
  else if (game.getCheck()) {
    message to users: "Check"
  }
}

******* getPossibleMoves for piece at space **********
get space from user text box
make sure it is a valid space
if (isValidSpaceFromString)
list of moves = game.getPossibleMovesForPieceAtSpace(input)


****** whoseTurnItIs *************
string for black or white = game.getWhoseTurnItIs();


******** move history *************
moves = game.getMoveHistory();
for (var i = 0; i < moveHistory.length; i++) {
  string space = moves[i].getPositionString();
  if (i % 4 == 0) {
    space A White
  }
  if (i % 4 == 1) {
    space B White
  }
  if (i % 4 == 2) {
    space A Black
  }
  if (i % 4 == 3) {
    space B Black
  }

}
