import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 初期パック数を2に設定
  const [packCount, setPackCount] = useState(2);
  const [stickerVisible, setStickerVisible] = useState(false);
  
  // パック数を更新する関数
  function updateRemainingPacks() {
    const packElement = document.getElementById('pack-count');
    if (packElement) {
      packElement.innerText = `${packCount}`;
    }
  }

  useEffect(() => {
    // ウエハースを開けるボタン
    const waferButton = document.getElementById('open-wafer');
    
    if (waferButton) {
      waferButton.addEventListener('click', () => {
        if (packCount > 0) {
          // パック数を1つ減らす
          setPackCount(packCount - 1);
          updateRemainingPacks();

          // ウエハースを開ける音を再生
          const waferSound = new Audio('/sounds/wafer-open.mp3');
          waferSound.play();

          // シールが登場するまでの遅延をシミュレート
          setTimeout(() => {
            // シールが出てくる際の音
            const stickerSound = new Audio('/sounds/sticker-reveal.mp3');
            stickerSound.play();

            // シールを表示
            setStickerVisible(true);
          }, 1000);
        } else {
          alert('今日はもうパックを開けられません！');
        }
      });
    }

    // 手に入れたシール一覧を見るボタンのリンク修正
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
      backButton.addEventListener('click', () => {
        // シール一覧を見る音を再生
        const viewStickersSound = new Audio('/sounds/view-stickers.mp3');
        viewStickersSound.play();

        window.location.href = '/stickers';
      });
    }
  }, [packCount]);

  return (
    <div className="App">
      <div className="header">
        今日のウエハースを開けよう！
      </div>
      <div className="remaining-packs" style={{ textAlign: 'center' }}>
        残りパック数: <span id="pack-count">{packCount}</span>
      </div>
      <button id="open-wafer">ウエハースを開ける</button>
      <button className="back-button">手に入れたシール一覧を見る</button>
      
      {/* シール表示部分 */}
      {stickerVisible && (
        <div className="sticker">
          <img src="/images/sticker1.jpg" alt="Sticker" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default App;
