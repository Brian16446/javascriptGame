class Room{

    roomOutline;
    walls;
    door;
    doorPosition;
    playerIsInRoom = false;

    constructor(walls, roomOutline){
        this.walls = walls;
        this.roomOutline = roomOutline;
        this.drawWalls();
        this.doorPosition = {x: this.walls[2].x + (this.walls[2].width / 2 - 64), y: this.walls[2].y - 32};
        this.door = new Door(this.walls[2].x + (this.walls[2].width / 2 - 64),this.walls[2].y - 32);
        doors.push(this.door);
    }

    drawWalls(){
        let rect = [];
        for(let i = 0; i < 4; i++){
            rect[i] = new PIXI.Graphics();
            // rect[i].beginFill(0x66CCFF);
            rect[i].drawRect(this.walls[i].x, this.walls[i].y, this.walls[i].width, this.walls[i].height);
            // rect[i].endFill();
            spritesLayer.addChild(rect[i]);
        }
    }

    wallCollider(player){
        this.leftWallCollider(player, this.walls[0]);
        this.rightWallCollider(player, this.walls[1]);
        this.topWallCollider(player, this.walls[2]);
        this.bottomWallCollider(player, this.walls[3]);
    }

    leftWallCollider(player, box){
        let playerGlobalPosition = player.getGlobalPosition();        
        if ((playerGlobalPosition.y + player.height > box.y) && (playerGlobalPosition.y < (box.y + box.height))){
            if(((playerGlobalPosition.x + player.width) > box.x) && ((playerGlobalPosition.x + player.width) < (box.x + (box.width / 2)))){
                player.x = (box.x - player.width);
            }   
        }
    }
    
    rightWallCollider(player, box){
        let playerGlobalPosition = player.getGlobalPosition();
        if ((playerGlobalPosition.y + player.height > box.y) && (playerGlobalPosition.y < (box.y + box.height))){
            if((playerGlobalPosition.x < (box.x + box.width)) && (playerGlobalPosition.x > (box.x + (box.width / 2)))){
                player.x = (box.x + box.width);
            }
        }
    }

    topWallCollider(player, box){
        let playerGlobalPosition = player.getGlobalPosition();
        if( ((playerGlobalPosition.x + player.width) > box.x) && ( playerGlobalPosition.x < (box.x + box.width)) ){
            if( ((playerGlobalPosition.y + player.height) > box.y) && ( (playerGlobalPosition.y + player.height) < (box.y + (box.height / 2)))){
                
                if(playerGlobalPosition.x > this.doorPosition.x - 64 && playerGlobalPosition.x < this.doorPosition.x + 64){                     
                    if(this.door.getIsDoorOpen()){
                        // walk through
                        this.playerIsInRoom = true;
                    }
                    else{
                        player.y = box.y - player.height;
                    }
                } else{
                    player.y = box.y - player.height;
                }
            }
        }
    }

    bottomWallCollider(player, box){
        let playerGlobalPosition = player.getGlobalPosition();
        if( ((playerGlobalPosition.x + player.width) > box.x) && ( playerGlobalPosition.x < (box.x + box.width)) ){
            if((playerGlobalPosition.y < (box.y + box.height) && playerGlobalPosition.y > box.y)){
                player.y = (box.y + box.height);
            }
        }
    }

    addDoorToRoom(){
        // pass in which wall to add it to and then add the door to that room
        // Instead of putting it in the constructor, put it here and call from constructor?
    }

    containInRoom(){
        //Left
        if (player.x < this.roomOutline.x) {            
            player.x = this.roomOutline.x;
        }
      
        //Top
        if(this.door.getIsDoorOpen()){
            if (player.y < this.roomOutline.y - 64) {
                if(player.x > this.doorPosition.x -64 && player.x < this.doorPosition.x + 64){
                    this.playerIsInRoom = false;
                }else{
                    player.y = this.roomOutline.y - 64;
                }
            }
        }else if(player.y < this.roomOutline.y - 64){
                player.y = this.roomOutline.y - 64;
        }
      
        //Right
        if (player.x + player.width > this.roomOutline.x + this.roomOutline.width) {
            player.x = this.roomOutline.x + this.roomOutline.width - player.width;
        }
      
        //Bottom
        if (player.y + player.height > this.roomOutline.y + this.roomOutline.height) {
            player.y = this.roomOutline.y + this.roomOutline.height - player.height;
        }
      
    }


    moveDoorBoundryLeft(){
        this.doorPosition.x -= 5;
        this.roomOutline.x -= 5;
    }

    moveDoorBoundryRight(){
        this.doorPosition.x += 5;
        this.roomOutline.x += 5;
    }

    moveDoorBoundryDown(){
        this.doorPosition.y -= 5;
        this.roomOutline.y -= 5;
    }

    moveDoorBoundryUp(){
        this.doorPosition.y += 5;
        this.roomOutline.y += 5;
    }



}