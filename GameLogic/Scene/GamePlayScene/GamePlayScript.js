document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const board = document.getElementById('game-board');
    const teamAScoreEl = document.getElementById('teamA-score');
    const teamBScoreEl = document.getElementById('teamB-score');
    const turnCounterEl = document.getElementById('turn-counter');
    const maxTurnsEl = document.getElementById('max-turns');
    const currentTeamEl = document.getElementById('current-team');
    const ballOwnerEl = document.getElementById('ball-owner');
    const selectedPlayerNameEl = document.getElementById('selected-player-name');
    const shootBtn = document.getElementById('shoot-btn');
    const moveBtn = document.getElementById('move-btn');
    const passBtn = document.getElementById('pass-btn');
    const tackleBtn = document.getElementById('tackle-btn');
    const getBallBtn = document.getElementById('get-ball-btn');
    const logList = document.getElementById('log-list');

    // --- Game State ---
    let selectedPlayer = null;
    let game;

    // --- Game Classes (from gamePlay.js, adapted for web) ---
    class Map {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
    }

    class GoalPost {
        constructor(position) {
            this.position = position; // {x, y}
        }
    }

    class Ball {
        constructor() {
            this.position = { x: 0, y: 0 };
            this.owner = null; // Player object
        }
    }

    class Player {
        constructor(id, name, attack, defense, move, teamName) {
            this.id = id;
            this.name = name;
            this.attack = attack;
            this.defense = defense;
            this.moveStat = move;
            this.teamName = teamName;
            this.position = { x: 0, y: 0 };
        }

        move(x, y) {
            log(`${this.name}가 (${x},${y})로 이동`);
            this.position = { x, y };
        }

        pass(targetPlayer, ball) {
            if (ball.owner !== this) {
                log(`${this.name}가 공을 가지고 있지 않습니다.`);
                return false;
            }
            const distance =
                Math.abs(this.position.x - targetPlayer.position.x) +
                Math.abs(this.position.y - targetPlayer.position.y);
            const successRate = Math.max(100 - distance * 10, 10);
            const roll = Math.random() * 100;

            if (roll <= successRate) {
                ball.owner = targetPlayer;
                log(`${this.name}가 ${targetPlayer.name}에게 패스 성공!`);
                return true;
            } else {
                ball.owner = null;
                log(`${this.name}의 패스 실패!`);
                return false;
            }
        }

        stealBall(opponent, ball) {
            if (ball.owner !== opponent) {
                log(`${opponent.name}가 공을 가지고 있지 않습니다.`);
                return false;
            }
            const successRate = (this.defense / (this.defense + opponent.attack)) * 100;
            const roll = Math.random() * 100;

            if (roll <= successRate) {
                ball.owner = this;
                log(`${this.name}가 ${opponent.name}의 공을 가로챘습니다!`);
                return true;
            } else {
                log(`${this.name}의 공 탈취 실패!`);
                return false;
            }
        }

        shoot(goal, ball) {
            if (ball.owner !== this) {
                log(`${this.name}가 공을 가지고 있지 않습니다.`);
                return false;
            }
            const distance =
                Math.abs(this.position.x - goal.position.x) +
                Math.abs(this.position.y - goal.position.y);

            const successRate = Math.max(10, 80 - distance * 10 + this.attack * 2);
            const roll = Math.random() * 100;

            if (roll <= successRate) {
                log(`${this.name}의 슛 성공!`);
                return true;
            } else {
                log(`${this.name}의 슛 실패!`);
                return false;
            }
        }
    }

    class Team {
        constructor(name, players) {
            this.name = name;
            this.players = players;
            this.score = 0;
        }
    }

    class Game {
        constructor(teamA, teamB, ball, gameMap, goalA, goalB) {
            this.teams = [teamA, teamB];
            this.ball = ball;
            this.gameMap = gameMap;
            this.goalA = goalA;
            this.goalB = goalB;
            this.currentTurnIndex = 0;
            this.turnCount = 0;
            this.maxTurns = 20;
            this.isGameOver = false;
            this.initialPlayerPositions = {}; // Use a plain object to store initial positions
        }

        get currentTeam() {
            return this.teams[this.currentTurnIndex];
        }

        get opponentTeam() {
            return this.teams[(this.currentTurnIndex + 1) % 2];
        }

        nextTurn() {
            this.turnCount++;
            if (this.turnCount >= this.maxTurns) {
                this.endGame();
                return;
            }
            this.currentTurnIndex = (this.currentTurnIndex + 1) % 2;
            log(`--- ${this.currentTeam.name}의 턴 시작 ---`);
            updateUI();
        }

        start() {
            const startingTeam = Math.random() < 0.5 ? this.teams[0] : this.teams[1];
            const randomPlayer =
                startingTeam.players[Math.floor(Math.random() * startingTeam.players.length)];
            this.ball.owner = randomPlayer;
            this.currentTurnIndex = this.teams.indexOf(startingTeam);
            log(`${this.ball.owner.name}가 공을 가지고 시작합니다.`);
            log(`--- ${this.currentTeam.name}의 턴 시작 ---`);
            updateUI();
            render();
        }

        endGame() {
            this.isGameOver = true;
            log('게임 종료!');
            log(`최종 점수: ${this.teams[0].name} ${this.teams[0].score} : ${this.teams[1].score} ${this.teams[1].name}`);
            alert('게임 종료!');
        }

        resetPositions() {
            for (const player of [...this.teams[0].players, ...this.teams[1].players]) {
                if (this.initialPlayerPositions[player.id]) {
                    player.position = { ...this.initialPlayerPositions[player.id] };
                }
            }
            this.ball.position = { x: 3, y: 2 }; // Reset ball to center
            log('선수 위치가 초기화되었습니다.');
        }

        handleAction(action, params) {
            if (this.isGameOver) return;

            switch (action) {
                case 'shoot':
                    const isTeamA = this.currentTeam === this.teams[0];
                    const playerX = selectedPlayer.position.x;

                    // Check if the player is in the opponent's half
                    if ((isTeamA && playerX <= 3) || (!isTeamA && playerX >= 3)) {
                        log('상대 진영에서만 슛을 할 수 있습니다.');
                        return; // Do not proceed with the shot, and don't end the turn.
                    }

                    const opponentGoal = isTeamA ? this.goalB : this.goalA;
                    if (selectedPlayer.shoot(opponentGoal, this.ball)) {
                        this.currentTeam.score++;
                        log(`${this.currentTeam.name}이(가) 득점했습니다!`);
                        this.resetPositions(); // Reset positions after a goal
                        // Give ball to the other team
                        const randomOpponent = this.opponentTeam.players[Math.floor(Math.random() * this.opponentTeam.players.length)];
                        this.ball.owner = randomOpponent;
                        log(`${randomOpponent.name}가 공을 가지고 경기를 재개합니다.`);
                    } else {
                        // On miss, ball goes to a random position
                        this.ball.owner = null;
                        this.ball.position.x = Math.floor(Math.random() * this.gameMap.width);
                        this.ball.position.y = Math.floor(Math.random() * this.gameMap.height);
                        log(`공이 (${this.ball.position.x}, ${this.ball.position.y})에 떨어졌습니다.`);
                    }
                    this.nextTurn();
                    break;

                case 'move':
                    const { x, y } = params;
                    const distance = Math.abs(selectedPlayer.position.x - x) + Math.abs(selectedPlayer.position.y - y);
                    if (distance <= selectedPlayer.moveStat) {
                        selectedPlayer.move(x, y);
                    } else {
                        log('이동할 수 없는 거리입니다.');
                        return; // 턴을 넘기지 않음
                    }
                    this.nextTurn();
                    break;

                case 'pass':
                    const receiver = params.receiver;
                    if (receiver) {
                        selectedPlayer.pass(receiver, this.ball);
                    } else {
                        log('잘못된 선택입니다.');
                        return; // 턴을 넘기지 않음
                    }
                    this.nextTurn();
                    break;

                case 'tackle':
                    const opponentWithBall = this.opponentTeam.players.find(p => this.ball.owner === p);
                    if (opponentWithBall) {
                        const tackleDistance = Math.abs(selectedPlayer.position.x - opponentWithBall.position.x) + Math.abs(selectedPlayer.position.y - opponentWithBall.position.y);
                        if (tackleDistance <= 1) {
                            selectedPlayer.stealBall(opponentWithBall, this.ball);
                        } else {
                            log('태클하기에는 너무 멉니다.');
                            return; // 턴을 넘기지 않음
                        }
                    } else {
                        log('상대방이 공을 가지고 있지 않습니다.');
                        return; // 턴을 넘기지 않음
                    }
                    this.nextTurn();
                    break;

                case 'getBall':
                    if (!this.ball.owner) {
                        const dist = Math.abs(selectedPlayer.position.x - this.ball.position.x) + Math.abs(selectedPlayer.position.y - this.ball.position.y);
                        if (dist <= 1) {
                            this.ball.owner = selectedPlayer;
                            log(`${selectedPlayer.name}가 공을 잡았습니다.`);
                            this.nextTurn();
                        } else {
                            log('공을 잡기에는 너무 멉니다.');
                            return; // 턴을 넘기지 않음
                        }
                    } else {
                        log('이미 다른 선수가 공을 소유하고 있습니다.');
                        return; // 턴을 넘기지 않음
                    }
                    break;
            }
            deselectPlayer();
            render();
            updateUI();
        }
    }

    // --- Game Initialization ---
    function initGame() {
        const gameMap = new Map(7, 5);
        const goalA = new GoalPost({ x: 0, y: 2 });
        const goalB = new GoalPost({ x: 6, y: 2 });
        const ball = new Ball();
        ball.position = { x: 3, y: 2 };

        const playerA1 = new Player(1, 'A1', 8, 5, 3, 'teamA');
        playerA1.position = { x: 2, y: 2 };
        const playerA2 = new Player(2, 'A2', 8, 5, 3, 'teamA');
        playerA2.position = { x: 1, y: 1 };
        const playerA3 = new Player(3, 'A3', 8, 5, 3, 'teamA');
        playerA3.position = { x: 1, y: 3 };

        const playerB1 = new Player(4, 'B1', 7, 6, 3, 'teamB');
        playerB1.position = { x: 4, y: 2 };
        const playerB2 = new Player(5, 'B2', 7, 6, 3, 'teamB');
        playerB2.position = { x: 5, y: 1 };
        const playerB3 = new Player(6, 'B3', 7, 6, 3, 'teamB');
        playerB3.position = { x: 5, y: 3 };

        const teamA = new Team('Team A', [playerA1, playerA2, playerA3]);
        const teamB = new Team('Team B', [playerB1, playerB2, playerB3]);

        game = new Game(teamA, teamB, ball, gameMap, goalA, goalB);

        // Store initial positions before starting the game
        const allPlayers = [...teamA.players, ...teamB.players];
        allPlayers.forEach(p => {
            game.initialPlayerPositions[p.id] = { ...p.position };
        });

        game.start();
    }

    // --- Rendering and UI ---
    function render() {
        board.innerHTML = '';
        for (let y = 0; y < game.gameMap.height; y++) {
            for (let x = 0; x < game.gameMap.width; x++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                board.appendChild(cell);
            }
        }

        // Render goals
        const goalACell = getCell(game.goalA.position.x, game.goalA.position.y);
        const goalBCell = getCell(game.goalB.position.x, game.goalB.position.y);
        goalACell.style.backgroundColor = 'lightblue';
        goalBCell.style.backgroundColor = 'lightcoral';

        // Render players
        const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
        allPlayers.forEach(p => {
            const playerEl = document.createElement('div');
            playerEl.classList.add('player', p.teamName);
            playerEl.textContent = p.name;
            playerEl.dataset.playerId = p.id;
            if (game.ball.owner === p) {
                playerEl.style.fontWeight = 'bold';
                playerEl.textContent += '*';
            }
            if (selectedPlayer === p) {
                playerEl.classList.add('selected');
            }
            const cell = getCell(p.position.x, p.position.y);
            cell.appendChild(playerEl);
        });

        // Render ball
        if (!game.ball.owner) {
            const ballEl = document.createElement('div');
            ballEl.classList.add('ball');
            const cell = getCell(game.ball.position.x, game.ball.position.y);
            cell.appendChild(ballEl);
        }
    }

    function updateUI() {
        teamAScoreEl.textContent = game.teams[0].score;
        teamBScoreEl.textContent = game.teams[1].score;
        turnCounterEl.textContent = game.turnCount;
        maxTurnsEl.textContent = game.maxTurns;
        currentTeamEl.textContent = game.currentTeam.name;
        ballOwnerEl.textContent = game.ball.owner ? game.ball.owner.name : 'None';

        if (selectedPlayer) {
            selectedPlayerNameEl.textContent = selectedPlayer.name;
            const isTeamA = selectedPlayer.teamName === 'teamA';
            const canShoot = game.ball.owner === selectedPlayer &&
                           ((isTeamA && selectedPlayer.position.x > 3) || 
                           (!isTeamA && selectedPlayer.position.x < 3));

            const canGetBall = !game.ball.owner && (Math.abs(selectedPlayer.position.x - game.ball.position.x) + Math.abs(selectedPlayer.position.y - game.ball.position.y) <= 1);

            shootBtn.disabled = !canShoot;
            moveBtn.disabled = false;
            passBtn.disabled = game.ball.owner !== selectedPlayer;
            tackleBtn.disabled = game.ball.owner === selectedPlayer || !game.opponentTeam.players.some(p => game.ball.owner === p);
            getBallBtn.disabled = !canGetBall;
        } else {
            selectedPlayerNameEl.textContent = 'None';
            shootBtn.disabled = true;
            moveBtn.disabled = true;
            passBtn.disabled = true;
            tackleBtn.disabled = true;
            getBallBtn.disabled = true;
        }
    }

    function log(message) {
        const li = document.createElement('li');
        li.textContent = message;
        logList.appendChild(li);
        logList.scrollTop = logList.scrollHeight; // Auto-scroll
    }

    function getCell(x, y) {
        return document.querySelector(`.grid-cell[data-x='${x}'][data-y='${y}']`);
    }

    function selectPlayer(player) {
        if (game.isGameOver) return;
        if (game.currentTeam.players.includes(player)) {
            selectedPlayer = player;
            updateUI();
            render();
        } else {
            log('현재 턴의 팀 소속 선수가 아닙니다.');
        }
    }

    function deselectPlayer() {
        selectedPlayer = null;
        updateUI();
        render();
    }

    // --- Event Handlers ---
    board.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('player')) {
            const playerId = parseInt(target.dataset.playerId);
            const player = [...game.teams[0].players, ...game.teams[1].players].find(p => p.id === playerId);
            selectPlayer(player);
        } else if (target.classList.contains('grid-cell') && selectedPlayer) {
            // This is for move action
            const x = parseInt(target.dataset.x);
            const y = parseInt(target.dataset.y);
            game.handleAction('move', { x, y });
        }
    });

    shootBtn.addEventListener('click', () => {
        if (selectedPlayer) {
            game.handleAction('shoot');
        }
    });

    moveBtn.addEventListener('click', () => {
        if (selectedPlayer) {
            log('이동할 위치를 맵에서 클릭하세요.');
            // The actual move is handled by the board click event
        }
    });

    passBtn.addEventListener('click', () => {
        if (selectedPlayer) {
            const teammates = game.currentTeam.players.filter(p => p !== selectedPlayer);
            const receiverName = prompt(`누구에게 패스하시겠습니까?\n` + teammates.map((p, i) => `${i + 1}. ${p.name}`).join('\n'));
            if (receiverName) {
                const receiver = teammates[parseInt(receiverName) - 1];
                if (receiver) {
                    game.handleAction('pass', { receiver });
                } else {
                    log('잘못된 선택입니다.');
                }
            }
        }
    });

    tackleBtn.addEventListener('click', () => {
        if (selectedPlayer) {
            game.handleAction('tackle');
        }
    });

    getBallBtn.addEventListener('click', () => {
        if (selectedPlayer) {
            game.handleAction('getBall');
        }
    });

    // --- Start Game ---
    initGame();
});
