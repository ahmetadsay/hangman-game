const fetchingData = async () => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const responseData = await response.json();
    console.log(responseData[0])
    return responseData[0];
  };
  
  fetchingData().then(word => {
    const buttonsContainer = document.querySelector('.buttons-container');
    const appearLetter = document.querySelector('.appear-letter');
    const matchedLetters = Array(word.length).fill('_');
  
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
        }
      });
      buttonsContainer.appendChild(button);
    }
  });
  
  