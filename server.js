// server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let waitingPlayer = null;
let games = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  if (waitingPlayer === null) {
    waitingPlayer = socket;
    console.log('Player 1 waiting');
  } else {
    console.log('Player 2 joined, starting game');
    const player1 = waitingPlayer;
    const player2 = socket;

    // Créer une nouvelle partie
    games.set(player1.id, {
      player1: player1,
      player2: player2,
      currentPlayer: player1,
      board: Array(6).fill().map(() => Array(7).fill(0))
    });
    games.set(player2.id, games.get(player1.id));

    // Informer les joueurs que la partie commence
    player1.emit('game_start', { player: 1 });
    player2.emit('game_start', { player: 2 });

    waitingPlayer = null;
  }

  socket.on('make_move', (data) => {
    const game = games.get(socket.id);
    if (!game) return;

    const { col, player } = data;
    const board = game.board;

    // Trouver la première position libre dans la colonne
    let row = 5;
    while (row >= 0 && board[row][col] !== 0) {
      row--;
    }

    if (row >= 0) {
      board[row][col] = player;
      const nextPlayer = player === 1 ? 2 : 1;

      // Informer les deux joueurs du mouvement
      game.player1.emit('move', { row, col, player, nextPlayer });
      game.player2.emit('move', { row, col, player, nextPlayer });
    }
  });

  socket.on('new_game', () => {
    const game = games.get(socket.id);
    if (!game) return;

    // Réinitialiser le plateau
    game.board = Array(6).fill().map(() => Array(7).fill(0));
    
    // Informer les joueurs de la nouvelle partie
    game.player1.emit('game_start', { player: 1 });
    game.player2.emit('game_start', { player: 2 });
  });

  socket.on('disconnect', () => {
    if (waitingPlayer === socket) {
      waitingPlayer = null;
    }

    const game = games.get(socket.id);
    if (game) {
      if (game.player1 === socket) {
        game.player2.emit('opponent_left');
      } else {
        game.player1.emit('opponent_left');
      }
      games.delete(game.player1.id);
      games.delete(game.player2.id);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});