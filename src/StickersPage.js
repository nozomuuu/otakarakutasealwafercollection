import React, { useState, useEffect } from 'react';

function StickersPage() {
  const [stickersCollected, setStickersCollected] = useState([]);
  const [totalStickers] = useState(50);

  // シールのコレクション率を計算
  useEffect(() => {
    // ローカルストレージやAPIなどからシールのデータを取得して更新
    const collected = JSON.parse(localStorage.getItem('stickers')) || [];
    setStickersCollected(collected);
  }, []);

  const collectionRate = ((stickersCollected.length / totalStickers) * 100).toFixed(2);

  return (
    <div>
      <h1>手に入れたシール一覧</h1>
      <p>コレクション率: {collectionRate}%</p>
      <p>手に入れたシール: {stickersCollected.length}/{totalStickers}</p>
      {/* シールの表示 */}
      <div className="sticker-list">
        {stickersCollected.map((sticker, index) => (
          <img key={index} src={`/images/${sticker}.jpg`} alt={`Sticker ${sticker}`} />
        ))}
      </div>
      <a href="/">ホームに戻る</a>
    </div>
  );
}

export default StickersPage;
