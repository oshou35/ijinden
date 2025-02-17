// HTML要素の取得
// ※検索バーなどの要素がある場合は、その取得もここで行いますが、まずはカード一覧表示に注力します。
const cardList = document.getElementById("card-list");

// カード一覧を表示する関数
function displayCards(cardsToDisplay) {
  // 表示エリアをクリア
  cardList.innerHTML = "";

  // 受け取ったカードデータ配列を元にカード要素を生成して追加する
  cardsToDisplay.forEach(card => {
    // カード用のdiv要素を作成
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    // カードの画像と名前を表示
    cardElement.innerHTML = `
      <img src="cardGazou/${card.gazou}.png" alt="${card.name}の画像" />
      <p>${card.name}</p>
    `;
    // カード要素を一覧エリアに追加
    cardList.appendChild(cardElement);
  });
}

// ページ読み込み時に全カードを表示する
window.onload = () => {
  // cards.js で定義されたグローバル変数 cards を使って表示
  displayCards(cards);
};

// Excelファイルのアップロード処理

// HTML内のファイル入力とボタンの要素を取得
const excelUpload = document.getElementById('excel-upload');
const uploadButton = document.getElementById('upload-button');

// アップロードボタンがクリックされたときの処理
uploadButton.addEventListener('click', () => {
  if (!excelUpload.files.length) {
    alert("ファイルを選択してください");
    return;
  }
  const file = excelUpload.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    // 読み込んだファイルデータをUint8Arrayに変換
    const data = new Uint8Array(e.target.result);
    // SheetJSでワークブックとして読み込む
    const workbook = XLSX.read(data, { type: 'array' });
    // ここでは最初のシートを利用
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    // ワークシートの内容をJSON形式に変換
    // ※Excelファイルの列ヘッダーが、カード情報のキー（cardType, cardColor, name, level, ruleText, power, legacyAbility, manaCost, gazou）と一致していることを前提とします
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    
    console.log("読み込んだカードデータ：", jsonData);
    
    // 読み込んだデータをグローバル変数 cards に追加（または上書き）
    // ここでは既存のカードデータに追記する例です
    jsonData.forEach(card => {
      // 必要に応じて型変換（例: 数値に変換）
      card.level = parseInt(card.level, 10);
      card.power = parseInt(card.power, 10);
      card.manaCost = parseInt(card.manaCost, 10);
      
      // 既存のcards配列に追加
      cards.push(card);
    });
    
    // カード一覧の表示を更新
    displayCards(cards);
  };

  // ファイルの読み込みを開始（ArrayBufferとして読み込む）
  reader.readAsArrayBuffer(file);
});