// script.js
let questionCounter = 0;

function addQuestion() {
    const questionType = document.getElementById('question-type').value;
    const questionsContainer = document.getElementById('questions-container');
    questionCounter++;
    
    let questionHTML = `
        <div class="form-group" id="question-${questionCounter}">
            <label for="question-text-${questionCounter}">Question:</label>
            <input type="text" id="question-text-${questionCounter}" name="question-text-${questionCounter}" required>
    `;

    if (questionType === 'mcq') {
        questionHTML += `
            <label for="option1-${questionCounter}">Option 1:</label>
            <input type="text" id="option1-${questionCounter}" name="option-${questionCounter}" required>
            <label for="option2-${questionCounter}">Option 2:</label>
            <input type="text" id="option2-${questionCounter}" name="option-${questionCounter}" required>
            <label for="option3-${questionCounter}">Option 3:</label>
            <input type="text" id="option3-${questionCounter}" name="option-${questionCounter}">
            <label for="option4-${questionCounter}">Option 4:</label>
            <input type="text" id="option4-${questionCounter}" name="option-${questionCounter}">
            <label for="correct-answer-${questionCounter}">Correct Answer:</label>
            <input type="text" id="correct-answer-${questionCounter}" name="correct-answer-${questionCounter}" required>
        `;
    } else if (questionType === 'detailed') {
        questionHTML += `
            <label for="detailed-answer-${questionCounter}">Detailed Answer:</label>
            <textarea id="detailed-answer-${questionCounter}" name="detailed-answer-${questionCounter}" rows="4" required></textarea>
        `;
    }

    questionHTML += `</div>`;
    questionsContainer.innerHTML += questionHTML;
}

function submitQuiz() {
    const quizForm = document.getElementById('quiz-form');
    const formData = new FormData(quizForm);

    let quizData = [];
    for (let i = 1; i <= questionCounter; i++) {
        let question = formData.get(`question-text-${i}`);
        let correctAnswer = formData.get(`correct-answer-${i}`) || '';
        let options = [];

        if (correctAnswer) {
            for (let j = 1; j <= 4; j++) {
                let option = formData.get(`option${j}-${i}`);
                if (option) options.push(option);
            }
        } else {
            correctAnswer = formData.get(`detailed-answer-${i}`);
        }

        quizData.push({
            question,
            options,
            correctAnswer
        });
    }

    // Here you would typically send the quizData to a server to generate a shareable link.
    // For demonstration purposes, we'll just display the JSON data.
    const quizLinkContainer = document.getElementById('quiz-link-container');
    quizLinkContainer.innerHTML = `<pre>${JSON.stringify(quizData, null, 2)}</pre>`;
}

function displayAnswers(userAnswers, correctAnswers) {
    userAnswers.forEach((answer, index) => {
        console.log(`Question ${index + 1}: Your answer: ${answer}, Correct answer: ${correctAnswers[index]}`);
    });
}
