const quizData = [
    {
      question: 'តើមានពណ៌ប៉ុន្មាននៅលើទង់ជាតិកម្ពុជា?',
      options: ['3', '5', '4', '6'],
      answer: '3',
    },
    {
      question: 'តើទង់ជាតិកម្ពុជាមានពណ៌អ្វីខ្លះ??',
      options: ['ពណ៏ខៀវ​​ ក្រហម ស', 'ពណ៏ក្រហម លឿង​​  ស', 'ពណ៏ក្រហម​​ ខៀវ លឿង​​ ', 'ពណ៏លឿង​​ ខ្មៅ ស'],
      answer: 'ពណ៏ខៀវ​​ ក្រហម ស',
    },
    {
      question: 'តើមួយណាជារូបិយប័ណ្ណខ្មែរ?',
      options: ['គីប','បាត','រៀល','ក្រូណា'],
      answer: 'រៀល',
    },
    {
      question: 'how many class we have this semtmer?',
      options: ['4 ',
      '5',
      '6',
      '7'],
      answer: '6',
    },
    {
      question: 'How far from PP to Siemp Reap?',
      options: ['347 km ',
      '300 km',
      '318.1 km',
      '234 km'],
      answer: '318.1 km',
    },
    {
      question: 'តើ​ព្យញ្ជនៈ និង​ស្រៈ​ខ្មែរ​មាន​ប៉ុន្មាន​ក្នុង​ភាសា​ខ្មែរ?',
      options: ['ព្យញ្ជនៈ​​ ​៣៣ ស្រៈ ២៤ ',
      'ព្យញ្ជនៈ ៣៥ ស្រៈ ២៣',
      'ព្យញ្ជនៈ ៣៣ តួ ស្រៈ ២៣',
      ' ព្យញ្ជនៈ ២៣  ស្រៈ​​៣៣'],
      answer: 'ព្យញ្ជនៈ ៣៣ តួ ស្រៈ ២៣',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();