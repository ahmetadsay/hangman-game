const fetchingData = async () => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const responseData = await response.json();
    console.log(responseData[0]);
    return responseData[0];
  };
  
  function resetGame() {
    const buttonsContainer = document.querySelector('.buttons-container');
    const appearLetter = document.querySelector('.appear-letter');
    buttonsContainer.innerHTML = '';
    appearLetter.innerHTML = '';
    fetchingData().then(word => {
      playGame(word);
    });
  }
  
  function playGame(word) {
    const buttonsContainer = document.querySelector('.buttons-container');
    const appearLetter = document.querySelector('.appear-letter');
    const matchedLetters = Array(word.length).fill('_');
    const remainingRendered = document.querySelector('.remaining');
    let remainingRights = 10;
    remainingRendered.innerText = `You have ${remainingRights} rights`;
    appearLetter.innerText = matchedLetters.join(' ');
  
    for (let i = 0; i < 26; i++) {
      let button = document.createElement('button');
      let letter = String.fromCharCode(65 + i);
      button.innerText = letter;
      button.addEventListener('click', function() {
        const lowerWord = word.toLowerCase();
        const lowerLetter = letter.toLowerCase();
  
        if (lowerWord.includes(lowerLetter)) {
          for (let j = 0; j < lowerWord.length; j++) {
            if (lowerWord[j] === lowerLetter) {
              matchedLetters[j] = word[j];
            }
          }
  
          appearLetter.innerText = matchedLetters.join(' ');
  
          if (!matchedLetters.includes('_')) {
            appearLetter.innerText = 'Congrats! You win!';
            buttonsContainer.querySelectorAll('button').forEach(button => {
              button.disabled = true;
            });
            showPlayAgainButton();
          }
          
          button.disabled = true; // Disable the button
  
        } else {
          remainingRights--;
          remainingRendered.innerText = `You have ${remainingRights} rights`;
  
          if (remainingRights === 0) {
            appearLetter.innerText = 'GAME OVER!!';
            buttonsContainer.querySelectorAll('button').forEach(button => {
              button.disabled = true;
            });
            showPlayAgainButton();
          }
        }
      });
      buttonsContainer.appendChild(button);
    }
  }
  
  function showPlayAgainButton() {
    const playAgainButton = document.createElement('button');
    const playAgain = document.querySelector('.play-again');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.addEventListener('click', resetGame);
    playAgain.appendChild(playAgainButton);
  }
  
  fetchingData().then(word => {
    playGame(word);
  });
  