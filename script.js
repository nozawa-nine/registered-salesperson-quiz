// ============================
// 問題データ
// ============================

const questions = [
  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品は、市販後にも、その安全性の確認が行われる仕組みとなっているが、その有効性については市販前に十分確認されているため、市販後に確認は行われない。",
    answer: false,
    explanation: "医薬品は、市販前に有効性や安全性について十分に確認されますが、市販後にも、実際の使用状況における有効性や安全性について継続的に確認されます。したがって、この記述は誤りです。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品は、人体にとって異物であるため、程度の差はあっても何らかの有害作用を生じる可能性がある。",
    answer: true,
    explanation: "医薬品は人体にとって異物であり、期待される薬効だけでなく、望ましくない作用を生じる可能性があります。そのため、適正な使用が重要です。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品は、正しく使用すれば副作用が起こることはない。",
    answer: false,
    explanation: "医薬品を適正に使用していても、副作用が起こる可能性があります。副作用は、医薬品の使用に伴って生じる望ましくない反応です。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品を使用する際には、用法、用量、使用上の注意などを守ることが重要である。",
    answer: true,
    explanation: "医薬品は、定められた用法・用量や使用上の注意を守って使用することが重要です。適正使用によって、期待される効果を得ながらリスクを抑えることにつながります。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品の効果や副作用には、使用する人の体質や体調などが影響することはない。",
    answer: false,
    explanation: "医薬品の効果や副作用には、年齢、体質、体調、併用している医薬品など、使用する人のさまざまな要因が影響することがあります。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "同じ医薬品であっても、使用する人によって効果や副作用の現れ方が異なる場合がある。",
    answer: true,
    explanation: "医薬品の効果や副作用には個人差があります。同じ医薬品を使用しても、体質や年齢、体調などによって反応が異なる場合があります。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品は、病気を治す目的で使用されるため、使用量を増やせば増やすほど効果も高くなる。",
    answer: false,
    explanation: "医薬品は、用量を増やせば効果が比例して高まるとは限りません。むしろ過量使用によって副作用や中毒などのリスクが高まることがあります。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品を使用する場合には、その医薬品について十分な情報を得たうえで、適正に使用することが重要である。",
    answer: true,
    explanation: "医薬品の適正使用には、効能・効果だけでなく、用法・用量、使用上の注意、副作用などについて理解することが重要です。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品の使用によって生じた副作用は、すべて使用者の責任であり、医薬品の安全対策とは関係がない。",
    answer: false,
    explanation: "医薬品の副作用については、使用者による適正使用だけでなく、医薬品そのものの安全性や市販後の安全対策なども重要です。",
    exp: 10
  },

  {
    category: "第1章｜医薬品に共通する特性と基本的な知識",
    title: "医薬品の本質",
    text: "医薬品は、適正に使用することによって、その有効性と安全性を最大限に確保することが重要である。",
    answer: true,
    explanation: "医薬品は、正しい用法・用量や使用上の注意を守るなど、適正に使用することが重要です。",
    exp: 10
  }
];


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

  category.textContent = question.category;

  questionTitle.textContent = question.title;

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

  answerQuestion(true);

});

falseButton.addEventListener("click", function() {

  answerQuestion(false);

});

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartGame);
