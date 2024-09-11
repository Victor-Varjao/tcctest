// Mostrar header1 no carregamento da página
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("header1").style.top = "0"; 
});

let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop) {
      // Rolagem para baixo
      document.getElementById("header1").style.top = "-100px"; 
      document.getElementById("header2").style.top = "0px"; 
  } else if (currentScroll < lastScrollTop) {
      // Rolagem para cima
      document.getElementById("header1").style.top = "0"; 
      document.getElementById("header2").style.top = "60px"; 
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
}, false);

function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    if (menu.classList.contains("w3-show")) {
        menu.classList.remove("w3-show");
    } else {
        menu.classList.add("w3-show");
    }
}

const titles = [
  ['Desastres Naturais', 'Terremotos', 'Maremotos'],
  ['Como Previnir', 'Dicas de Segurança', 'Evacuação'],
  ['Localizar Desastres', 'Recursos Emergênciais', 'Comunicar Riscos']
];

const texts = [
  [
    'Desastres naturais são eventos catastróficos causados por fenômenos naturais, como terremotos, furacões, enchentes, vulcões, secas e tsunamis, que resultam em grandes danos ao meio ambiente e comunidades humanas. ',
    'Os terremotos são movimentos bruscos e repentinos da crosta terrestre causados pela liberação de energia acumulada nas falhas geológicas. Eles ocorrem devido ao deslocamento das placas tectônicas que compõem a superfície da Terra. ',
    'Também conhecidos como tsunamis, são ondas gigantescas causadas por eventos subaquáticos, como terremotos. Essas ondas podem viajar a altas velocidades através dos oceanos e, ao se aproximarem da costa, aumentam de altura causando devastação. ',
  ],
  [
    'Realize inspeções e manutenções regulares em equipamentos de segurança, como extintores de incêndio e alarmes de fumaça. Sempre se mantenha informado. Controle o acesso a áreas sensíveis ou perigosas e mantenha essas áreas seguras.',
    'Informe sua localização e planos de viagem. Tenha um kit de emergência com água, alimentos não perecíveis, medicamentos e itens de primeiros socorros. Reforce janelas e portas, e tenha suprimentos suficientes para vários dias.',
    'Familiarize-se com as rotas de evacuação e pontos de encontro designados. Mantenha a calma, evite o pânico e inicie a evacuação imediatamente. Use ferramentas de alertas de emergência. Lembre-se de sempre manter uma comunicação clara.'
  ],
  [
    'Instale Kluster nosso aplicativo fornece notificações sobre desastres em tempo real. Siga perfis oficiais de órgãos de emergência e serviços de notícias nas redes sociais para receber atualizações rápidas.',
    'Rádio a pilha ou manivela para receber informações e alertas. Cópias de identidade, passaporte, certidões de nascimento, carteiras de saúde, apólices de seguro, etc. Mapas locais com rotas de evacuação destacadas.',
    'Certifique-se de que a mensagem seja consistente em todos os canais de comunicação. Forneça informações precisas e completas sobre os riscos, mesmo que a situação seja grave. Evite jargões técnicos e termos complexos.'
  ]
];


let currentIndexes = [0, 0, 0];

document.querySelectorAll('.next-icon').forEach((icon, index) => {
  icon.addEventListener('click', () => {
    const cardIndex = index % titles.length;
    currentIndexes[cardIndex] = (currentIndexes[cardIndex] + 1) % titles[cardIndex].length;
    icon.closest('.card').querySelector('.card-title').textContent = titles[cardIndex][currentIndexes[cardIndex]];
    icon.closest('.card').querySelector('.card-text').textContent = texts[cardIndex][currentIndexes[cardIndex]];
    icon.closest('.card').querySelector('.hover-text').textContent = hoverTexts[cardIndex][currentIndexes[cardIndex]];
  });
});


const slide = document.querySelector(".carousel-slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const images = document.querySelectorAll(".carousel-slide img");

let counter = 0;
const imagesPerSlide = 4; 
const slideWidth = slide.clientWidth / imagesPerSlide;
const totalImages = images.length;

function showImages() {
  slide.style.transition = "transform 0.5s ease-in-out";
  slide.style.transform = `translateX(${-counter * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  if (counter > totalImages - imagesPerSlide) {
    counter = 0;
  } else {
    counter += imagesPerSlide;
  }
  showImages();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) {
    counter = totalImages - imagesPerSlide;
  } else {
    counter -= imagesPerSlide;
  }
  showImages();
});

function autoSlide() {
  setInterval(() => {
    if (counter > totalImages - imagesPerSlide) {
      counter = 0;
    } else {
      counter += imagesPerSlide;
    }
    showImages();
  }, 5000);
}
autoSlide();

function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.faq-item .question');

  questions.forEach(function (question) {
    question.addEventListener('click', function () {
      const parent = this.parentElement;
      const answer = parent.querySelector('.answer');
      const isActive = parent.classList.contains('active');

    
      const active = document.querySelector('.faq-item.active');
      if (active) {
        active.classList.remove('active');
      }

   
      questions.forEach(function (q) {
        q.classList.remove('selected');
      });

 
      this.classList.add('selected');

 
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
});


document.querySelectorAll('.faq-item .question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});

document.getElementById('footer-toggle').addEventListener('click', function() {
    var footerContent = document.getElementById('footer-content');
    if (footerContent.style.display === 'none' || footerContent.style.display === '') {
        footerContent.style.display = 'block';
    } else {
        footerContent.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('#mobileMenu .w3-bar-item');
  const mobileMenu = document.getElementById('mobileMenu');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      mobileMenu.classList.remove('w3-show'); // Remove a classe que mostra o menu
      mobileMenu.classList.add('w3-hide'); // Adiciona a classe que oculta o menu
    });
  });
});
