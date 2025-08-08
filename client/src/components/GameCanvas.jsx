// src/components/GameCanvas.jsx
import React, { useEffect, useRef, useState } from "react";

const tileSize = 50;
const tileX = 20; // 1024 / 50 = 약 20
const tileY = 15; // 768 / 50 = 약 15
const fieldWidth = tileX;
const fieldHeight = tileY;

const getTile = (clientX, clientY, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((clientX - rect.left) / tileSize);
  const y = Math.floor((clientY - rect.top) / tileSize);
  return { x, y };
};

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const initialPlayers = [
      { id: 1, x: 3, y: 5, team: "blue", hasBall: true },
      { id: 2, x: 5, y: 5, team: "blue", hasBall: false },
      { id: 3, x: 8, y: 5, team: "red", hasBall: false },
    ];
    setPlayers(initialPlayers);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = "/assets/football-pitch.png"; // 이미지 경로 수정
    image.onload = () => setBgImage(image);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ratio = window.devicePixelRatio || 1;
    canvas.width = fieldWidth * tileSize * ratio;
    canvas.height = fieldHeight * tileSize * ratio;
    canvas.style.width = `${fieldWidth * tileSize}px`;
    canvas.style.height = `${fieldHeight * tileSize}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); // 스케일링 적용

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 이미지 그리기
    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, fieldWidth * tileSize, fieldHeight * tileSize);
    }

    // 격자
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for (let x = 0; x < fieldWidth; x++) {
      for (let y = 0; y < fieldHeight; y++) {
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    // 선수
    players.forEach((p) => {
      ctx.beginPath();
      ctx.arc(
        p.x * tileSize + tileSize / 2,
        p.y * tileSize + tileSize / 2,
        18,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = p.team;
      ctx.fill();

      if (p.hasBall) {
        ctx.beginPath();
        ctx.arc(
          p.x * tileSize + tileSize / 2,
          p.y * tileSize + tileSize / 2,
          6,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "white";
        ctx.fill();
      }

      if (selected && selected.id === p.id) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
  }, [players, selected, bgImage]);

  const movePlayer = (player, tile) => {
    const dx = Math.abs(player.x - tile.x);
    const dy = Math.abs(player.y - tile.y);
    if (dx + dy <= 3) {
      const updated = players.map((p) =>
        p.id === player.id ? { ...p, x: tile.x, y: tile.y } : p
      );
      setPlayers(updated);
    }
  };

  const attemptTackle = (from, target) => {
    const success = Math.random() < 0.5;
    if (target.hasBall && success) {
      const updated = players.map((p) => {
        if (p.id === from.id) return { ...p, hasBall: true };
        if (p.id === target.id) return { ...p, hasBall: false };
        return p;
      });
      setPlayers(updated);
      setMessage(`${from.id} stole the ball from ${target.id}`);
    } else {
      setMessage(`${from.id} failed to tackle ${target.id}`);
    }
  };

  const attemptPass = (from, to) => {
    const dx = Math.abs(from.x - to.x);
    const dy = Math.abs(from.y - to.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const chance = Math.max(0.8 - 0.1 * distance, 0.3);
    const success = Math.random() < chance;

    if (success) {
      const updated = players.map((p) => {
        if (p.id === from.id) return { ...p, hasBall: false };
        if (p.id === to.id) return { ...p, hasBall: true };
        return p;
      });
      setPlayers(updated);
      setMessage(`Pass from ${from.id} to ${to.id} succeeded!`);
    } else {
      setMessage(`Pass from ${from.id} to ${to.id} failed!`);
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const tile = getTile(e.clientX, e.clientY, canvas);
    const clicked = players.find((p) => p.x === tile.x && p.y === tile.y);

    if (selected && clicked) {
      if (clicked.team !== selected.team) {
        attemptTackle(selected, clicked);
        setSelected(null);
      } else if (clicked.id !== selected.id && selected.hasBall) {
        attemptPass(selected, clicked);
        setSelected(null);
      } else {
        setSelected(clicked);
      }
    } else if (clicked && clicked.team === "blue") {
      setSelected(clicked);
    } else if (selected && !clicked) {
      movePlayer(selected, tile);
      setSelected(null);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={fieldWidth * tileSize}
        height={fieldHeight * tileSize}
        onClick={handleCanvasClick}
        style={{ border: "1px solid #ccc" }}
      />
      <p>{message}</p>
    </div>
  );
};

export default GameCanvas;
