class BossEnemy extends Enemy{
    constructor(){
        super();
        this.sheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Wizard/Spritesheet/wizard.json"].spritesheet;
        this.enemy = new PIXI.AnimatedSprite(this.sheet.animations["Wizard"]);
        this.enemy.scale.set(3);
        this.enemy.position.set(800,600);
        spritesLayer.addChild(this.enemy);
        this.type = "Ranged";

        //enemies.push(this.enemy);
    }

}