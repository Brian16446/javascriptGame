class Player {

    velocityX = 0;
    velocityY = 0;
    playerDirection = "right";
    sheet;
    weaponSheet;
    weapon;
    //globalPosition = {x: 322, y: 122};
    health = 100;

    lives = 5;
    livesUIText;

    keysCollected = 0;
    keyUIText;

    goldCollected = 100;
    goldUIText;


    movePlayer(){
        player.x += this.velocityX;
        player.y += this.velocityY;
        //this.globalPosition.x += this.velocityX;
        //this.globalPosition.y += this.velocityY;
    }

    moveLeft(){
        player.textures = this.sheet.animations["WalkLeft"];
        this.setPlayerXVelocity(-5);
        player.play();
    }

    moveRight(){
        player.textures = this.sheet.animations["WalkRight"];
        this.setPlayerXVelocity(5);
        player.play();
    }

    moveUp(){
        player.textures = this.sheet.animations["WalkUp"];
        this.setPlayerYVelocity(-5);
        player.play();
    }

    moveDown(){
        player.textures = this.sheet.animations["WalkRight"];
        this.setPlayerYVelocity(5);
        player.play();
    }

    stopPlayerAnimations(){
        player.stop();
    }

    setPlayerXVelocity(speed){
        this.velocityX = speed;
    }

    setPlayerYVelocity(speed){
        this.velocityY = speed;
    }

    // Contains the player into the screen
    containPlayer(container) {

        let collision = undefined;
        //Left
        if (player.x < container.x) {            
            player.x = container.x;
            collision = "left";
        }
      
        //Top
        if (player.y < container.y) {
            player.y = container.y;
            collision = "top";
        }
      
        //Right
        if (player.x + player.width > container.width) {
            player.x = container.width - player.width;
            collision = "right";
        }
      
        //Bottom
        if (player.y + player.height > container.height) {
            player.y = container.height - player.height;
            collision = "bottom";
        }
      
        //Return the `collision` value
        return collision;
    }

    glueWeaponToCharacter(){
        this.weapon.position.set(player.x+20,player.y);
    }


    flipWeapon(direction){
        if(direction == "left" && this.playerDirection != "left"){
            this.weapon.anchor.x = 0.3;
            this.weapon.scale.x *= -1;
            this.playerDirection = "left";
        }
        else if(direction == "right" && this.playerDirection != "right"){
            this.weapon.anchor.x = 0;
            this.weapon.scale.x *= -1;
            this.playerDirection = "right";
        }
    }

    getPosition(){
        return {x: player.position.x, y: player.position.y};
    }

    stopAttack(){
        this.weapon.stop();
    }

    isEnemyNear(){

        for(let i = 0; i < enemies.length; i++){
            let enemy = enemies[i];
            //console.log(enemy);
            let enemyPosition = enemy.enemy.getBounds();

            // If the player is within a 50x50 px box around the enemy.
            if((enemyPosition.x - player.position.x > -50) && (enemyPosition.x - player.position.x < 50)){
                if((enemyPosition.y - player.position.y > -50) && (enemyPosition.y - player.position.y < 50)){
                    return enemy;
                }
            }
        }

    }

    getGlobalPosition(){
        return this.globalPosition;
    }



    drawUI(){
        let keyUI = new Sprite(resources["assets/Roguelike Sprites/Items/Keys/key.png"].texture);
        keyUI.scale.set(2);
        keyUI.position.set(1170,0);
        this.keyUIText = new Text(this.keysCollected, fontStyle);
        this.keyUIText.position.set(1230,15);

        
        let livesUI = new Sprite(resources["assets/Roguelike Sprites/Items/Gems/ruby.png"].texture);
        livesUI.scale.set(2);
        livesUI.position.set(1070,0);
        this.livesUIText = new Text(this.lives, fontStyle);
        this.livesUIText.position.set(1120,15);
        
        let goldUI = new Sprite(resources["assets/Roguelike Sprites/Items/Treasure/gold.png"].texture);
        goldUI.scale.set(2);
        goldUI.position.set(970,0);
        this.goldUIText = new Text(this.goldCollected, fontStyle);
        this.goldUIText.position.set(1020,15);

        playerLayer.addChild(keyUI, livesUI, goldUI);
        playerLayer.addChild(this.keyUIText, this.livesUIText, this.goldUIText);
        
        this.createHealthBar();
    }

    createHealthBar(){
        this.healthBar = new PIXI.Container();
        playerLayer.addChild(this.healthBar);

        let innerBar = new PIXI.Graphics();
        innerBar.beginFill(0x25501700);
        innerBar.drawRect(15, 15, 198, 20);
        innerBar.endFill();
        this.healthBar.addChild(innerBar);

        let outerBar = new PIXI.Graphics();
        outerBar.beginFill(0x00025534);
        outerBar.drawRect(15, 15, 198, 20);
        outerBar.endFill();
        this.healthBar.addChild(outerBar);

        this.healthBar.outer = outerBar;
    }



    takeDamage(){
        if(this.health > 0){
            this.health -= 1;
            this.healthBar.outer.width -= 2;
        }else{
            this.health = 100;
            this.healthBar.outer.width = 198;
            this.loseLife();
        }
    }

    loseLife(){
        this.lives--;
        this.livesUIText.text = this.lives;
    }

    gainKey(){
        this.keysCollected++;
        this.keyUIText.text = this.keysCollected;
    }

    gainLife(){
        this.lives++;
        this.livesUIText.text = this.lives;
    }

    gainGold(){
        this.goldCollected += 50;
        this.goldUIText.text = this.goldCollected;
    }

    loseKey(){
        this.keysCollected--;
        this.keyUIText.text = this.keysCollected;
    }

    setPosition(x, y){
        player.x = x;
        player.y = y;
    }
}