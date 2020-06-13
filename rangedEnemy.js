class RangedEnemy extends Enemy{
    constructor(){
        super();
        this.sheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Monsters/Caster/Caster.json"].spritesheet;
        this.enemy = new PIXI.AnimatedSprite(this.sheet.animations["vampire_v2"]);
        this.enemy.scale.set(3);
        this.enemy.position.set(400,600);
        spritesLayer.addChild(this.enemy);
        this.type = "Ranged";

        //enemies.push(this.enemy);
    }

}