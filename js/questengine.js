function loadData() {
    window.currentQuestionIndex = 0;
    window.questResults = new Array(window.questData.questions.length);
    showCurrentQuestion();

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
        radio.setAttribute("value", i);
        radio.setAttribute("onclick", "answerClick(event)");
        var li = document.createElement("li");
        li.appendChild(radio);
        li.appendChild(document.createTextNode(question.answers[i].answer));
        ulAnswers.appendChild(li);
    }
    var btnNext = document.getElementById("btnNext");
    btnNext.innerHTML = currentQuestionIsLast() ? "Finish" : "Next";
    btnNext.disabled = true;
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
            li.classList.add("green");
        else if (i == answerIndex)
            li.classList.add("yellow");

        ulAnswers.appendChild(li);
    }
    ulAnswers.style.removeProperty("listStyle");

    var btnNext = document.getElementById("btnNext");
    btnNext.innerHTML = "Close";
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
