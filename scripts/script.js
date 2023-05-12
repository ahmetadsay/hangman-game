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
    const playAgain = document.querySelector('.play-again');
    const canvas = document.getElementById('hangmanCanvas');
  
    buttonsContainer.innerHTML = '';
    appearLetter.innerHTML = '';
    playAgain.innerHTML = ''; // Clear the content of playAgain element
  
    resetHangmanCanvas(canvas); // Reset the hangman canvas
    drawHangman(0); // Clear the hangman canvas completely
  
    fetchingData().then(word => {
      playGame(word);
    });
  }
  
  function drawHangman(parts) {
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    const hangmanParts = [
      // Base
      () => {
        context.moveTo(20, 180);
        context.lineTo(180, 180);
        context.stroke();
      },
      // Support
      () => {
        context.moveTo(70, 180);
        context.lineTo(70, 20);
        context.stroke();
      },
      // Rope
      () => {
        context.moveTo(70, 20);
        context.lineTo(150, 20);
        context.stroke();
      },
      // Head
      () => {
        context.beginPath();
        context.arc(150, 50, 30, 0, Math.PI * 2);
        context.stroke();
      },
      // Body
      () => {
        context.moveTo(150, 80);
        context.lineTo(150, 140);
        context.stroke();
      },
      // Left Arm
      () => {
        context.moveTo(150, 90);
        context.lineTo(120, 120);
        context.stroke();
      },
      // Right Arm
      () => {
        context.moveTo(150, 90);
        context.lineTo(180, 120);
        context.stroke();
      },
      // Left Leg
      () => {
        context.moveTo(150, 140);
        context.lineTo(130, 170);
        context.stroke();
      },
      // Right Leg
      () => {
        context.moveTo(150, 140);
        context.lineTo(170, 170);
        context.stroke();
      }
    ];
  
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw hangman parts based on the number of wrong guesses
    for (let i = 0; i < parts; i++) {
      hangmanParts[i]();
    }
  }
  
  function resetHangmanCanvas(canvas) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
  }
  
  function playGame(word) {
    const buttonsContainer = document.querySelector('.buttons-container');
    const appearLetter = document.querySelector('.appear-letter');
    const matchedLetters = Array(word.length).fill('_');
    const remainingRendered = document.querySelector('.remaining');
    let remainingRights = 10;
    remainingRendered.innerText = remainingRights;
    appearLetter.innerText = matchedLetters.join(' ');
  
    function handleWrongGuess() {
        remainingRights--;
        remainingRendered.innerText = remainingRights;
    
        if (remainingRights === 0) {
          appearLetter.innerText = 'GAME OVER!!';
          buttonsContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
          });
          showPlayAgainButton();
          drawHangman(8); // Draw complete hangman
        } else {
          drawHangman(10 - remainingRights); // Draw corresponding hangman part
        }
      }
    
      for (let i = 0; i < 26; i++) {
        let button = document.createElement('button');
        let letter = String.fromCharCode(65 + i);
        button.innerText = letter;
        button.addEventListener('click', function () {
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
          } else {
            handleWrongGuess();
            this.disabled = true; // Disable the button after a wrong guess
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
    
  