// BOX IS BASICALLY THE SAME AS A ROOM BUT WITHOUT DOORS.
// Boxes don't need the roomoutline because you can't go inside them
class Box{

    roomOutline;
    walls;

    constructor(walls){
        this.walls = walls;
        //this.roomOutline = roomOutline;
        this.drawWalls();
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
                // Need this to be the actual player x and not the global position as global position is a just a copy
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
                player.y = box.y - player.height;                
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

}