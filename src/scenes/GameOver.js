import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene{
    constructor() {
        super('gameover');
    }

    init(data) {
        /* getting data from other scene */
        this.scoreFinal = data.score;
    }

    preload() {
        /* loading images */
        this.load.image('background', './src/assets/img/galaxy.png');
        this.load.image('gameOver', './src/assets/img/gameOver.png');
        this.load.image('home', './src/assets/img/home.png');
        this.load.image('restart', './src/assets/img/restart.png');

        /* loading audio */
        this.load.audio('gameOverSound', './src/assets/audio/game-over-sound.mp3');
    }
    
    create() {
        /* adding audio */
        // this.gameOverAudio = this.sound.add('gameOverSound', {loop: false, volume: 0.1});
        // this.gameOverAudio.play();

        /* standard data */
        const {width , height} = this.scale;
        const style = { color: '#000', fontSize: 24 };

        /* adding backgrond and gameOver images */
        this.add.image(width/2, height/2, 'background');
        this.add.image(width/2, 150, 'gameOver').setScale(0.3);

        /* adding text */
        this.add.text(width/2, 350,`Your score was: ${this.scoreFinal}`, style).setOrigin(0.5);
        
        /* adding buttons and his actions */
        const restart = this.add.image(100,490,'restart').setScale(0.15).setInteractive();
        const home = this.add.image(300,490,'home').setScale(0.15).setInteractive();

        /* home button actions */
        home.on('pointerover', () => {home.setScale(0.22)});
        home.on('pointerout', () => {home.setScale(0.15)});
        home.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.stop('pause');
            this.scene.start('start');
            this.game.sound.stopAll();
        });

        /* restart button actions */
        restart.on('pointerover', () => {restart.setScale(0.22);})
        restart.on('pointerout', () => {restart.setScale(0.15);})
        restart.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.stop('pause');
            this.scene.start('game');
            this.game.sound.stopAll();
        })
    }
    
    update() {}
}
