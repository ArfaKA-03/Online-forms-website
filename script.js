// Common Variables
let questionCounter = 0;
let questionCounter1 = 0;

// For option1.html: Add Question for MCQ or Detailed Answer
function addQuestion(event) {
    event.preventDefault();
    const questionType = document.getElementById('question-type').value;
    questionCounter++;

    const questionContainer = document.getElementById('questions-container');
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    questionCard.setAttribute('id', `question-${questionCounter}`);

    let questionHTML = `<h3>Question ${questionCounter}</h3>`;
    questionHTML += `<input type="text" placeholder="Enter your question" class="question-input" required>`;

    if (questionType === 'mcq') {
        questionHTML += `
            <div class="options">
                <input type="text" placeholder="Option 1" class="option-input" required>
                <input type="text" placeholder="Option 2" class="option-input" required>
                <input type="text" placeholder="Option 3" class="option-input">
                <input type="text" placeholder="Option 4" class="option-input">
            </div>
        `;
    } else if (questionType === 'detailed') {
        questionHTML += `<textarea placeholder="Detailed Answer" class="detailed-answer" required></textarea>`;
    }

    questionCard.innerHTML = questionHTML;
    questionContainer.appendChild(questionCard);
}

// For option1.html: Share Quiz
function shareQuiz() {
    const questions = document.querySelectorAll('.question-card');
    const quizData = [];

    questions.forEach((question) => {
        const questionText = question.querySelector('.question-input').value;
        const options = Array.from(question.querySelectorAll('.option-input')).map(input => input.value);
        const detailedAnswer = question.querySelector('.detailed-answer')?.value || '';

        quizData.push({
            question: questionText,
            options: options,
            detailedAnswer: detailedAnswer
        });
    });

    const quizLinkContainer = document.getElementById('quiz-link-container');
    quizLinkContainer.innerHTML = `<h2>Quiz Shared Successfully!</h2><pre>${JSON.stringify(quizData, null, 2)}</pre>`;
}

// Event Listeners for option1.html
if (document.querySelector('#quiz-form')) {
    document.querySelector('#add-question-btn').addEventListener('click', addQuestion);
    document.querySelector('#share-quiz-btn').addEventListener('click', shareQuiz);
}

// For option2.html: Add Field for Form Generator
const fieldsContainer = document.getElementById("fields-container");

function addField() {
    const fieldType = document.getElementById("field-type").value;

    // Check if the field already exists
    if (document.querySelector(`.field-${fieldType}`)) {
        alert(`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} field already added.`);
        return;
    }

    let fieldElement = document.createElement('div'); // Create a container for each field
    fieldElement.classList.add(`field-${fieldType}`); // Add a class to identify the field type

    switch (fieldType) {
        case 'name':
            fieldElement.innerHTML = '<input type="text" placeholder="Name" required>';
            break;
        case 'email':
            fieldElement.innerHTML = '<input type="email" placeholder="Email" required>';
            break;
        case 'phone':
            fieldElement.innerHTML = '<input type="tel" placeholder="Phone Number" required>';
            break;
        case 'address':
            fieldElement.innerHTML = '<input type="text" placeholder="Address" required>';
            break;
        default:
            break;
    }

    fieldsContainer.appendChild(fieldElement); // Append the new field to the container
}


// For option2.html: Share Form
function shareForm() {
    const formLinkContainer = document.getElementById("form-link-container");
    formLinkContainer.innerHTML = "Form link generated: <a href='#'>Copy Link</a>";
}

// Event Listeners for option2.html
if (document.querySelector('.add-btn')) {
    document.querySelector('.add-btn').addEventListener('click', addField);
    document.querySelector('.share-btn').addEventListener('click', shareForm);
}

// For option3.html: Custom Question Generator
function addQuestion3() {
    const questionText = document.getElementById('question-input').value;
    const answerType = document.getElementById('answer-type').value;
    if (!questionText) {
        alert('Please enter a question.');
        return;
    }

    questionCounter1++;
    const questionContainer1 = document.getElementById('questions-container');

    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    questionCard.innerHTML = `
        <h3>${questionText}</h3>
        <div class="options" id="options-${questionCounter1}"></div>
    `;

    switch (answerType) {
        case 'yesno':
            questionCard.querySelector('.options').innerHTML = `
                <label><input type="radio" name="q${questionCounter1}"> Yes</label>
                <label><input type="radio" name="q${questionCounter1}"> No</label>
            `;
            break;
        case 'goodbadbest':
            questionCard.querySelector('.options').innerHTML = `
                <label><input type="radio" name="q${questionCounter1}"> Good</label>
                <label><input type="radio" name="q${questionCounter1}"> Bad</label>
                <label><input type="radio" name="q${questionCounter1}"> Best</label>
            `;
            break;
    }

    questionContainer1.appendChild(questionCard);
}

// For option3.html: Share Quiz
function shareQuiz3() {
    const questions = document.querySelectorAll('.question-card');
    const quizData = [];

    questions.forEach((question) => {
        const questionText = question.querySelector('h3').innerText;
        const options = Array.from(question.querySelectorAll('.options input')).map(option => option.nextSibling.textContent);

        quizData.push({
            question: questionText,
            options: options
        });
    });

    const quizPreview = document.getElementById('quiz-preview');
    quizPreview.innerHTML = `<h2>Quiz Shared Successfully!</h2><pre>${JSON.stringify(quizData, null, 2)}</pre>`;
}

// Event Listeners for option3.html
if (document.querySelector('#add-question-btn') && document.querySelector('#share-quiz-btn')) {
    document.getElementById('add-question-btn').addEventListener('click', function(event) {
        event.preventDefault();
        addQuestion3();
    });
    document.getElementById('share-quiz-btn').addEventListener('click', function(event) {
        event.preventDefault();
        shareQuiz3();
    });
}
