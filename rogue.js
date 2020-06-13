class Rogue extends Player{

    //weapon;

    constructor(){
        super();
        this.sheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Rogue/Spritesheet/Rogue.json"].spritesheet;
        player = new PIXI.AnimatedSprite(this.sheet.animations["WalkRight"]);
        player.textures = this.sheet.animations["WalkRight"];
        player.animationSpeed = 0.1;
        player.scale.set(2);
        player.position.set(322,122);
        playerLayer.addChild(player);
        this.drawUI();
    }

    equipWeapon(){
        console.log("STAFF EQUIPPED");
        this.weaponSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Items/Weapons/Shuriken/Shuriken.json"].spritesheet;
        console.log(this.weaponSheet);
        this.weapon = new PIXI.AnimatedSprite(this.weaponSheet.animations["Shuriken"]);
        this.weapon.animationSpeed = 1;
        this.weapon.scale.set(2);
        app.stage.addChild(this.weapon);
    }

    basicAttack(){
        this.weapon.play();
        this.weapon.onLoop = () => {
            // If an enemy is near
            let enemy = playerSprite.isEnemyNear();
            if(enemy != undefined){
                enemy.takeDamage();
            }
        };
    }

}