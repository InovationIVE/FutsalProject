import WebSocket, { WebSocketServer } from "ws";
import { Player } from "./game/Player.js";
import { Team } from "./game/Team.js";
import { Game } from "./game/Game.js";

// 방 목록
const rooms = new Map();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", ws => {
  ws.on("message", msg => {
    try {
      const data = JSON.parse(msg);
      if (data.type === "CREATE_ROOM") {
        const roomId = Date.now().toString();
        const teamA = new Team("Red", [
          new Player(1, "A1", 70, 40, 3, { x: 2, y: 3 }),
          new Player(2, "A2", 60, 50, 2),
          new Player(3, "A3", 65, 45, 3)
        ]);
        const teamB = new Team("Blue", [
          new Player(4, "B1", 75, 35, 3, { x: 5, y: 3 }),
          new Player(5, "B2", 55, 55, 2),
          new Player(6, "B3", 60, 50, 3)
        ]);
        const game = new Game(roomId, teamA, teamB);
        rooms.set(roomId, { game, clients: [ws] });
        ws.send(JSON.stringify({ type: "ROOM_CREATED", roomId, state: game.getState() }));
      }

      if (data.type === "JOIN_ROOM") {
        const room = rooms.get(data.roomId);
        if (room) {
          room.clients.push(ws);
          ws.send(JSON.stringify({ type: "JOIN_SUCCESS", state: room.game.getState() }));
        }
      }

      if (data.type === "ACTION") {
        const room = rooms.get(data.roomId);
        if (!room) return;
        const game = room.game;
        const result = game.handleAction(data.action, data.payload);
        if (!game.isGameOver()) game.nextTurn();

        // 모든 클라이언트에게 상태 브로드캐스트
        for (const client of room.clients) {
          client.send(JSON.stringify({
            type: "STATE_UPDATE",
            success: result,
            state: game.getState()
          }));
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  });
});

console.log("WebSocket 서버가 8080 포트에서 실행 중입니다.");
