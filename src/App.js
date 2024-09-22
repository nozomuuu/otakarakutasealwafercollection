import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2); // 1日に引けるパック数を2に設定
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);

  // シールのランダム選択
  const pickRandomSticker = useCallback(() => {
    const totalStickers = 50; // シールの総数
    const randomNumber = Math.floor(Math.random() * totalStickers) + 1;
    return `/images/${randomNumber}.jpg`; // シール画像のパス
  }, []);

  // 残りパック数の更新
  const updateRemainingPacks = useCallback(() => {
    setRemainingPacks((prevPacks) => prevPacks - 1);
  }, []);

  // ウエハースを開ける
  const openWafer = useCallback(() => {
    if (remainingPacks > 0) {
      updateRemainingPacks();
      setSticker(pickRandomSticker());
      setStickerVisible(true);

      // ウエハースSEの再生
      const waferAudio = new Audio('/sounds/wafer-open.mp3');
      waferAudio.play();

      // シールのSEを遅らせて再生
      setTimeout(() => {
        const stickerAudio = new Audio('/sounds/sticker-reveal.mp3');
        stickerAudio.play();
      }, 1000); // 1秒遅らせてシールSE再生
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール一覧を開く
  const viewStickers = useCallback(() => {
    window.location.href = '/stickers'; // シール一覧ページへの遷移
  }, []);

  return (
    <div className="App">
      <h1 className="header">今日のウエハースを開けよう！</h1>
      <p className="remaining-packs">（残りパック数: {remainingPacks}）</p>

      <img 
        src="/images/wafer.png" 
        alt="ウエハース" 
        className={`wafer ${isStickerVisible ? 'open' : ''}`} 
      />

      <button onClick={openWafer}>ウエハースを開ける</button>

      {isStickerVisible && sticker && (
        <div className="sticker-container">
          <img 
            src={sticker} 
            alt="Sticker" 
            className="sticker" 
          />
        </div>
      )}

      <button onClick={viewStickers}>手に入れたシール一覧を見る</button>
    </div>
  );
}

export default App;
