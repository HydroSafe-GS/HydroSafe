// Menu hamburguer
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".menu-mobile");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuOpen = !menuOpen;

  if (menuOpen) {
    mobileMenu.classList.add("show");
    menuBtn.innerHTML = "&times;";
  } else {
    mobileMenu.classList.remove("show");
    menuBtn.innerHTML = "&#9776;";
  }
});

// Trocar cor de fundo
function changeBackground(color) {
  document.body.style.backgroundColor = color;
}

////////////////
// SLIDE SHOW //
////////////////

let slideIndex = 0;
let timeout;

// Função para mostrar os slides automaticamente
function mostrarSlides() {
  const slides = document.getElementsByClassName("slide-fade");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  timeout = setTimeout(mostrarSlides, 5000); // Troca automática a cada 5 segundos
}

// Função para mudar manualmente os slides
function mudarSlide(n) {
  clearTimeout(timeout); // Para temporariamente o automático

  slideIndex += n;
  const slides = document.getElementsByClassName("slide-fade");

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

  timeout = setTimeout(mostrarSlides, 5000); // Retoma o automático
}

// Inicia o slideshow quando a página carrega
document.addEventListener("DOMContentLoaded", mostrarSlides);

///////////
// Quiz //
//////////

// Array de perguntas e respostas
const questions = [
  {
    text: "1. O que é uma enchente?",
    options: [
      "Seca prolongada",
      "Excesso de água em um local",
      "Falta de água",
      "Aumento da temperatura",
    ],
    correct: 1,
  },
  {
    text: "2. Uma das formas de auxiliar na prevenção de enchentes urbanas é:",
    options: [
      "Realizar o desmatamento de árvores",
      "Construir mais prédios",
      "Poluir rios, lagos e mares",
      "Descartar o lixo corretamente",
    ],
    correct: 3,
  },
  {
    text: "3. Durante uma enchente, é recomendado:",
    options: [
      "Buscar abrigo em locais altos ou seguros",
      "Atravessar correntezas",
      "Ficar em áreas baixas",
      "Nadar em águas poluídas",
    ],
    correct: 0,
  },
  {
    text: "4. Enchentes são mais comuns em:",
    options: [
      "Locais com bom sistema de drenagem",
      "Áreas urbanas com impermeabilização do solo",
      "Desertos",
      "Áreas urbanas sem planejamento",
    ],
    correct: 3,
  },
  {
    text: "5. Se você ver alguém preso em alguma enchente, deve:",
    options: [
      "Tentar resgatar a pessoa sem ajuda",
      "Chamar os serviços de emergência (Defesa Civil, Corpo de Bombeiros)",
      "Fazer nada",
      "Entrar na água para ajudar",
    ],
    correct: 1,
  },
  {
    text: "6. A impermeabilização do solo pode contribuir para:",
    options: [
      "Prevenir enchentes",
      "Reduzir chuvas",
      "Aumentar a poluição local",
      "Formar lagos naturais",
    ],
    correct: 0,
  },
  {
    text: "7. O que são bueiros?",
    options: [
      "Postes de luz",
      "Sistemas de alarme",
      "Ralos nas ruas para escoamento de água",
      "Equipamentos de resgate",
    ],
    correct: 2,
  },
  {
    text: "8. Qual região do Brasil é mais propensa a enchentes?",
    options: [
      "Região Norte",
      "Região Nordeste",
      "Região Centro-Oeste",
      "Região Sul",
    ],
    correct: 3,
  },
  {
    text: "9. Como a tecnologia pode ajudar na prevenção de enchentes?",
    options: [
      "Aumentando o consumo de energia",
      "Reduzindo o consumo de água",
      "Desligando sistemas de alerta",
      "Monitoramento de áreas de risco",
    ],
    correct: 3,
  },
  {
    text: "10. Qual é o principal objetivo da HydroSafe?",
    options: [
      "Fornecer água potável para familias afetadas por enchentes",
      "Monitorar áreas de risco e alertar sobre enchentes",
      "Construir barragens em rios",
      "Substituir os serviços da Defesa Civil",
    ],
    correct: 1,
  },
];

let currentQuestion = 0; // Questão atual
let userAnswers = new Array(questions.length).fill(null); // Array de respostas do usuário, inicializada com null

// Elementos do dom
const startBtn = document.querySelector(".start-btn");
const quizBox = document.querySelector(".quiz-box");
const questionText = document.querySelector(".question-text");
const answersContainer = document.querySelector(".answers-container");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const finishBtn = document.querySelector("#finish");

// Inicia o quiz
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  quizBox.classList.remove("hidden");
  quizBox.style.display = "flex";
  showQuestion();
});

// Exibe a questão atual e suas opções de resposta
function showQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.text;

  answersContainer.innerHTML = ""; // Limpas as alternativas anteriores

  question.options.forEach((option, index) => {
    const answerBtn = document.createElement("button"); // Cria o botão para as alternativas
    answerBtn.textContent = option;
    answerBtn.classList.add("option-btn");

    // Se o usuário já respondeu essa pergunta, marca a resposta selecionada anteriormente
    if (userAnswers[currentQuestion] === index) {
      answerBtn.classList.add("selected");
    }

    // Ao clicar na resposta, salva ela na lista de respostas do usuário
    answerBtn.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(answerBtn);
  });

  // Exibe e esconde os botões de navegação de acordo com a questão atual
  prevBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
  nextBtn.style.display =
    currentQuestion < questions.length - 1 ? "inline-block" : "none";
  finishBtn.classList.toggle("hidden", currentQuestion < questions.length - 1);
}

// Salva a resposta e exibe a próxima questão
function selectAnswer(index) {
  userAnswers[currentQuestion] = index;
  showQuestion();
}

// Botões de navegação
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

// Finaliza o quiz e exibe o resultado
finishBtn.addEventListener("click", () => {
  // Se ele não respondeu todas as perguntas, exibe um alerta
  if (userAnswers.includes(null)) {
    alert("Por favor, responda todas as perguntas antes de finalizar o quiz.");
    return;
  }
  // Calcula a pontuação final do usuário
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      score++;
    }
  });

  // Exibe a pontuação final
  quizBox.innerHTML = `
    <h3>Você acertou ${score} de ${questions.length} perguntas!</h3>
    <p>Parabéns por participar! Continue aprendendo sobre prevenção de enchentes.</p>
  `;
});

//////////////
// impactos///
/////////////

const impactos = document.querySelectorAll(".bola");

// Textos diferentes para cada bola
const textos = {
  "primeira-bola": "Notificações enviadas por app mantêm todos informados em tempo real.",
  "segunda-bola": "Buzina de emergência nas ruas: um sinal claro que pode salvar vidas.",
  "terceira-bola": "Defesa civil e agentes comunitários agem com base em dados e alertas locais.",
  "quarta-bola": "O sistema acompanha chuvas e rios 24h por dia, garantindo segurança contínua."
};

impactos.forEach((bola) => {
  const bolaClasse = Array.from(bola.classList).find(classe => classe.endsWith('-bola'));
  const titulo = bola.querySelector('h3'); // pega o título da bola

  bola.addEventListener("mouseenter", () => {
    // Esconde o título
    if (titulo) {
      titulo.style.display = "none";
    }
    // Cria e exibe o texto
    const texto = document.createElement("p");
    texto.textContent = textos[bolaClasse] || "Informação não disponível.";
    texto.classList.add("texto-hover");
    bola.appendChild(texto);
  });
  bola.addEventListener("mouseleave", () => {
    // Mostra o título de volta
    if (titulo) {
      titulo.style.display = "block";
    }
    // Remove o texto criado
    const texto = bola.querySelector(".texto-hover");
    if (texto) {
      bola.removeChild(texto);
    }
  });
  bola.addEventListener("click", () => {
    bola.classList.toggle("active");
  });
});





