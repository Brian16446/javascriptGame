class MeleeEnemy extends Enemy{
    constructor(){
        super();
        this.sheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Monsters/Skeleton/Skeleton.json"].spritesheet;
        this.enemy = new PIXI.AnimatedSprite(this.sheet.animations["skeleton2_v2"]);
        this.enemy.scale.set(3);
        this.enemy.position.set(200,300);
        spritesLayer.addChild(this.enemy);
        this.type = "Melee";
        //enemies.push(this.enemy);
    }

}