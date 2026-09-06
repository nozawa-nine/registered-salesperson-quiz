let questions = [];
let quizQuestions = [];

let currentQuestion = 0;
let correctCount = 0;
let totalExp = 0;
let level = 1;
let exp = 0;


// ============================
// HTML要素
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
// CSVを正しく解析する
// ============================

function parseCSV(text) {

  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {

    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {

      value += '"';
      i++;

    } else if (char === '"') {

      insideQuotes = !insideQuotes;

    } else if (char === "," && !insideQuotes) {

      row.push(value);
      value = "";

    } else if ((char === "\n" || char === "\r") && !insideQuotes) {

      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(value);
      rows.push(row);

      row = [];
      value = "";

    } else {

      value += char;

    }

  }

  if (value !== "" || row.length > 0) {

    row.push(value);
    rows.push(row);

  }

  return rows;
}


// ============================
// CSVを読み込む
// ============================

async function loadQuestions() {

  try {

    const response = await fetch("questions.csv?v=2");

    if (!response.ok) {

      throw new Error(
        "questions.csvを読み込めませんでした。"
      );

    }

    const text = await response.text();

    const rows = parseCSV(text);

    // 1行目は見出し
    const dataRows = rows.slice(1);

    questions = dataRows
      .filter(row => row.length >= 10)
      .map(row => {

        return {

          id: row[0].trim(),

          chapter: row[1].trim(),

          category: row[2].trim(),

          text: row[3].trim(),

          answer: row[4].trim()
            .replace("〇", "○")
            .replace("✕", "×"),

          explanation: row[5].trim(),

          exp: Number(row[6]) || 10,

          source: row[7].trim(),

          year: row[8].trim(),

          number: row[9].trim()

        };

      });

    console.log(
      "CSV読み込み完了:",
      questions.length,
      "問"
    );

    console.log(questions);

  } catch (error) {

    console.error(error);

    alert(
      "問題データの読み込みに失敗しました。\n" +
      error.message
    );

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
// 問題をシャッフル
// ============================

function shuffleQuestions(array) {

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] =
      [shuffled[j], shuffled[i]];

  }

  return shuffled;

}


// ============================
// 今回の出題問題を作る
// ============================

function createQuizQuestions() {

  const shuffled =
    shuffleQuestions(questions);

  // 最大10問
  quizQuestions =
    shuffled.slice(0, Math.min(10, shuffled.length));

}


// ============================
// ゲーム開始
// ============================

function startGame() {

  if (questions.length === 0) {

    alert(
      "問題データが読み込まれていません。"
    );

    return;

  }

  currentQuestion = 0;
  correctCount = 0;
  totalExp = 0;
  level = 1;
  exp = 0;

  // 今回の10問を決定
  createQuizQuestions();

  updateStatus();

  showScreen(quizScreen);

  showQuestion();

}


// ============================
// 問題表示
// ============================

function showQuestion() {

  const question =
    quizQuestions[currentQuestion];

  questionNumber.textContent =
    currentQuestion + 1;

  category.textContent =
    question.chapter + "｜" + question.category;

  questionTitle.textContent =
    question.category;

  questionText.textContent =
    question.text;

}


// ============================
// 回答
// ============================

function answerQuestion(userAnswer) {

  const question =
    quizQuestions[currentQuestion];

  const isCorrect =
    userAnswer === question.answer;

  if (isCorrect) {

    correctCount++;

    totalExp += question.exp;

    addExp(question.exp);

    resultIcon.textContent = "○";

    resultTitle.textContent = "正解！";

    expGain.textContent =
      "+" + question.exp + " EXP";

  } else {

    resultIcon.textContent = "×";

    resultTitle.textContent = "不正解";

    expGain.textContent = "EXP +0";

  }

  explanation.textContent =
    question.explanation;

  showScreen(resultScreen);

}


// ============================
// EXP
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
// ステータス
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

  if (
    currentQuestion >= quizQuestions.length
  ) {

    showFinish();

  } else {

    showScreen(quizScreen);

    showQuestion();

  }

}


// ============================
// 結果
// ============================

function showFinish() {

  const accuracy =
    Math.round(
      (correctCount / quizQuestions.length) * 100
    );

  correctCountElement.textContent =
    correctCount;

  accuracyElement.textContent =
    accuracy;

  totalExpElement.textContent =
    totalExp;

  showScreen(finishScreen);

}


// ============================
// 再スタート
// ============================

function restartGame() {

  startGame();

}


// ============================
// ボタン
// ============================

startButton.addEventListener(
  "click",
  startGame
);

trueButton.addEventListener(
  "click",
  function() {
    answerQuestion("○");
  }
);

falseButton.addEventListener(
  "click",
  function() {
    answerQuestion("×");
  }
);

nextButton.addEventListener(
  "click",
  nextQuestion
);

restartButton.addEventListener(
  "click",
  restartGame
);


// ============================
// 起動
// ============================

loadQuestions();
