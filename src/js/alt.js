/* eslint-disable no-restricted-syntax */

// UI
const quizBox     = document.getElementById('quiz');
const resultsBox  = document.getElementById('results');
const button      = document.getElementById('submit');

/**

Можно упростить себе задачу и не делать математику отката

1) Создать объект вопросов с ответами.
Каждому ответу соответствует определенная сумма очков
[
  {
    question: 'Кто сыграл Лору Палмер',
    answers: {
      a: ['Лора Линни', 0],
      b: ['Лина Хиди', 0],
      c: ['Шерил Ли', 15],
    },
  },
]
 */
const questions = [
  {
    question: 'Кто сыграл Лору Палмер',
    answers: {
      a: ['Лора Линни', 0],
      b: ['Лина Хиди', 0],
      c: ['Шерил Ли', 15],
    },
  },
];


/**
2) Создать переменную общего результата results с массивом результатов
по каждому вопросу
 */
const results = [];

/**

3) По клику на радиокнопке ответа:
  - сохранить очки в results
  - перейти к следующему вопросу
 */

/**
4) По клику на кнопке «Назад»:
- удалить последний элемент results
https://www.w3schools.com/jsref/jsref_pop.asp
 */

// Вопросы и ответы
const myQuestions = [
  {
    question: 'Who invented JavaScript?',
    answers: {
      a: 'Douglas Crockford',
      b: 'Sheryl Sandberg',
      c: 'Brendan Eich',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Which one of these is a JavaScript package manager?',
    answers: {
      a: 'Node.js',
      b: 'TypeScript',
      c: 'npm',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Which tool can you use to ensure code quality?',
    answers: {
      a: 'Angular',
      b: 'jQuery',
      c: 'RequireJS',
      d: 'ESLint',
    },
    correctAnswer: 'd',
  },
];

/**
 * Сборка разметки
 * @return  {sting}  HTML теста
 */
function buildQuiz() {
  // Переменная для HTML-разметки
  const output = [];

  // Для каждого вопроса...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      // Переменная для вариантов ответов
      const answers = [];

      // разметка для каждого возможного ответа...
      for (const key in currentQuestion.answers) {
        // защита for-in: https://eslint.org/docs/rules/guard-for-in
        if ({}.hasOwnProperty.call(currentQuestion.answers, key)) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${key}">
              ${key} :
              ${currentQuestion.answers[key]}
            </label>`,
          );
        }
      }

      // Добавить текущий вопрос и ответы в разметку
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`,
      );
    },
  );

  // Добавляем все вопросы и ответы в div#quiz
  quizBox.innerHTML = output.join('');
}

function showResults() {}

// Вызов функции разметки
buildQuiz();

// Нажми на кнопку и получишь результат
button.addEventListener('click', showResults);
