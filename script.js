// ============================
// 問題データ
// ============================

let questions = [];


// ============================
// ゲームの状態
// ============================

let currentQuestion = 0;
let correctCount = 0;
let totalExp = 0;
let level = 1;
let exp = 0;


// ============================
// HTML要素を取得
// ============================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finishScreen = document.getElementById("finish-screen");

const startButton = document.getElementById("start-button");
const trueButton = document.getElementById("true-button");
const falseButton = document.getElementById("false-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const questionNumber = document.getElementById("question-number");
const category = document.getElementById("category");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");

const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const expGain = document.getElementById("exp-gain");
const explanation = document.getElementById("explanation");

const correctCountElement = document.getElementById("correct-count");
const accuracyElement = document.getElementById("accuracy");
const totalExpElement = document.getElementById("total-exp");

const levelElement = document.getElementById("level");
const expElement = document.getElementById("exp");


// ============================
// CSVを読み込む
// ============================

async function loadQuestions() {

  try {

    const response = await fetch("questions.csv");

    const text = await response.text();

    const lines = text.trim().split(/\r?\n/);

    // 1行目は見出しなので除外
    const dataLines = lines.slice(1);

    questions = dataLines.map(line => {

      const columns = line.split(",");

      return {
        id: columns[0],
        chapter: columns[1],
        category: columns[2],
        text: columns[3],
        answer: columns[4].trim(),
        explanation: columns[5],
        exp: Number(columns[6]),
        source: columns[7],
        year: columns[8],
        number: columns[9]
      };

    });

    console.log("問題読み込み完了:", questions);

  } catch (error) {

    console.error("問題データの読み込みに失敗しました:", error);

  }

}


// ============================
// 画面切り替え
// ============================

function showScreen(screen) {

  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  finishScreen.classList.add("hidden");

  screen.classList.remove("hidden");

}


// ============================
// ゲーム開始
// ============================

function startGame() {

  if (questions.length === 0) {

    alert("問題データを読み込んでいます。少し待ってからもう一度押してください。");

    return;

  }

  currentQuestion = 0;
  correctCount = 0;
  totalExp = 0;
  level = 1;
  exp = 0;

  updateStatus();

  showScreen(quizScreen);

  showQuestion();

}


// ============================
// 問題を表示
// ============================

function showQuestion() {

  const question = questions[currentQuestion];

  questionNumber.textContent = currentQuestion + 1;

  category.textContent =
    question.chapter + "｜" + question.category;

  questionTitle.textContent = question.category;

  questionText.textContent = question.text;

}


// ============================
// ○×回答
// ============================

function answerQuestion(userAnswer) {

  const question = questions[currentQuestion];

  const isCorrect = userAnswer === question.answer;

  if (isCorrect) {

    correctCount++;

    totalExp += question.exp;

    addExp(question.exp);

    resultIcon.textContent = "○";

    resultTitle.textContent = "正解！";

    expGain.textContent = "+" + question.exp + " EXP";

  } else {

    resultIcon.textContent = "×";

    resultTitle.textContent = "不正解";

    expGain.textContent = "EXP +0";

  }

  explanation.textContent = question.explanation;

  showScreen(resultScreen);

}


// ============================
// EXP処理
// ============================

function addExp(amount) {

  exp += amount;

  while (exp >= 100) {

    exp -= 100;

    level++;

  }

  updateStatus();

}


// ============================
// ステータス更新
// ============================

function updateStatus() {

  levelElement.textContent = level;

  expElement.textContent = exp;

}


// ============================
// 次の問題
// ============================

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= questions.length) {

    showFinish();

  } else {

    showScreen(quizScreen);

    showQuestion();

  }

}


// ============================
// 結果画面
// ============================

function showFinish() {

  const accuracy =
    Math.round((correctCount / questions.length) * 100);

  correctCountElement.textContent = correctCount;

  accuracyElement.textContent = accuracy;

  totalExpElement.textContent = totalExp;

  showScreen(finishScreen);

}


// ============================
// もう一度
// ============================

function restartGame() {

  startGame();

}


// ============================
// ボタンイベント
// ============================

startButton.addEventListener("click", startGame);

trueButton.addEventListener("click", function() {

  answerQuestion("○");

});

falseButton.addEventListener("click", function() {

  answerQuestion("×");

});

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartGame);


// ============================
// 起動時にCSVを読み込む
// ============================

loadQuestions();
