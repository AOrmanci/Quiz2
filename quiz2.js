const CHOICESS = ["A", "B", "C", "D"];
let QUESTİON = [];
let activeQuestionIndex = 0,
    questionsCount = 0,
    selectedAnswer,
    totalCorrectChoice = 0;
const quizModalEl = document.querySelector(".quiz_modal");
const getQuestions = () => {
    fetch("./quiz2sorular.json")
        .then((res) => {
            return res.json();
        })
        .then((questions) => {
            QUESTİON = questions;
            questionsCount = QUESTİON.length;
        });
};

const updateQuizOrder = () => {
    updateQuestionIndex++;
    let quizOrderEl = document.querySelector("#quizOrder");
    quizOrderEl.innerHTML = activeQuestionIndex + "/" + questionsCount;
    let quizProgressEl = document.querySelector(".quiz_prgoress");
    quizOrderEl.style.width = (activeQuestionIndex / questionsCount) * 100 + "%";
    if (activeQuestionIndex == questionsCount - 1) {
        document.querySelector(".quiz_btn").innerHTML = "BİTİR";
    }
    updateQuestion();
};
const createQuestionAnswers = (activeQuestion) => {
    let questionAnswersHTML = "";
    activeQuestion.answers.forEach((answer, index) => {
            questionAnswersHTML += ' <div class="question_answer"> data-id='
            $ { answer.id }
            "onclick="
            selectChoice(this)
            " < div class = "
            choice " >'
            $ {
                CHOICES[index]
            }
        }
        "< /div> <div class =text  >"
        $ { answer.text }
        "< /div >  < /div > ";
    });
return questionAnswersHTML;
});

const updateQuestion = () => {
    const activeQuestion = QUESTİON[activeQuestionIndex];

    let questionHTMl = '<h1>$ { activeQuestionIndex+1} - $ { activeQuestion.text } < /h1><div class="question_answers">${createQuestionAnswers(activeQuestion)}</div>';
    const questionContainerEl = document.querySelector("#questionContainer ");
    questionContainerEl.innerHTML = questionHTMl;

};
const selectChoice = (el) => {
    const questionAnswersEls = Array.from(document.querySelectorAll(".question_answer"));
    questionAnswersEls.find(el => {
        if (el.classList.contains("selected")) el.classList.remove("selected");
    });
    selectedAnswer = el.dataset.id;
    el.classList.add("selected");
};
const checkAnswer = () => {
    const selectedAnswerObj = QUESTİON[activeQuestionIndex].answers.find(a => a.id == selectedAnswer);
    if (selectedAnswerObj.isCorrect) totalCorrectChoice++;
    QUESTİON[activeQuestionIndex].answers.find(a => {
        if (a.id == selectedAnswer) totalCorrectChoice++;
    });
};
const nextQuestion = () => {
    if (selectedAnswer) {
        checkAnswer();
        if (activeQuestionIndex < questionsCount - 1) {
            activeQuestionIndex++;

            updateQuizOrder();
        } else {
            document.querySelector("#totalCorrectChoice").innerHTML = totalCorrectChoice;
            quizModalEl.classList.add("show");
        }
    } else { window.alert("Lütfen Bir Seçim Yapınız."); }


};
const closeModal = () => {
    quizModalEl.classList.remove("show");
};
const repeatQuiz = () => {
    (activeQuestionIndex = 0),
    (questionsCount = 0),
    selectedAnswer = undefined;
    (totalCorrectChoice = 0);
    updateQuizOrder();
    closeModal();
    document.querySelector(".quiz_btn").innerHTML = "NEXT";
}

getQuestions();
setTimeout(() => {
    updateQuizOrder();
}, 100);
