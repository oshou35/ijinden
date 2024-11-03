// カードデータのサンプル
const cards = [
  { 
    cardType: "Eijin", //カードの種類（イジン、魔法など）
    cardColor: "Red",  //カードの色
    name: "ダビンチ", //カード名
    level: 5, //カードのレベル
    ruleText: "攻撃時に追加のダメージを与える。", //能力
    power: 10, //パワー
    legacyAbility: "破壊されると、全ての敵に3ダメージを与える。", //遺業能力
    manaCost: 3, //魔力コスト
    gazou: "B_001"//カード画像
  },
  { 
    cardType: "Eijin", //カードの種類（イジン、魔法など）
    cardColor: "Red",  //カードの色
    name: "ダビンチ", //カード名
    level: 5, //カードのレベル
    ruleText: "攻撃時に追加のダメージを与える。", //能力
    power: 10, //パワー
    legacyAbility: "破壊されると、全ての敵に3ダメージを与える。", //遺業能力
    manaCost: 3, //魔力コスト
    gazou: "B_001"//カード画像
  },
];

// HTML要素の取得
const searchInput = document.getElementById("search");
const cardList = document.getElementById("card-list");

function displayCards(){
  cardList.innerHTML=""; //既存の内容をクリア

  cards.forEach(card => {
    // カード要素を作成
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
      <h2>${card.name}</h2>
      <img src="cardGazou/${card.gazou}.png" alt="cardGazou/${card.name}の画像" /> <!-- 画像を表示 -->
  `;
    cardList.appendChild(cardElement); // カード要素をカードリストに追加
});
}

// ページが読み込まれたときにカードを表示
window.onload = displayCards;