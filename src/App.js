import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2); // 1日に引けるパック数を2に設定
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);
  const [isWaferOpen, setWaferOpen] = useState(false); // ウエハース開封状態

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
      setWaferOpen(true); // ウエハースを開けるアニメーション開始
      setTimeout(() => {
        setStickerVisible(true); // シール表示
        // シール表示時のSE再生（1秒遅延）
        setTimeout(() => {
          const audio = new Audio('/sounds/sticker-reveal.mp3');
          audio.play();
        }, 1000); // 1秒遅れて再生
      }, 1500); // ウエハースアニメーション後にシールを表示
      // ウエハース開封SE
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール一覧を開く
  const viewStickers = useCallback(() => {
    window.location.href = '/stickers'; // 同じタブでシール一覧ページに移動
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
        className={`wafer ${isWaferOpen ? 'open' : ''}`} 
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
import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2); 
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);

  const pickRandomSticker = useCallback(() => {
    const totalStickers = 50; 
    const randomNumber = Math.floor(Math.random() * totalStickers) + 1;
    return `/images/${randomNumber}.jpg`; 
  }, []);

  const updateRemainingPacks = useCallback(() => {
    setRemainingPacks((prevPacks) => prevPacks - 1);
  }, []);

  const openWafer = useCallback(() => {
    if (remainingPacks > 0) {
      updateRemainingPacks();
      setSticker(pickRandomSticker());
      setStickerVisible(true);
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  const viewStickers = useCallback(() => {
    const audio = new Audio('/sounds/view-stickers.mp3');
    audio.play();
    window.location.href = '/stickers'; // 実際のシール一覧ページへの遷移
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', fontSize: '2rem', whiteSpace: 'nowrap', margin: '20px' }}>今日のウエハースを開けよう！</h1>
      <p style={{ textAlign: 'center', margin: '10px' }}>（残りパック数: {remainingPacks}）</p>

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
          <audio src="/sounds/sticker-reveal.mp3" autoPlay />
        </div>
      )}

      <button onClick={viewStickers} style={{ display: 'block', margin: '20px auto' }}>
        手に入れたシール一覧を見る
      </button>
    </div>
  );
}

export default App;
