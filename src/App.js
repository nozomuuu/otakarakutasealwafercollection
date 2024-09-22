import React, { useState } from 'react';
import './App.css';

// 画像を一括インポートする関数
const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

// src/images フォルダから .jpg ファイルをすべて読み込む
const stickerImages = importAll(require.context('./images', false, /\.(png|jpe?g)$/));

function App() {
  const [sticker, setSticker] = useState(null);

  // ランダムにステッカーの画像を選択する関数
  const getRandomSticker = () => {
    const randomIndex = Math.floor(Math.random() * stickerImages.length);
    return stickerImages[randomIndex];
  };

  // ウエハースを開けるボタンが押されたときにシールを表示
  const handleOpenWafer = () => {
    setSticker(getRandomSticker());
  };

  return (
    <div className="App">
      <h1>今日のウエハースを開けよう！</h1>
      <p className="remaining-packs">（残りパック数: 5）</p>
      <div className="wafer-container">
        <img src="./images/wafer.png" alt="wafer" className="wafer" />
        <button onClick={handleOpenWafer} className="open-wafer-button">ウエハースを開ける</button>
      </div>
      {sticker && <img src={sticker} alt="Sticker" className="sticker" />}
      <button className="back-button">手に入れたシール一覧を見る</button>
    </div>
  );
}

export default App;
