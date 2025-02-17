// 各ステップの要素を取得
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

// ファイルアップロード用の要素
const excelUpload = document.getElementById("excel-upload");
const uploadButton = document.getElementById("upload-button");

// プレビュー用テーブル
const uploadTable = document.getElementById("upload-table");

// ステップ移行ボタン
const nextStepButton = document.getElementById("next-step");
const saveButton = document.getElementById("save-button");

// 一時的にアップロードデータを格納する変数
let uploadedData = [];

// --- ステップ1: Excelファイルアップロード ---
uploadButton.addEventListener("click", () => {
  if (!excelUpload.files.length) {
    alert("ファイルを選択してください");
    return;
  }
  const file = excelUpload.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    uploadedData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    console.log("アップロードしたカードデータ：", uploadedData);

    buildPreviewTable(uploadedData);
    // ステップ1からステップ2へ切り替え
    step1.style.display = "none";
    step2.style.display = "block";
  };

  reader.readAsArrayBuffer(file);
});

// --- ステップ2: プレビュー表示 ---
function buildPreviewTable(data) {
  uploadTable.innerHTML = "";

  if (data.length === 0) {
    uploadTable.innerHTML = "<tr><td>データがありません</td></tr>";
    return;
  }

  // ヘッダー行の作成
  const headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement("th");
    th.innerText = key;
    headerRow.appendChild(th);
  });
  uploadTable.appendChild(headerRow);

  // 各行の作成
  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(value => {
      const td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);
    });
    uploadTable.appendChild(tr);
  });
}

// ステップ2の「次へ」ボタンでステップ3へ移動
nextStepButton.addEventListener("click", () => {
  step2.style.display = "none";
  step3.style.display = "block";
  buildAdditionalInfoForm(uploadedData);
});

// --- ステップ3: 追加情報登録フォームの生成 ---
function buildAdditionalInfoForm(data) {
  const container = document.getElementById("image-upload-container");
  container.innerHTML = "";

  data.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card-additional-info";
    div.innerHTML = `<label>
      ${card.name} 画像ファイル名:
      <input type="text" id="image-input-${index}" value="${card.gazou || ""}">
    </label>`;
    container.appendChild(div);
  });
}

// 登録完了ボタンの処理
saveButton.addEventListener("click", () => {
  uploadedData.forEach((card, index) => {
    const input = document.getElementById(`image-input-${index}`);
    if (input) {
      card.gazou = input.value;
    }
  });
  // ここで必要に応じて、グローバルなカード配列にデータを統合するなどの処理を実施
  // 例: Array.prototype.push.apply(cards, uploadedData);
  alert("カード情報の登録が完了しました！");
});