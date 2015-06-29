function loadQuestionnaireList() {
    var ul = document.getElementById("ulQuestionnaires");
    ul.innerHTML = "";
    for (var i = 0; i < window.questionnaires.length; i++) {
        var questionnaire = window.questionnaires[i];
        var li = document.createElement("li");

        var a = document.createElement("a");
        var aText = document.createTextNode(questionnaire.title);
        a.appendChild(aText);
        a.setAttribute("data-index", i);
        a.setAttribute("onclick", "onQuestionnaireClick(event)");

        li.appendChild(a);
        ul.appendChild(li);
    }
}

function onQuestionnaireClick(ev) {
    var a = ev.target;
    var index = a.getAttribute("data-index");
    window.questData = window.questionnaires[index];
    loadData();
}

function loadData() {
    window.currentQuestionIndex = 0;
    randomizeQuestions();
    window.questResults = new Array(window.questData.questions.length);
    showCurrentQuestion();
}

function centerQuestion() {
    var div = document.getElementById("divQuestion");
    div.style.marginTop = -div.clientHeight / 2;
}

function showCurrentQuestion() {
    showQuestion(window.questData.questions[window.currentQuestionIndex]);
}

function currentQuestionIsLast() {
    return window.currentQuestionIndex === window.questData.questions.length - 1;
}

function showQuestion(question) {
    document.getElementById("divQuestion").style.display = "block";
    document.getElementById("questionText").innerHTML = question.question;
    var ulAnswers = document.getElementById("ulAnswers");
    ulAnswers.innerHTML = "";
    for (var i = 0; i < question.answers.length; i++) {
        var radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "answers");
        radio.setAttribute("value", i);
        radio.setAttribute("onclick", "answerClick(event)");
        var li = document.createElement("li");
        li.appendChild(radio);
        li.appendChild(document.createTextNode(question.answers[i].answer));
        ulAnswers.appendChild(li);
    }
    var divExplanation = document.getElementById("divExplanation");
    divExplanation.innerHTML = "";
    var btnNext = document.getElementById("btnNext");
    btnNext.innerHTML = currentQuestionIsLast() ? "Finish" : "Next";
    btnNext.disabled = true;

    var span = document.getElementById("questionNumber");
    span.innerHTML = (window.currentQuestionIndex + 1).toString() + "/" + window.questData.questions.length;
    centerQuestion();
}

function showQuestionWithAnswer(question, answerIndex) {
    document.getElementById("divQuestion").style.display = "block";
    document.getElementById("questionText").innerHTML = question.question;
    var ulAnswers = document.getElementById("ulAnswers");
    ulAnswers.innerHTML = "";
    for (var i = 0; i < question.answers.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(question.answers[i].answer));
        if (question.answers[i].correct)
            li.classList.add("rightAnswer");
        else if (i == answerIndex)
            li.classList.add("wrongAnswer");

        ulAnswers.appendChild(li);
    }
    var divExplanation = document.getElementById("divExplanation");
    divExplanation.innerHTML = question.explanation;

    var btnNext = document.getElementById("btnNext");
    btnNext.innerHTML = "Close";
    centerQuestion();
}

function clickNext() {
    if (window.questCompleted) {
        document.getElementById("divQuestion").style.display = "none";
    } if (currentQuestionIsLast()) {
        document.getElementById("divQuestion").style.display = "none"; 
        showResults();
        window.questCompleted = true;
    } else {
        window.currentQuestionIndex++;
        showCurrentQuestion();    
    }
}

function answerClick(ev) {
    document.getElementById("btnNext").disabled = false;
    window.questResults[window.currentQuestionIndex] = ev.target.value;
}

function getRightAnswerIndex(question) {
    for (var i = 0; i < question.answers.length; i++) {
        if (question.answers[i].correct)
            return i;
    }
    return -1;
}

function showResults() {
    document.getElementById("divResult").style.display = "block";
    var tblResult = document.getElementById("tblResult");
    var tbody = tblResult.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
    for (var i = 0; i < window.questData.questions.length; i++) {
        var question = window.questData.questions[i];
        var tr = tbody.insertRow(tbody.rows.length);
        var td = tr.insertCell(0);
        if (questResults[i] == getRightAnswerIndex(question))
            td.classList.add("rightAnswer");
        else
            td.classList.add("wrongAnswer");
        
        var a = document.createElement("a");
        var aText = document.createTextNode((i+1).toString() + ". " + question.question);
        a.appendChild(aText);
        a.setAttribute("data-index", i);
        a.setAttribute("onclick", "onResultClick(event)");

        td.appendChild(a);
    }
}

function onResultClick(ev) {
    var td = ev.target;
    var index = td.getAttribute("data-index");
    var question = window.questData.questions[index];
    showQuestionWithAnswer(question, questResults[index]);
}

function getRandomInteger(limit) {
    return Math.floor(Math.random() * limit);
}

function randomizeAnswers(question) {
    var newAnswers = [];
    while (question.answers.length > 0) {
        var randomIndex = getRandomInteger(question.answers.length);
        newAnswers.push(question.answers[randomIndex]);
        question.answers.splice(randomIndex, 1);
    }
    question.answers = newAnswers;
}

function randomizeQuestions() {
    var newQuestData = { title: window.questData.title, questions: [] };
    while (window.questData.questions.length > 0) {
        var randomIndex = getRandomInteger(window.questData.questions.length);
        randomizeAnswers(window.questData.questions[randomIndex]);
        newQuestData.questions.push(window.questData.questions[randomIndex]);
        window.questData.questions.splice(randomIndex, 1);
    }
    window.questData = newQuestData;
}
