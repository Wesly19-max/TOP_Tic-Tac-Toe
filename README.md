# Project:Tic Tac Toe

# Changes to add:
- [X] avoid another player overwriting the previous mark at certain cells that has already been marked by other player
- [X] win condition logic and message for vertical and 2 diagonal axes (managed to create a brute force solution)
- [X] disable the board when a player win is already declared
- [X] restart button mechanism. 
- [ ] allow players to type their names
- [ ] make ui beautiful
- [X] bug:active player changes when user clicked on marked cell - I added a conditional logic to check if the cell is empty or not so that it wont play a round which doesn't switch a player turn if it is not empty.
- [X] consider for a tie win condition logic -  I spent 2-3 hours doing this and the error was just a capitalization typo of 'textContent' lol
- [X] bugs in win condition logic - I reset the totalmatches variable to 1 aand add independent checks for every axis 