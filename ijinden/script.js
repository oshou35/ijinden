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
      <img src="cardGazou/${card.gazou}.png" alt="cardGazou/${card.name}の画像" /> <!-- 画像を表示 -->
  `;
    cardList.appendChild(cardElement); // カード要素をカードリストに追加
});
}

// ページが読み込まれたときにカードを表示
window.onload = displayCards;