class Npc{
    
    message;
    talking = false;

    constructor(type, xPosition, yPosition, message){
        this.object = new Sprite(resources[`assets/Roguelike Sprites/Npc/${type}.png`].texture);
        this.object.scale.set(2);
        this.object.position.set(xPosition,yPosition);
        spritesLayer.addChild(this.object);
        this.message = message;
    }
    
    getPosition(){
        return {x: this.object.position.x, y: this.object.position.y};
    }

    talk(){
        if(this.talking == false){
            console.log("npc says something");
            this.textbox = new Sprite(resources["assets/Roguelike Sprites/UI/textbox.png"].texture);
            this.textbox.scale.set(4);
            this.textbox.position.set(440, 500);
            playerLayer.addChild(this.textbox);
    
            this.textboxText = new Text(this.message);
            this.textboxText.scale.set(1);
            this.textboxText.position.set(460, 510);
            playerLayer.addChild(this.textboxText);
            this.talking = true;
        }else{
            this.stopTalking();
        }
    }

    stopTalking(){
        playerLayer.removeChild(this.textbox, this.textboxText);
        this.talking = false;
    }
    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.object);
    }

}