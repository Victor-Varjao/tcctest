const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
  location.reload(); // Recarrega a página inteira
});

const questions = [
  {
    question: "1. Qual é o primeiro passo ao detectar um incêndio em casa?",
    options: [
      "Apagar o fogo com qualquer líquido disponível.",
      "Sair do local imediatamente e acionar os bombeiros.",
      "Tentar encontrar a origem do incêndio antes de tomar qualquer ação.",
    ],
    answer: 2, // O índice correto para a resposta "Mario" é 1
  },
  {
    question:
      "2.  Qual é a principal ferramenta de combate ao fogo em um início de incêndio doméstico?",
    options: [
      "Mangueira de jardim.",
      "Balde de água.",
      "Extintor de incêndio. ",
    ],
    answer: 3, // O índice correto para a resposta "Pac-Man" é 3
  },
  {
    question:
      "3. Em um ambiente com muita fumaça, qual é a melhor maneira de se locomover para escapar?",
    options: [
      "Abaixar-se e rastejar para fugir.",
      "Correr o mais rápido possível para fora.",
      "Caminhar normalmente e tentar ventilar o ambiente.",
    ],
    answer: 1, // O índice correto para a resposta "Call of Duty" é 0
  },
  {
    question: "4. Se sua roupa pegar fogo, o que você deve fazer?",
    options: [
      "Parar, deitar e rolar no chão.",
      "Usar uma toalha para abanar o fogo.",
      "Correr para apagar o fogo.",
    ],
    answer: 1, // O índice correto para a resposta "Minecraft" é 0
  },
  {
    question:
      "5. Qual é o tipo de extintor mais adequado para apagar um incêndio em uma panela de óleo?",
    options: [
      "Extintor de CO₂ (gás carbônico).",
      "Extintor de pó químico.",
      "Extintor de água.",
    ],
    answer: 2, // O índice correto para a resposta "Mortal Kombat" é 1
  },
  {
    question:
      "6.Em caso de incêndio em um prédio, qual é o procedimento correto?",
    options: [
      "Usar as escadas e seguir para a saída de emergência.",
      "Usar o elevador para sair mais rápido.",
      "Esperar dentro de casa até que o incêndio seja controlado.",
    ],
    answer: 1, // O índice correto para a resposta "Sonic the Hedgehog" é 0
  },
  {
    question:
      "7. O que deve ser feito se o alarme de incêndio disparar em um hotel?",
    options: [
      "Descer as escadas imediatamente e seguir as orientações do plano de evacuação.",
      "Ligar para a recepção para confirmar se o alarme é real.",
      "Ignorar o alarme e continuar o que está fazendo.",
    ],
    answer: 1, // O índice correto para a resposta "The Elder Scrolls V: Skyrim" é 0
  },
  {
    question: "8. Qual é o primeiro passo ao utilizar um extintor de incêndio?",
    options: [
      "Remover o pino de segurança.",
      "Pressionar o gatilho imediatamente.",
      "Apontar o bico para o topo das chamas.",
    ],
    answer: 1, // O índice correto para a resposta "Uncharted" é 0
  },
  {
    question:
      "9. Qual é a forma correta de testar se uma porta está segura para ser aberta durante um incêndio?",
    options: [
      "Tocar na maçaneta com as mãos para sentir a temperatura.",
      "Tocar na parte superior da porta com as costas da mão.",
      "Colocar o ouvido na porta e ouvir o som do fogo.",
    ],
    answer: 2, // O índice correto para a resposta "DayZ" é 1
  },
  {
    question:
      "10. O que você nunca deve fazer ao tentar sair de um local em chamas?",
    options: [
      "Molhar um pano e cobrir o rosto para evitar a inalação de fumaça.",
      "Usar as escadas de emergência.",
      "Voltar para dentro para recuperar objetos pessoais.",
    ],
    answer: 3, // O índice correto para a resposta "Total War: Rome II" é 2
  },
  {
    question:
      "11. Qual é o procedimento correto ao estar preso em um quarto durante um incêndio?",
    options: [
      "Abrir as janelas para ventilar o ambiente.",
      "Tentar sair pela janela, mesmo se for muito alto.",
      "Fechar a porta, vedar as frestas e sinalizar para resgate.",
    ],
    answer: 3, // O índice correto para a resposta "Kirby" é 3
  },
  {
    question:
      "12. Qual é a principal causa de incêndios domésticos?",
    options: [
      "Fiação elétrica defeituosa.",
      "Chama de fogão deixada acesa.",
      "Brincadeiras com fogo.",
    ],
    answer: 1, // O índice correto para a resposta "Hitman" é 0
  },
  {
    question:
      "13. O que é mais perigoso em um incêndio?",
    options: [
      "A fumaça tóxica.",
      "As chamas em si.",
      "Os estalos da madeira queimando.",
    ],
    answer: 1, // O índice correto para a resposta "The Legend of Zelda: Breath of the Wild" é 0
  },
];

const quizContainer = document.getElementById("quiz-content");
const questionElement = document.getElementById("question");
const option1Element = document.getElementById("option1-label");
const option2Element = document.getElementById("option2-label");
const option3Element = document.getElementById("option3-label");
const submitButton = document.getElementById("submit-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");

let currentQuestion = 0;
let score = 0;
let timeRemaining = 120;
let timerInterval;

function showQuestion() {
  const currentQuestionObj = questions[currentQuestion];
  questionElement.textContent = currentQuestionObj.question;
  option1Element.textContent = currentQuestionObj.options[0];
  option2Element.textContent = currentQuestionObj.options[1];
  option3Element.textContent = currentQuestionObj.options[2];

  // Desmarcar todos os radio buttons
  const radioButtons = document.querySelectorAll('input[name="option"]');
  radioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Oops.. é preciso selecionar uma opção!");
    return;
  }

  const answer = parseInt(selectedOption.value);
  const correctAnswer = questions[currentQuestion].answer;

  if (answer === correctAnswer) {
    score++;
    selectedOption.parentElement.classList.add("correct");
    setTimeout(() => {
      selectedOption.parentElement.classList.remove("correct");
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  } else {
    selectedOption.parentElement.classList.add("incorrect");
    setTimeout(() => {
      selectedOption.parentElement.classList.remove("incorrect");
      const correctOption = document.querySelector(
        `input[value="${correctAnswer}"]`
      );
      correctOption.parentElement.classList.add("correct");
      setTimeout(() => {
        correctOption.parentElement.classList.remove("correct");
        currentQuestion++;

        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }, 1000);
    }, 1000);
  }
}

function calculateCorrectAnswers() {
  let correctCount = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].answer === questions[i].selected) {
      correctCount++;
    }
  }
  return correctCount;
}

function showScore() {
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = questions.length;

  quizContainer.style.display = "none";
  retryButton.style.display = "block";

  const scoreContainer = document.getElementById("score-container");
  scoreContainer.style.display = "block";
}

function endQuiz() {
  clearInterval(timerInterval);

  const correctAnswers = calculateCorrectAnswers();
  scoreElement.textContent = correctAnswers;

  showScore();
}

function countdownTimer() {
  if (timeRemaining === 0) {
    endQuiz();
  } else {
    timerElement.textContent = `Tempo restante: ${timeRemaining} segundos`;
    timeRemaining--;
  }
}

function startQuiz() {
  showQuestion();
  timerInterval = setInterval(countdownTimer, 1000);
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  timeRemaining = 60;
  quizContainer.style.display = "block";
  retryButton.style.display = "none";
  startQuiz();
}

submitButton.addEventListener("click", checkAnswer);
startQuiz();
