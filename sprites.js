class Chest{

    chestOpen = false;
    initialPosition;

    constructor(x, y){
        this.chestSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Items/Chests/chest.json"].spritesheet;
        this.object = new PIXI.AnimatedSprite(this.chestSheet.animations["chest"]);
        this.object.textures = this.chestSheet.animations["chest"];
        this.object.animationSpeed = 0.2;
        this.object.scale.set(3);
        this.object.position.set(x,y);
        this.object.loop = false;
        spritesLayer.addChild(this.object);

        this.initialPosition = {x: this.object.position.x, y: this.object.position.y};
    }

    openChest(){
        if(this.chestOpen == false){
            this.object.play();
            console.log("LOOTS");
            this.chestOpen = true;
            this.lootGold();
        }
    }

    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }
    

    lootGold(){
        for(let i = 0; i < 5; i++){
            let offset = getRandomInt(-280, 100);
            let coins = new Gold(this.object.position.x + offset, this.object.position.y+50);
            golds.push(coins);
        }
    }

    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.object);
    }
}

class Door{
    isDoorOpen = false;
    doorOpenedAtLeastOnce = false;

    constructor(x, y){
        this.x = x;
        this.object = new Sprite(resources["assets/Roguelike Sprites/Doors/door-left.png"].texture);
        this.object.scale.set(4);
        this.object.position.set(x,y);

        this.doorRight = new Sprite(resources["assets/Roguelike Sprites/Doors/door-right.png"].texture);
        this.doorRight.scale.set(4);
        this.doorRight.position.set(x+48,y);
        playerLayer.addChild(this.object, this.doorRight);
    }

    openDoors(){
        // if the doorleft position equals the x position passed, the door has not been opened yet
        if(!this.isDoorOpen){
            if(this.doorOpenedAtLeastOnce == false){
                if(playerSprite.keysCollected > 0){
                    this.object.position.x -= 48;
                    this.doorRight.position.x += 48;
                    this.isDoorOpen = true;
                    this.doorOpenedAtLeastOnce = true;
                    playerSprite.loseKey();
                }
            }else{
                this.object.position.x -= 48;
                this.doorRight.position.x += 48;
                this.isDoorOpen = true;
                this.doorOpenedAtLeastOnce = true;
            }
        }else{
            this.object.position.x += 48;
            this.doorRight.position.x -= 48;
            this.isDoorOpen = false;
        }
    }

    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }

    getIsDoorOpen(){
        return this.isDoorOpen;
    }

    moveDoorLeft(){
        this.object.position.x -= 5;
        this.doorRight.position.x -= 5;
    }

    moveDoorRight(){
        this.object.position.x += 5;
        this.doorRight.position.x += 5;
    }
    
    moveDoorUp(){
        this.object.position.y += 5;
        this.doorRight.position.y += 5;
    }

    moveDoorDown(){
        this.object.position.y -= 5;
        this.doorRight.position.y -= 5;
    }

    removeFromScreen(){
        // Remove the sprite from the stage
        playerLayer.removeChild(this.object);
        playerLayer.removeChild(this.doorRight);
    }
}


class Key{
    constructor(x, y){
        this.object = new Sprite(resources["assets/Roguelike Sprites/Items/Keys/key.png"].texture);
        this.object.scale.set(2);
        this.object.position.set(x,y);
        spritesLayer.addChild(this.object);

        this.id = count;
        count ++;
    }

    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }

    collectKey(){
        this.destroyKey();
        playerSprite.gainKey();
    }

    destroyKey(){
        for(let i = 0; i < keys.length; i++){
            if(keys[i].id == this.id){
                keys.splice(keys.indexOf(keys[i]), 1); 
            }
        }
        spritesLayer.removeChild(this.object);
    }
    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.object);
    }
}


class Gold{
    constructor(x, y){
        this.object = new Sprite(resources["assets/Roguelike Sprites/Items/Treasure/gold.png"].texture);
        this.object.scale.set(2);
        this.object.position.set(x,y);
        spritesLayer.addChild(this.object);

        this.id = goldCount;
        goldCount ++;
    }

    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }

    collectGold(){
        this.destroyGold();
        playerSprite.gainGold();
    }

    destroyGold(){
        for(let i = 0; i < golds.length; i++){
            if(golds[i].id == this.id){
                golds.splice(golds.indexOf(golds[i]), 1); 
            }
        }
        spritesLayer.removeChild(this.object);
    }

    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.object);
    }
}


class Life{
    constructor(x, y){
        this.object = new Sprite(resources["assets/Roguelike Sprites/Items/Gems/ruby.png"].texture);
        this.object.scale.set(2);
        this.object.position.set(x,y);
        spritesLayer.addChild(this.object);

        this.id = lifeCount;
        lifeCount ++;
    }

    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }

    collectLife(){
        this.destroyLife();
        playerSprite.gainLife();
    }

    destroyLife(){
        for(let i = 0; i < lifes.length; i++){
            if(lifes[i].id == this.id){
                lifes.splice(keys.indexOf(lifes[i]), 1); 
            }
        }
        spritesLayer.removeChild(this.object);
    }

    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.object);
    }
}