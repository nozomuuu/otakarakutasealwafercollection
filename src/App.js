import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [remainingPacks, setRemainingPacks] = useState(2);
  const [isStickerVisible, setStickerVisible] = useState(false);
  const [sticker, setSticker] = useState(null);
  const [rarity, setRarity] = useState(''); // レアリティ管理

  const pickRandomSticker = useCallback(() => {
    const totalStickers = 50;
    const randomNumber = Math.floor(Math.random() * totalStickers) + 1;
    const rarityStars = randomNumber <= 10 ? '★★★' : randomNumber <= 30 ? '★★' : '★';
    setRarity(rarityStars); // レアリティ設定
    return `/images/${randomNumber}.jpg`;
  }, []);

  const updateRemainingPacks = useCallback(() => {
    setRemainingPacks((prevPacks) => prevPacks - 1);
  }, []);

  const openWafer = useCallback(() => {
    if (remainingPacks > 0) {
      updateRemainingPacks();
      setStickerVisible(false); // シール非表示
      const audio = new Audio('/sounds/wafer-open.mp3');
      audio.play();

      setTimeout(() => {
        setSticker(pickRandomSticker()); // シールを表示
        setStickerVisible(true); // シール表示
        const stickerAudio = new Audio('/sounds/sticker-reveal.mp3');
        stickerAudio.play(); // シール表示時にSE再生
      }, 1000); // アニメーションのラグを短縮
    } else {
      alert('今日はもうパックを開けられません！');
    }
  }, [remainingPacks, updateRemainingPacks, pickRandomSticker]);

  // シール一覧ページに遷移
  const viewStickers = useCallback(() => {
    window.location.href = '/stickers';
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', whiteSpace: 'nowrap', padding: '5px', marginBottom: '0' }}>
        今日のウエハースを開けよう！
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.1rem', fontFamily: 'Arial, sans-serif', marginTop: '0' }}>
        （残りパック数: {remainingPacks}）
      </p>

      <img 
        src="/images/wafer.png" 
        alt="ウエハース" 
        className={`wafer ${isStickerVisible ? 'open' : ''}`}
        style={{ display: 'block', margin: '20px auto', maxWidth: '200px', cursor: 'pointer' }} 
        onClick={openWafer}
      />

      {isStickerVisible && sticker && (
        <div className="sticker-container" style={{ textAlign: 'center', marginTop: '10px' }}>
          <img 
            src={sticker} 
            alt="Sticker" 
            className="sticker" 
            style={{ display: 'block', margin: '0 auto', maxWidth: '300px' }} 
          />
          <p style={{ fontSize: '1.2rem', color: 'gold', marginTop: '5px' }}>{rarity}</p> {/* レアリティ★を表示 */}
        </div>
      )}

      <button onClick={openWafer} style={{ display: 'block', margin: '20px auto' }}>
        ウエハースを開ける
      </button>

      <button onClick={viewStickers} style={{ display: 'block', margin: '20px auto' }}>
        手に入れたシール一覧を見る
      </button>
    </div>
  );
}

export default App;
