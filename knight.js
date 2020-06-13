class Knight extends Player{

    
    constructor(){
        super();
        this.sheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Knight/Spritesheet/Knight.json"].spritesheet;
        player = new PIXI.AnimatedSprite(this.sheet.animations["WalkRight"]);
        player.textures = this.sheet.animations["WalkRight"];
        player.animationSpeed = 0.2;
        player.scale.set(2);
        player.position.set(322,122);
        playerLayer.addChild(player);
        this.drawUI();
    }

    equipWeapon(){
        console.log("SWORD EQUIPPED");
        this.weaponSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Items/Weapons/Sword/weapon.json"].spritesheet;
        this.weapon = new PIXI.AnimatedSprite(this.weaponSheet.animations["weapon"]);
        this.weapon.animationSpeed = 0.75;
        this.weapon.position.set(300,200);
        this.weapon.scale.set(2);
        this.weapon.loop = true;
        playerLayer.addChild(this.weapon);
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