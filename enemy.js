class Enemy{

    id;
    enemy;
    life = 100;
    movementSpeed = 5;
    sheet;
    healthBar;
    steps = 50;
    stepsTaken = 0;
    direction;
    directionArray = ["Right", "Left", "Up", "Down"];
    box = [];
    enemySightRange = 400;


    constructor(){
        this.id = count;
        count ++;
        this.createHealthBar();
        let n = getRandomInt(0,3);
        this.direction = this.directionArray[n];
    }
    // All Enemies will have a health bar above their head.

    getPosition(){
        return {x: this.enemy.position.x, y: this.enemy.position.y};
    }

    setRandomPosition(){
        // work out a random position on the screen.
    }

    takeDamage(){
        if(this.life < 0){
            this.kill();
        }else{
            this.life -= 20;
            this.healthBar.outer.width -= 16;
        }
    }

    kill(){

        // Delete THIS enemy from the enemies array. NOT WORKING
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].id == this.id){
                enemies.splice(enemies.indexOf(enemies[i]), 1); 
            }
        }
        this.removeFromScreen();
    }

    removeFromScreen(){
        // Remove the sprite from the stage
        spritesLayer.removeChild(this.enemy);
        // Remove the health bar
        spritesLayer.removeChild(this.healthBar);
    }

    createHealthBar(){
        this.healthBar = new PIXI.Container();
        spritesLayer.addChild(this.healthBar);

        let innerBar = new PIXI.Graphics();
        innerBar.beginFill(0x25501700);
        innerBar.drawRect(0, 0, 96, 8);
        innerBar.endFill();
        this.healthBar.addChild(innerBar);

        let outerBar = new PIXI.Graphics();
        outerBar.beginFill(0x00025534);
        outerBar.drawRect(0, 0, 96, 8);
        outerBar.endFill();
        this.healthBar.addChild(outerBar);

        this.healthBar.outer = outerBar;


    }

    positionHealthBar(){
        this.healthBar.position.set(this.enemy.position.x - (this.enemy.width/2), this.enemy.position.y - 10);
    }


    wander(){
        if(this.stepsTaken < this.steps){
            if(this.direction == "Right"){
                this.enemy.position.x += 2;
                // Change animation
            }
            else if(this.direction == "Left"){
                this.enemy.position.x -= 2;
                // Change animation
            }
            else if(this.direction == "Up"){
                this.enemy.position.y -= 2;
                // Change animation
            }
            else if(this.direction == "Down"){
                this.enemy.position.y += 2;
                // Change animation
            }
            this.stepsTaken++;
        }else{
            this.changeDirection();
        }

        // If enemy is about to collide with a wall, change direction again.
    }


    changeDirection(){
        let n = getRandomInt(0,3);
        this.direction = this.directionArray[n];
        this.stepsTaken = 0;
    }


    drawAlertBox(){

        for(let i = 0; i < 4; i++){
            this.box[i] = new PIXI.Graphics();
            // this.box[i].lineStyle(5, 0x66CCFF)
            this.box[i].drawRect(this.enemy.position.x - this.enemySightRange, this.enemy.position.y - this.enemySightRange, this.enemySightRange * 2, this.enemySightRange * 2);
            // this.box[i].endFill();
            spritesLayer.addChild(this.box[i]);
        }

    }

    initAlertBox(){
        for(let i = 0; i < 4; i++){
            this.box[i].clear();
            this.box[i] = new PIXI.Graphics();
            // this.box[i].lineStyle(5, 0x66CCFF)
            this.box[i].drawRect(this.enemy.position.x - this.enemySightRange, this.enemy.position.y - this.enemySightRange, this.enemySightRange * 2, this.enemySightRange * 2);
            // this.box[i].endFill();
            spritesLayer.addChild(this.box[i]);
        }
    }

    playerInBox(){
        // If the player enters this box, call raycast

        let playerPos = playerSprite.getPosition();
        if((playerPos.x - this.enemy.x > - this.enemySightRange) && (playerPos.x - this.enemy.x < this.enemySightRange)){
            if((playerPos.y - this.enemy.y > - this.enemySightRange) && (playerPos.y - this.enemy.y < this.enemySightRange)){
                this.updateLine();
            }
        }
    }

    raycast(){
        // Draw a line with start x,y at this enemy and end x,y at the player
        this.line = new PIXI.Graphics();
        // this.line.beginFill(0x66CCFF);
        this.line.lineStyle()
            .moveTo(this.enemy.position.x, this.enemy.position.y)
            .lineTo(player.position.x, player.position.y);
        spritesLayer.addChild(this.line);
    }

    updateLine(){
        // Updates the line end x,y to be the new player x,y so it keeps tracking player
        this.line.clear();
        this.line = new PIXI.Graphics();
        // this.line.beginFill(0x66CCFF);
        let playerPos = playerSprite.getPosition();
        this.line.lineStyle()
            .moveTo(this.enemy.position.x, this.enemy.position.y)
            .lineTo(playerPos.x, playerPos.y);
        spritesLayer.addChild(this.line);

        this.checkRaycast();
    }
    
    checkRaycast(){
        // Check if any box/room object is colliding with the line
        // if there is, call wander (stops chasing the player)
        // if there isn't, call updateLine()
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].roomOutline.x < this.line.getBounds().x && rooms[i].roomOutline.x > this.line.getBounds().x + this.line.getBounds().width){
                console.log("true");
                this.wander();
            }
        }

        this.chasePlayer();
    }

    chasePlayer(){
        // Enemy x,y = player x,y

        this.initAlertBox();
        let target = playerSprite.getPosition();
        let attackRange = 32; // Buffer so that the x doesn't have to be exactly equal for enemies to hit. 
        
        if(this.enemy.position.x > target.x + attackRange){
            this.enemy.position.x -= 1;
        }
        else if(this.enemy.position.x < (target.x + attackRange)){
            this.enemy.position.x += 1;
        }
    
        if(this.enemy.position.y > target.y){
            this.enemy.position.y -= 1;
        }
        else if(this.enemy.position.y < target.y){
            this.enemy.position.y += 1;
        }

        this.checkPlayerInRange();
        // if enemy in range of player, attackplayer();
    }

    checkPlayerInRange(){
        let playerPos = playerSprite.getPosition();
        if((playerPos.x - this.enemy.x > - 64) && (playerPos.x - this.enemy.x < 64)){
            if((playerPos.y - this.enemy.y > - 64) && (playerPos.y - this.enemy.y < 64)){
                this.attackPlayer();
            }
        }
    }

    attackPlayer(){
        playerSprite.takeDamage();
    }

}