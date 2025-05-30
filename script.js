document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "De onde vem a maioria dos alimentos frescos que você consome na cidade?",
            options: ["Do supermercado", "Da internet", "Do campo, cultivado por produtores rurais", "De fábricas"],
            answer: "Do campo, cultivado por produtores rurais"
        },
        {
            question: "Qual a importância da agricultura familiar para o abastecimento da cidade?",
            options: ["Não tem importância", "Produz apenas para o campo", "É responsável por grande parte dos alimentos que chegam às feiras e mercados", "Só produz para exportação"],
            answer: "É responsável por grande parte dos alimentos que chegam às feiras e mercados"
        },
        {
            question: "Como a tecnologia pode ajudar a conectar o campo e a cidade de forma sustentável?",
            options: ["Apenas com celulares", "Através de aplicativos que vendem produtos diretos do produtor", "Não há conexão tecnológica", "Só com máquinas grandes"],
            answer: "Através de aplicativos que vendem produtos diretos do produtor"
        },
        {
            question: "O que significa 'produção orgânica'?",
            options: ["Alimentos com aditivos químicos", "Alimentos cultivados sem agrotóxicos e respeitando o meio ambiente", "Alimentos produzidos em larga escala por máquinas", "Alimentos congelados"],
            answer: "Alimentos cultivados sem agrotóxicos e respeitando o meio ambiente"
        },
        {
            question: "Por que é importante valorizar o trabalho do agricultor?",
            options: ["Porque ele mora longe", "Porque ele nos fornece os alimentos que precisamos para viver", "Porque ele usa tratores grandes", "Porque ele só trabalha no sol"],
            answer: "Porque ele nos fornece os alimentos que precisamos para viver"
        },
        // Adicione mais perguntas aqui se desejar, como a sobre a água:
        {
            question: "Qual a importância da água vinda do campo para a vida na cidade?",
            options: ["Não tem relação", "Serve apenas para irrigação das plantações", "É essencial para o consumo humano, higiene e diversas atividades urbanas", "É usada só na indústria"],
            answer: "É essencial para o consumo humano, higiene e diversas atividades urbanas"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    // Novos elementos da capa
    const welcomeScreen = document.getElementById('welcome-screen');
    const startQuizButton = document.getElementById('start-quiz-button');
    const quizContainer = document.getElementById('quiz-container'); // O container principal do quiz

    const quizDiv = document.getElementById('quiz');
    const resultDiv = document.getElementById('result');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    const scoreText = document.getElementById('score-text');
    const messageText = document.getElementById('message-text');
    const restartButton = document.getElementById('restart-button');

    // Evento para iniciar o quiz
    startQuizButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none'; // Esconde a tela de boas-vindas
        quizContainer.style.display = 'block'; // Mostra o container principal do quiz
        loadQuestion(); // Inicia o carregamento da primeira pergunta
    });

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsContainer.innerHTML = '';
            selectedOption = null;

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button, option));
                optionsContainer.appendChild(button);
            });

            nextButton.style.display = 'block';
            nextButton.textContent = 'Próxima Pergunta';
            nextButton.disabled = true;

            Array.from(optionsContainer.children).forEach(btn => {
                btn.classList.remove('correct', 'incorrect', 'selected');
                btn.disabled = false;
            });

        } else {
            showResult();
        }
    }

    function selectOption(button, option) {
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }
        
        button.classList.add('selected');
        selectedOption = button;
        nextButton.disabled = false;
    }

    function checkAnswer() {
        if (!selectedOption) {
            return;
        }

        const userAnswer = selectedOption.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;

        Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

        if (userAnswer === correctAnswer) {
            score++;
            selectedOption.classList.remove('selected');
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.remove('selected');
            selectedOption.classList.add('incorrect');
            Array.from(optionsContainer.children).forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
    }

    nextButton.addEventListener('click', () => {
        checkAnswer();
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000); // Espera 1 segundo para ver o feedback
    });

    function showResult() {
        quizDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        scoreText.textContent = `Sua pontuação: ${score} de ${questions.length}`;

        let message = '';
        if (score === questions.length) {
            message = "Parabéns! Você é um expert na conexão Campo-Cidade! 🎉 Continue valorizando nossos produtores em Londrina e em todo o Paraná!";
        } else if (score >= questions.length / 2) {
            message = "Muito bem! Você entende a importância do campo para a cidade. Vamos juntos fortalecer essa conexão em nossa região! 🤝";
        } else {
            message = "Que bom que você participou! O campo é essencial para a nossa vida. Que tal aprender mais sobre essa conexão incrível que nos alimenta? 📚";
        }
        messageText.textContent = message;
    }

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultDiv.style.display = 'none';
        welcomeScreen.style.display = 'block'; // Volta para a tela de boas-vindas
    });

    // Removido: loadQuestion() aqui, pois agora ela é chamada pelo botão "Vamos Começar!"
});