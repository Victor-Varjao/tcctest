const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
  location.reload(); // Recarrega a página inteira
});

const questions = [
  {
    question: "1. O que você deve fazer se um furacão estiver se aproximando da sua área?",
    options: [
      "Ir para a praia para ver as ondas.",
      "Seguir as orientações das autoridades e evacuar, se necessário.",
      "Ficar em casa e esperar passar.",
    ],
    answer: 2, // O índice correto para a resposta "Mario" é 1
  },
  {
    question:
      "2. Qual é o melhor lugar para se abrigar durante um furacão?",
    options: [
      "No sótão da sua casa.",
      "Em uma tenda no jardim.",
      "Em um cômodo interno sem janelas.",
    ],
    answer: 3, // O índice correto para a resposta "Pac-Man" é 3
  },
  {
    question:
      "3. O que é preciso fazer com os móveis e objetos do lado de fora da sua casa antes da chegada do furacão?",
    options: [
      "Levar os móveis e objetos para dentro de casa.",
      "Deixar tudo no lugar.",
      "Vender todos.",
    ],
    answer: 1, // O índice correto para a resposta "Call of Duty" é 0
  },
  {
    question: "4. O que é essencial ter em um kit de emergência para um furacão?",
    options: [
      "Comida, água, medicamentos, lanternas e baterias. ",
      "Comida, fones de ouvido e itens escolares.",
      "Um guarda-chuva, capa de chuva e galochas.",
    ],
    answer: 1, // O índice correto para a resposta "Minecraft" é 0
  },
  {
    question:
      "5. Quando um furacão se aproxima qual é a melhor maneira de se manter informado?",
    options: [
      "Perguntar aos vizinhos e amigos.",
      "Assistir televisão e/ou informações de rádios para atualizações das autoridades.",
      "Usar as redes sociais para obter informações.",
    ],
    answer: 2, // O índice correto para a resposta "Mortal Kombat" é 1
  },
  {
    question:
      "6. O que você deve fazer com as janelas de sua casa antes de um furacão?",
    options: [
      "Fechar e trancar as janelas.",
      "Retirar todas as janelas para evitar que quebrem.",
      "Abrir todas as janelas para equilibrar a pressão.",
    ],
    answer: 1, // O índice correto para a resposta "Sonic the Hedgehog" é 0
  },
  {
    question:
      "7. Qual é a ação correta a tomar se você estiver dirigindo durante um furacão?",
    options: [
      "Estacionar em um local seguro e permanecer dentro do carro.",
      "Parar o carro embaixo de uma árvore.",
      "Ignorar o alarme e continuar o que está fazendo.",
    ],
    answer: 1, // O índice correto para a resposta "The Elder Scrolls V: Skyrim" é 0
  },
  {
    question: "8. Qual é o primeiro passo ao utilizar um extintor de incêndio?",
    options: [
      "Esperar que as autoridades confirmem que é seguro sair.",
      "Voltar à rotina normal de sempre.",
      "Sair imediatamente para ver os danos.",
    ],
    answer: 1, // O índice correto para a resposta "Uncharted" é 0
  },
  {
    question:
      "9. Qual é a melhor forma de lidar com alimentos perecíveis antes de um furacão?",
    options: [
      "Jogar fora todos os alimentos perecíveis.",
      "Colocar os alimentos perecíveis no freezer para mantê-los frios por mais tempo caso a energia acabe.",
      "Comer o máximo possível para evitar desperdício.",
    ],
    answer: 2, // O índice correto para a resposta "DayZ" é 1
  },
  {
    question:
      "10. O que você deve fazer com seus animais de estimação durante um furacão?",
    options: [
      "Deixar os animais do lado de fora para que possam se proteger sozinhos.",
      "Colocar os animais na garagem com comida e água.",
      "Levar os animais para um abrigo específico para pets ou mantê-los em um local seguro dentro de casa.",
    ],
    answer: 3, // O índice correto para a resposta "Total War: Rome II" é 2
  },
  {
    question:
      "11. Como você deve se comunicar com familiares e amigos durante um furacão?",
    options: [
      "Usar somente ligações telefônicas.",
      "Esperar até que a tempestade passe para se comunicar.",
      "Usar mensagens de texto ou aplicativos de mensagens, para evitar congestionamentos nas linhas telefônicas.",
    ],
    answer: 3, // O índice correto para a resposta "Kirby" é 3
  },
  {
    question:
      "12. O que você deve fazer com as árvores e galhos ao redor da sua casa antes de um furacão?",
    options: [
      "Podar galhos e remover árvores mortas ou doentes para evitar danos à propriedade.",
      "Deixar como estão para fornecer abrigo contra o vento.",
      "Amarrar os galhos com cordas para evitar que quebrem.",
    ],
    answer: 1, // O índice correto para a resposta "Hitman" é 0
  },
  {
    question:
      "13. Qual é a melhor maneira de se preparar para um possível corte de energia durante um furacão?",
    options: [
      "Adquirir um gerador e garantir que tenha combustível suficiente, além de ter lanternas e baterias extras. ",
      "Comprar velas e fósforos suficientes.",
      "Confiar que a energia voltará rapidamente.",
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
