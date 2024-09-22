import React, { useState, useEffect, useCallback } from 'react';
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
      // SEの再生
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール表示時のSE再生（0.5秒遅延）
  useEffect(() => {
    if (isStickerVisible && sticker) {
      setTimeout(() => {
        const audio = new Audio('/sounds/sticker-reveal.mp3');
        audio.play();
      }, 500); // 0.5秒遅れて再生
    }
  }, [isStickerVisible, sticker]);

  // シール一覧を開く
  const viewStickers = useCallback(() => {
    const audio = new Audio('/sounds/view-stickers.mp3');
    audio.play();
    // シール一覧ページに遷移（仮のリンクに変更してください）
    window.location.href = '/stickers';
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', fontSize: '1.6rem', margin: '20px', padding: '0 10px' }}>
        今日のウエハースを開けよう！
      </h1>
      <p style={{ textAlign: 'center', margin: '10px', padding: '0 10px' }}>（残りパック数: {remainingPacks}）</p>

      <img 
        src="/images/wafer.png" 
        alt="ウエハース" 
        className="wafer" 
        style={{ display: 'block', margin: '20px auto', maxWidth: '300px' }} 
      />

      <button onClick={openWafer} style={{ display: 'block', margin: '20px auto' }}>
        ウエハースを開ける
      </button>

      {isStickerVisible && sticker && (
        <div className="sticker-container">
          <img 
            src={sticker} 
            alt="Sticker" 
            className="sticker" 
            style={{ display: 'block', margin: '0 auto', maxWidth: '300px' }} 
          />
        </div>
      )}

      <button onClick={viewStickers} style={{ display: 'block', margin: '20px auto' }}>
        手に入れたシール一覧を見る
      </button>
    </div>
  );
}

export default App;
