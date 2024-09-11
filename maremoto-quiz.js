const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
  location.reload(); // Recarrega a página inteira
});

const questions = [
  {
    question: "1. Qual é uma medida preventiva importante a ser tomada antes de um maremoto?",
    options: [
      "Ignorar avisos e continuar com a rotina normal.",
      "Desenvolver um plano de evacuação.",
      "Estacionar o carro em áreas baixas para facilitar a saída.",
    ],
    answer: 2, // O índice correto para a resposta "Mario" é 1
  },
  {
    question:
      "2. O que você deve incluir em seu kit de emergência antes de um maremoto?",
    options: [
      "Comida e água.",
      "Somente itens de valor e dinheiro.",
      "Itens essenciais como documentos importantes, medicamentos, comida, e água",
    ],
    answer: 3, // O índice correto para a resposta "Pac-Man" é 3
  },
  {
    question:
      "3.  Qual é a melhor prática em termos de localização antes de um maremoto?",
    options: [
      "Estar ciente das zonas de evacuação e evitar áreas baixas.",
      "Evitar construir casas em terrenos elevados.",
      "Morar perto da costa, estar perto do mar.",
    ],
    answer: 1, // O índice correto para a resposta "Call of Duty" é 0
  },
  {
    question: "4. Qual é a importância de saber nadar antes de um maremoto?",
    options: [
      "É crucial, pois aumenta as chances de sobrevivência. ",
      "Não há importância, pois a água é imprevisível.",
      "Apenas importante para crianças.",
    ],
    answer: 1, // O índice correto para a resposta "Minecraft" é 0
  },
  {
    question:
      "5. O que você deve fazer se estiver em uma área costeira durante um maremoto?",
    options: [
      "Ficar na praia e esperar ajuda.",
      "Procurar abrigo imediatamente em uma estrutura alta.",
      "Tentar nadar contra a corrente.",
    ],
    answer: 2, // O índice correto para a resposta "Mortal Kombat" é 1
  },
  {
    question:
      "6. O que você deve fazer se estiver dirigindo durante um maremoto?",
    options: [
      "Abandonar o veículo e buscar terreno elevado",
      "Parar o carro e esperar.",
      "Continuar dirigindo em direção à água para chegar em segurança.",
    ],
    answer: 1, // O índice correto para a resposta "Sonic the Hedgehog" é 0
  },
  {
    question:
      "7. O que deve ser feito se o alarme de incêndio disparar em um hotel?",
    options: [
      "Prestar os primeiros socorros, se possível, e chamar ajuda de especialistas.",
      "Ignorá-los e esperar socorristas.",
      "Levá-los para áreas seguras.",
    ],
    answer: 1, // O índice correto para a resposta "The Elder Scrolls V: Skyrim" é 0
  },
  {
    question: "8. Qual é a melhor prática em relação a estruturas danificadas após um maremoto?",
    options: [
      "Evitar entrar até que seja considerado seguro pelas autoridades.",
      "Entrar imediatamente para recuperar pertences.",
      "Derrubar as estruturas danificadas.",
    ],
    answer: 1, // O índice correto para a resposta "Uncharted" é 0
  },
  {
    question:
      "9. O que deve ser feito com alimentos expostos à água de maremoto?",
    options: [
      "Cozinhar bem antes de consumir.",
      "Descartar todos os alimentos que tiveram contato com a água.",
      "Consumir rapidamente.",
    ],
    answer: 2, // O índice correto para a resposta "DayZ" é 1
  },
  {
    question:
      "10. O que deve ser feito com roupas e utensílios domésticos molhados após um maremoto?",
    options: [
      "Usar normalmente.",
      "Descartar imediatamente.",
      "Limpar e desinfetar antes de usar.",
    ],
    answer: 3, // O índice correto para a resposta "Total War: Rome II" é 2
  },
  {
    question:
      "11. Qual é a prioridade ao retornar para casa após um maremoto?",
    options: [
      "Limpar a casa antes de qualquer coisa.",
      "Cozinhar uma refeição.",
      "Verificar se há danos estruturais e riscos de segurança.",
    ],
    answer: 3, // O índice correto para a resposta "Kirby" é 3
  },
  {
    question:
      "12. O que você deve fazer se encontrar fios elétricos caídos após um maremoto?",
    options: [
      "Evitar a área e reportar às autoridades.",
      "Tentar mover os fios com objetos de madeira.",
      "Ignorar e evitar a área. ",
    ],
    answer: 1, // O índice correto para a resposta "Hitman" é 0
  },
  {
    question:
      "13. O que você deve fazer em termos de saneamento após um maremoto?",
    options: [
      "Garantir que todas as fontes de água estejam seguras antes do uso.",
      "Evitar lavar roupas e utensílios.",
      "Usar água de enchente para limpar.",
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
