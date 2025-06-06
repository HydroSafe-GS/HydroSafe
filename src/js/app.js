
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


function changeBackground(color) {
  document.body.style.backgroundColor = color;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-contato")

  form.addEventListener("submit", function (e) {
    e.preventDefault() 


    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()
    const mensagem = document.getElementById("mensagem").value.trim()


    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.")
      return
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.")
      return
    }


    alert("Mensagem enviada com sucesso!")
    form.reset() 
  })
})

////////////////
// SLIDE SHOW //
////////////////

let slideIndex = 0;
let timeout;

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

  timeout = setTimeout(mostrarSlides, 5000); 
}

function mudarSlide(n) {
  clearTimeout(timeout); 

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

  timeout = setTimeout(mostrarSlides, 5000);
}

document.addEventListener("DOMContentLoaded", mostrarSlides);

///////////
// Quiz //
//////////

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

let currentQuestion = 0; 
let userAnswers = new Array(questions.length).fill(null); 

const startBtn = document.querySelector(".start-btn");
const quizBox = document.querySelector(".quiz-box");
const questionText = document.querySelector(".question-text");
const answersContainer = document.querySelector(".answers-container");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const finishBtn = document.querySelector("#finish");

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  quizBox.classList.remove("hidden");
  quizBox.style.display = "flex";
  showQuestion();
});

function showQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.text;

  answersContainer.innerHTML = ""; 

  question.options.forEach((option, index) => {
    const answerBtn = document.createElement("button"); 
    answerBtn.textContent = option;
    answerBtn.classList.add("option-btn");

    if (userAnswers[currentQuestion] === index) {
      answerBtn.classList.add("selected");
    }

    answerBtn.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(answerBtn);
  });

  prevBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
  nextBtn.style.display =
    currentQuestion < questions.length - 1 ? "inline-block" : "none";
  finishBtn.classList.toggle("hidden", currentQuestion < questions.length - 1);
}

function selectAnswer(index) {
  userAnswers[currentQuestion] = index;
  showQuestion();
}

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


finishBtn.addEventListener("click", () => {

  if (userAnswers.includes(null)) {
    alert("Por favor, responda todas as perguntas antes de finalizar o quiz.");
    return;
  }
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      score++;
    }
  });


  quizBox.innerHTML = `
    <h3>Você acertou ${score} de ${questions.length} perguntas!</h3>
    <p>Parabéns por participar! Continue aprendendo sobre prevenção de enchentes.</p>
  `;
});

//////////////
// impactos///
/////////////

const impactos = document.querySelectorAll(".bola");


const textos = {
  "primeira-bola": "Notificações enviadas por app mantêm todos informados em tempo real.",
  "segunda-bola": "Buzina de emergência nas ruas: um sinal claro que pode salvar vidas.",
  "terceira-bola": "Defesa civil e agentes comunitários agem com base em dados e alertas locais.",
  "quarta-bola": "O sistema acompanha chuvas e rios 24h por dia, garantindo segurança contínua."
};

impactos.forEach((bola) => {
  const bolaClasse = Array.from(bola.classList).find(classe => classe.endsWith('-bola'));
  const titulo = bola.querySelector('h3'); 

  bola.addEventListener("mouseenter", () => {

    if (titulo) {
      titulo.style.display = "none";
    }

    const texto = document.createElement("p");
    texto.textContent = textos[bolaClasse] || "Informação não disponível.";
    texto.classList.add("texto-hover");
    bola.appendChild(texto);
  });
  bola.addEventListener("mouseleave", () => {

    if (titulo) {
      titulo.style.display = "block";
    }

    const texto = bola.querySelector(".texto-hover");
    if (texto) {
      bola.removeChild(texto);
    }
  });
  bola.addEventListener("click", () => {
    bola.classList.toggle("active");
  });
});





