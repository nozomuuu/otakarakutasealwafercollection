import React, { useState, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StickersPage from './StickersPage'; // シール一覧ページ用のコンポーネント

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
      // ウエハースを開けるSE
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール登場時のSE再生
  const playStickerRevealSE = useCallback(() => {
    const stickerAudio = new Audio('/sounds/sticker-reveal.mp3');
    stickerAudio.play();
  }, []);

  // シール一覧を開く
  const viewStickers = useCallback(() => {
    // シール一覧ページに遷移
    window.location.href = '/stickers';
  }, []);

  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center', fontSize: '2rem', whiteSpace: 'nowrap', padding: '10px' }}>今日のウエハースを開けよう！</h1>
        <p style={{ textAlign: 'center' }}>（残りパック数: {remainingPacks}）</p>

        <img 
          src="/images/wafer.png" 
          alt="ウエハース" 
          className="wafer" 
          style={{ display: 'block', margin: '20px auto', maxWidth: '300px', cursor: 'pointer' }} 
          onClick={openWafer}
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
              onLoad={playStickerRevealSE} // シールが表示された後にSEを再生
            />
          </div>
        )}

        <button onClick={viewStickers} style={{ display: 'block', margin: '20px auto' }}>
          手に入れたシール一覧を見る
        </button>

        <Routes>
          <Route path="/stickers" element={<StickersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
