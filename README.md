# Serveur Puissance 4

Ce serveur Node.js gère la logique multijoueur du jeu Puissance 4 en utilisant Socket.IO pour la communication en temps réel.

## Prérequis

- Node.js (version 12.0.0 ou supérieure)
- npm (normalement installé avec Node.js)

## Installation

1. Clonez ce dépôt ou créez un nouveau dossier pour le projet :
```bash
mkdir puissance4-server
cd puissance4-server
```

2. Initialisez un projet Node.js :
```bash
npm init -y
```

3. Installez les dépendances requises :
```bash
npm install express socket.io
```

4. Créez un fichier `server.js` et copiez-y le code du serveur.

## Configuration

Le serveur utilise les configurations par défaut suivantes :
- Port : 3000
- Protocol : HTTP
- Transport : WebSocket

Pour modifier le port, vous pouvez changer la ligne :
```javascript
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Démarrage du serveur

Pour démarrer le serveur :
```bash
node server.js
```

## Fonctionnalités

Le serveur gère :
- La connexion des joueurs
- L'attribution des couleurs (Rouge = joueur 1, Jaune = joueur 2)
- La gestion des tours
- La synchronisation des mouvements entre les joueurs
- Les déconnexions des joueurs
- Le redémarrage des parties

## Architecture

Le serveur utilise :
- `express` pour le serveur HTTP
- `socket.io` pour la communication en temps réel
- Une Map pour stocker les parties en cours

## Événements Socket.IO

### Événements entrants (depuis le client)
- `make_move` : Reçoit un mouvement d'un joueur
- `new_game` : Démarre une nouvelle partie
- `disconnect` : Gère la déconnexion d'un joueur

### Événements sortants (vers le client)
- `game_start` : Informe les joueurs du début de la partie
- `move` : Transmet un mouvement aux joueurs
- `opponent_left` : Informe qu'un joueur s'est déconnecté

## Sécurité

Points à noter :
- Le serveur valide tous les mouvements reçus
- Seul le joueur dont c'est le tour peut jouer
- Les déconnexions sont gérées proprement

## Tests

Pour tester le serveur :
1. Démarrez le serveur
2. Lancez deux instances de l'application cliente
3. Vérifiez que :
   - Les joueurs peuvent se connecter
   - Les mouvements sont synchronisés
   - Les tours alternent correctement
   - Les déconnexions sont gérées

## Dépannage

Problèmes courants :
1. Le serveur ne démarre pas :
   - Vérifiez que le port 3000 est disponible
   - Vérifiez que Node.js est installé correctement

2. Les clients ne peuvent pas se connecter :
   - Vérifiez que le serveur est en cours d'exécution
   - Vérifiez que l'URL de connexion est correcte
   - Vérifiez les paramètres de pare-feu

## Support

Pour signaler un bug ou suggérer une amélioration :
1. Créez une issue sur le dépôt
2. Décrivez le problème ou la suggestion
3. Incluez les étapes pour reproduire le problème
