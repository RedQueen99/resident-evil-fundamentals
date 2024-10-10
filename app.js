const questions = [
  {
    character: "Ada Wong",
    img: "https://pbs.twimg.com/media/E_G2bJIXoAY_1c5.jpg:large",
    questions: [
      { question: "What is Ada's last name?", options: ["Wong", "Redfield", "Kennedy", "Valentine"], answer: "Wong" },
      { question: "Which game did Ada first appear in?", options: ["RE2", "RE4", "RE1", "RE3"], answer: "RE2" },
      { question: "What is Ada's profession?", options: ["Spy", "Soldier", "Doctor", "Scientist"], answer: "Spy" },
      { question: "Who does Ada work for?", options: ["Umbrella", "The Government", "Wesker", "Unknown"], answer: "Unknown" },
      { question: "Which weapon is Ada known for using?", options: ["Grappling Hook", "Knife", "Sniper", "Shotgun"], answer: "Grappling Hook" }
    ]
  },
  {
    character: "Leon Kennedy",
    img: "https://preview.redd.it/what-would-a-leon-s-kennedy-build-look-like-v0-qewslcurnt7c1.jpg?width=640&crop=smart&auto=webp&s=ea332ad53ef2f7cf63f5bb06a81e8adc10dbb3f8",
    questions: [
      { question: "What is Leon's last name?", options: ["Kennedy", "Redfield", "Burton", "Wesker"], answer: "Kennedy" },
      { question: "Which game did Leon first appear in?", options: ["RE1", "RE2", "RE3", "RE4"], answer: "RE2" },
      { question: "What job did Leon have in RE2?", options: ["Police Officer", "Doctor", "FBI Agent", "Mercenary"], answer: "Police Officer" },
      { question: "Which character does Leon often partner with?", options: ["Claire", "Ada", "Chris", "Jill"], answer: "Ada" },
      { question: "What is Leon's iconic weapon?", options: ["Pistol", "Shotgun", "Grenade Launcher", "Rocket Launcher"], answer: "Pistol" }
    ]
  }
  // Add more characters as needed...
];

let currentQuestionIndex = 0;
let currentCharacterQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentCharacter = questions[currentQuestionIndex];
  const currentQuestion = currentCharacter.questions[currentCharacterQuestionIndex];
  const characterImage = document.getElementById('character-image');
  const questionText = document.getElementById('question');
  const optionsContainer = document.getElementById('options');

  // Error handling with try/catch if image fails to load
  try {
    characterImage.src = currentCharacter.img;
  } catch (error) {
    console.error("Failed to load character image", error);
    alert("Error loading image.");
  }

  questionText.textContent = currentQuestion.question;

  optionsContainer.innerHTML = '';

  // Use a `for` loop to dynamically create options
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => {
      checkAnswer(option);
    };
    optionsContainer.appendChild(button);
  }
}

function checkAnswer(selectedOption) {
  const currentCharacter = questions[currentQuestionIndex];
  const currentQuestion = currentCharacter.questions[currentCharacterQuestionIndex];
  const nextButton = document.getElementById('next-button');

  // Use switch statement to check the answer
  switch (selectedOption) {
    case currentQuestion.answer:
      score++;
      alert("Correct!");
      break;
    default:
      alert("Wrong answer!");
      break;
  }

  nextButton.disabled = false;
}

function nextQuestion() {
  const nextButton = document.getElementById('next-button');
  const currentCharacter = questions[currentQuestionIndex];

  if (currentCharacterQuestionIndex < currentCharacter.questions.length - 1) {
    currentCharacterQuestionIndex++;
  } else {
    currentCharacterQuestionIndex = 0;
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
      alert(`Quiz finished! Your score: ${score}/${questions.length * 5}`);
      return;
    }
  }

  nextButton.disabled = true;
  loadQuestion();
}

document.getElementById('next-button').addEventListener('click', nextQuestion);

// Initialize first question
loadQuestion();
