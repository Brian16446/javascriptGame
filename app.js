// Creating aliases to make code more readable
var App = PIXI.Application,
    loader = PIXI.Loader.shared, // Pixi.loader depreciated, this could be buggy
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Container = PIXI.Container;
    Text = PIXI.Text;

// Create a pixi application object
const app = new PIXI.Application({
    width: 1280, 
    height: 700, 
    antialias: true,
    transparent: false,
    resolution: window.devicePixelRatio || 1,
});

// Add the canvas that's created to the document.
document.body.appendChild(app.view);

// Loading Assets
loader
    .add("assets/background.png")
    .add("assets/town.png")
    .add("assets/dungeon1.png")
    .add("assets/dungeon2.png")
    .add("assets/dungeon3.png")
    .add("assets/dungeon4.png")
    .add("assets/Roguelike Sprites/Knight/Spritesheet/Knight.json")
    .add("assets/Roguelike Sprites/Wizard/Spritesheet/wizard.json")
    .add("assets/Roguelike Sprites/Rogue/Spritesheet/Rogue.json")
    .add("assets/Roguelike Sprites/Items/Weapons/Sword/weapon.json")
    .add("assets/Roguelike Sprites/Items/Weapons/Staff/staff.json")
    .add("assets/Roguelike Sprites/Items/Weapons/Shuriken/Shuriken.json")
    .add("assets/Roguelike Sprites/Monsters/Skeleton/Skeleton.json")
    .add("assets/Roguelike Sprites/Monsters/Caster/Caster.json")
    .add("assets/Roguelike Sprites/Items/Chests/chest.json")
    .add("assets/Roguelike Sprites/Doors/door-left.png")
    .add("assets/Roguelike Sprites/Doors/door-right.png")
    .add("assets/Roguelike Sprites/Doors/ladder.png")
    .add("assets/Roguelike Sprites/Items/Keys/key.png")
    .add("assets/Roguelike Sprites/Items/Gems/ruby.png")
    .add("assets/Roguelike Sprites/Items/Treasure/gold.png")
    .add("assets/Roguelike Sprites/Npc/sensei.png")
    .add("assets/Roguelike Sprites/Npc/vendor.png")
    .add("assets/Roguelike Sprites/UI/textbox.png")
    .add("pkmn", "/assets/PKMN-Mystery-Dungeon.ttf")
    .load(setup);

// Initialising variables
let mapLayer, spritesLayer, playerLayer; // Groups
let player; // player/npcs/enemies
let classChoice = 1;
let enemies = new Array();
let chests = new Array();
let doors = new Array();
let rooms = new Array();
let keys = new Array();
let golds = new Array();
let lifes = new Array();
let npcs = new Array();
let state; // Game controllers
let UIcanvas, message; // UI
let map; // Map / Objects
let dungeonEntrance;
let dungeonLevel = 0;
let keysPressed = 0;
let count = 0;
let goldCount = 0;
let lifeCount = 0;
let b = new Bump(PIXI);
let c = new Charm(PIXI);
let rect = [...Array(2)].map(x=>Array(4));

// Keybinds
let left = keyboard("a"),
    up = keyboard("w"),
    right = keyboard("d"),
    down = keyboard("s"),
    home = keyboard("g"),
    interact = keyboard("e"),
    testInfo = keyboard("i");
    one = keyboard("1");
    two = keyboard("2");
    three = keyboard("3");

let keyControls = [left,up,right,down];


// Font styling
let fontStyle = new PIXI.TextStyle({
    fontFamily: "pkmn",
    fontSize: 32,
    stroke: "#000",
    fill: "white",
    strokeThickness: 4
});

// Used to setup things that are consistent across maps. i.e Player, Containers etc.
function setup(){

    // Creating game loop.
    app.ticker.add(delta => gameLoop(delta));
    state = startMenu; // Controls the state of the game. Would probably want this to be menu first.
}


function gameSetup(){
        // Creating the layers
        mapLayer = new Container();
        spritesLayer = new Container();
        playerLayer = new Container();
        app.stage.addChild(mapLayer, spritesLayer, playerLayer);
    
        // Create player and initialise the movement
        if(classChoice == 1){
            playerSprite = new Knight();
        }
        else if(classChoice == 2){
            playerSprite = new Wizard();
        }
        else if(classChoice == 3){
            playerSprite = new Rogue();
        }
        playerSprite.equipWeapon();
        initPlayerMovement();

        state = loadTown;
}

function loadTown(){
    // reset player position
    clearAllSprites();
    town();
    spritesLayer.position.set(0,0); // Reset the sprites position on the map
    playerSprite.setPosition(200,300);

    



    // Hooking click events to class function
    map.on('mousedown', () => { playerSprite.basicAttack(); });
    map.on('mouseup', () => { playerSprite.stopAttack(); });
    // load npcs etc here
    state = play;
    
}

function loadDungeon(){
    // maybe have a fade to black transition or something

    // Remove all sprites from screen and from world
    clearAllSprites();

   
    dungeon();
    playerSprite.setPosition(20,30);
    // skeleton = new MeleeEnemy();
    
    // skeleton2 = new MeleeEnemy();
    // skeleton2.enemy.position.x = 900;
    
    // vampire = new RangedEnemy();
    //enemies.push(skeleton, vampire, skeleton2);   

    for(let i = 0; i < enemies.length; i++){
        //enemies[i].wander();
        enemies[i].drawAlertBox();
        enemies[i].raycast();
    }

    // set the player position appropriate for the dungeon.
    // remove all of the sprites from the stage.
    state = play;

    // if g is pressed, cast home ability
    // when cast is done, state = loadTown.
}

function startMenu(){

    let menuLayer = new Container();
    app.stage.addChild(menuLayer);
    map = new Sprite(resources["assets/background.png"].texture);
    menuLayer.addChild(map);

    let gameTitle = new Text("Dungeon Crawler", fontStyle);
    gameTitle.position.set(540,100);
    menuLayer.addChild(gameTitle);


    let knightSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Knight/Spritesheet/Knight.json"].spritesheet;
    let knight = new PIXI.AnimatedSprite(knightSheet.animations["WalkRight"]);
    knight.scale.set(3);
    knight.position.set(300,300);
    menuLayer.addChild(knight);

    let knightText = new Text("1");
    knightText.position.set(335,225);
    menuLayer.addChild(knightText);


    let wizardSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Wizard/Spritesheet/wizard.json"].spritesheet;
    let wizard = new PIXI.AnimatedSprite(wizardSheet.animations["WalkRight"]);
    wizard.position.set(600,300);
    wizard.scale.set(3);
    menuLayer.addChild(wizard);

    let wizardText = new Text("2");
    wizardText.position.set(635,225);
    menuLayer.addChild(wizardText);

    let rogueSheet = PIXI.Loader.shared.resources["assets/Roguelike Sprites/Rogue/Spritesheet/Rogue.json"].spritesheet;
    let rogue = new PIXI.AnimatedSprite(rogueSheet.animations["WalkRight"]);
    rogue.position.set(900,300);
    rogue.scale.set(3);
    menuLayer.addChild(rogue);

    let rogueText = new Text("3");
    rogueText.position.set(935,225);
    menuLayer.addChild(rogueText);

    let message = new Text("Press 1, 2 or 3 to choose a class and start the game", fontStyle);
    message.position.set(350,450);
    menuLayer.addChild(message);

    one.press = () => {
        classChoice = 1;
        state = gameSetup;
    }
    two.press = () => {
        classChoice = 2;
        state = gameSetup;
    }
    three.press = () => {
        classChoice = 3;
        state = gameSetup;
    }


}

function gameOver(){
    let menuLayer = new Container();
    app.stage.addChild(menuLayer);
    map = new Sprite(resources["assets/background.png"].texture);
    menuLayer.addChild(map);

    let gameOver = new Text("GAME OVER", fontStyle);
    gameOver.position.set(540,100);
    menuLayer.addChild(gameOver);

    let message = new Text("Press 1 to restart", fontStyle);
    message.position.set(515,450);
    menuLayer.addChild(message);

    one.press = () => state = startMenu;

}

function gameLoop(delta){
    state(delta);
}

function play(){
    playerSprite.movePlayer();
    playerSprite.containPlayer({x:28, y:10, width: 1270, height: 720}); // Keeps the player on the screen
    //moveMap();
    playerSprite.glueWeaponToCharacter();
    
    // If no movement keys are pressed stop animating the character
    if(keysPressed == 0){
        playerSprite.stopPlayerAnimations();
    }
    //console.log(playerSprite.getPosition());
    interact.press = () => {checkInteract()};

    //test purposes.
    testInfo.press = () => console.log(player.getGlobalPosition());
    one.press = () => console.log("1 pressed");

    home.press = () => {
        loadTown();
        dungeonLevel = 0;
    }



    roomCollider();

    for(let i = 0; i < enemies.length; i++){
        //enemies[i].wander();
        enemies[i].positionHealthBar();
        enemies[i].playerInBox();
    }

    // Check if lives greater than 0 if not, game over
    if(playerSprite.lives < 0){
        state = gameOver;
        dungeonLevel = 0;
    }

}

function initPlayerMovement(){

    left.press = () => {
        playerSprite.moveLeft();
        playerSprite.flipWeapon("left");
        keysPressed++;
    };
    left.release = () => {
        keysPressed--;
        if (!right.isDown) {
            playerSprite.setPlayerXVelocity(0);
        }else{
            playerSprite.moveRight();
        }
    };

    right.press = () => {
        playerSprite.moveRight();
        playerSprite.flipWeapon("right");
        keysPressed++;
    };
    right.release = () => {
        keysPressed--;
        if (!left.isDown) {
            playerSprite.setPlayerXVelocity(0);
        } else{
            playerSprite.moveLeft();
        }
    };

    up.press = () => {
        playerSprite.moveUp();
        keysPressed++;
    };
    up.release = () => {
        keysPressed--;
        if (!down.isDown) {
            playerSprite.setPlayerYVelocity(0);
        } else{
            playerSprite.setPlayerYVelocity(5);
        }
    };

    down.press = () => {
        playerSprite.moveDown();
        keysPressed++;
    };
    down.release = () => {
        keysPressed--;
        if (!up.isDown) {
            playerSprite.setPlayerYVelocity(0);
        } else{
            playerSprite.moveUp();
        }
    };

}

// function moveMap(){
//     let mapContainer = {x:28, y:10, width: 1270, height: 720};

//     // Shouldn't really be using player.x/y here
//     // RIGHT
//     if(player.x + player.width > mapContainer.width-20){
//         // AND THE RIGHT KEY IS PRESSED.
//         if(map.x > (-1270 * 3)){
//             if(right.isDown){
//                 map.x -= 5;
//                 spritesLayer.x -= 5;
//                 moveWallsLeft();
//                 // moveDoorsLeft();
//             }
//         }
//         //mapContainer.width -= 200;
//     }

//     // LEFT
//     if(player.x < mapContainer.x+10){
//         if(left.isDown){
//             if(map.x < 0){
//                 map.x += 5;
//                 spritesLayer.x += 5;
//                 moveWallsRight();
//                 moveDoorsRight();
//             }
//         }
//     }

//     // BOTTOM
//     if(player.y + player.height > mapContainer.height-10){
//         if(down.isDown){
//             if(map.y > (-720 * 3)){
//                 map.y -= 5;    
//                 spritesLayer.y -= 5;
//                 moveWallsDown();  
//                 // moveDoorsDown();
//             }
//         }
//     }
    
//     // TOP
//     if(player.y < mapContainer.y+10){
//         if(up.isDown){
//             if(map.y < 0){
//                 map.y += 5;
//                 spritesLayer.y += 5;
//                 moveWallsUp();
//                 // moveDoorsUp();
//             }
//         }
//     }

// }

function spriteCollider(r1, r2) {

    //Define the variables we'll need to calculate
    let hit;
    let r1position = r1.getPosition();
    //let r2position = r2.chest.getBounds();
    let r2position = r2.object.getBounds();

    //hit will determine whether there's a collision
    hit = false;

    if((r2position.x - r1position.x > -100) && (r2position.x - r1position.x < 100)){
        if((r2position.y - r1position.y > -100) && (r2position.y - r1position.y < 100)){
            hit = true;
        }
    }
  
    //`hit` will be either `true` or `false`
    return hit;
};

// Loops through all game object arrays and checks if the player is near the object.
function checkInteract(){

    checkChests();
    checkDoors();
    checkNpc();
    checkKeys();
    checkGold();
    checkLife();
    checkDungeon();
}


function checkChests(){
    for(let i = 0; i < chests.length; i++){
        let x = spriteCollider(playerSprite, chests[i]);
        if(x){
            chests[i].openChest();
        }
    }
}

function checkKeys(){
    for(let i = 0; i < keys.length; i++){
        let x = spriteCollider(playerSprite, keys[i]);
        if(x){
            keys[i].collectKey();
        }
    }
}

function checkGold(){
    for(let i = 0; i < golds.length; i++){
        let x = spriteCollider(playerSprite, golds[i]);
        if(x){
            golds[i].collectGold();
        }
    }
}

function checkLife(){
    for(let i = 0; i < lifes.length; i++){
        let x = spriteCollider(playerSprite, lifes[i]);
        if(x){
            lifes[i].collectLife();
        }
    }
}

function checkNpc(){
    for(let i = 0; i < npcs.length; i++){
        if(npcs[i].talking == true){
            npcs[i].stopTalking();
        }
        let x = spriteCollider(playerSprite, npcs[i]);
        if(x){
            npcs[i].talk();
        }
    }
}

function checkDoors(){
    for(let i = 0; i < doors.length; i++){
        let x = spriteCollider(playerSprite, doors[i]);
        if(x){
            doors[i].openDoors();    
        }
    }
}

function checkDungeon(){
    let playerPosition = playerSprite.getPosition();
    if((dungeonEntrance.x - playerPosition.x > -50) && (dungeonEntrance.x - playerPosition.x < 50)){
        if((dungeonEntrance.y - playerPosition.y > -50) && (dungeonEntrance.y - playerPosition.y < 50)){
            loadDungeon();
            playerSprite.setPosition(50,50);
        }
    }
    // This can just check collision with a rectangle around the dungeon entrance as there will only be one.
}

function roomCollider(){
    //console.log(rooms[0].walls[0].x);
    for(let i = 0; i < rooms.length; i++){
        //rooms[i].walls[0].x += 5;
        if(rooms[i].playerIsInRoom){
            rooms[i].containInRoom();            
        }else{
            rooms[i].wallCollider(player);
        }
    }
}

// function moveWallsLeft(){
//     for(let i = 0; i < rooms.length; i++){
//         for(let j = 0; j < rooms[i].walls.length; j++){
//             rooms[i].walls[j].x -= 5;
//         }
//         if(rooms[i].constructor.name == "Room"){
//             rooms[i].moveDoorBoundryLeft();
//         }
//     }
//     moveDoorsLeft();
// }

// function moveWallsRight(){
//     for(let i = 0; i < rooms.length; i++){
//         for(let j = 0; j < rooms[i].walls.length; j++){
//             rooms[i].walls[j].x += 5;
//         }
//         if(rooms[i].constructor.name == "Room"){
//             rooms[i].moveDoorBoundryRight();
//         }
//     }
//     //moveDoorsRight();
//     // I'm not quite sure how this works if this is commented out?! All the other directions need it. It's black magic
// }

// function moveWallsDown(){
//     for(let i = 0; i < rooms.length; i++){
//         for(let j = 0; j < rooms[i].walls.length; j++){
//             rooms[i].walls[j].y -= 5;
//         }
//         if(rooms[i].constructor.name == "Room"){
//             rooms[i].moveDoorBoundryDown();
//         }
//     }
//     moveDoorsDown();
// }

// function moveWallsUp(){
//     for(let i = 0; i < rooms.length; i++){
//         for(let j = 0; j < rooms[i].walls.length; j++){
//             rooms[i].walls[j].y += 5;
//         }
//         if(rooms[i].constructor.name == "Room"){
//             rooms[i].moveDoorBoundryUp();
//         }
//     }
//     moveDoorsUp();
// }




// function moveDoorsLeft(){
//     for(let i = 0; i < doors.length; i++){
//         doors[i].moveDoorLeft();
//     }
// }

// function moveDoorsRight(){
//     for(let i = 0; i < doors.length; i++){
//         doors[i].moveDoorRight();
//     }
// }

// function moveDoorsUp(){
//     for(let i = 0; i < doors.length; i++){
//         doors[i].moveDoorUp();
//     }
// }

// function moveDoorsDown(){
//     for(let i = 0; i < doors.length; i++){
//         doors[i].moveDoorDown();
//     }
// }



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function clearAllSprites(){
        // Remove all sprites from screen and from world
        for(let i = 0; i < enemies.length; i++){
            enemies[i].removeFromScreen();
        }
        enemies.splice(0, enemies.length);
        
        // Rooms don't need to be removed from screen because they are never drawn
        rooms.splice(0, rooms.length);
    
        for(let i = 0; i < doors.length; i++){
            doors[i].removeFromScreen();
        }
        doors.splice(0,doors.length);
    
        for(let i = 0; i < chests.length; i++){
            chests[i].removeFromScreen();
        }
        chests.splice(0,chests.length);
    
        for(let i = 0; i < keys.length; i++){
            keys[i].removeFromScreen();
        }
        keys.splice(0,keys.length);
    
        for(let i = 0; i < golds.length; i++){
            golds[i].removeFromScreen();
        }
        golds.splice(0,golds.length);
    
        for(let i = 0; i < lifes.length; i++){
            lifes[i].removeFromScreen();
        }
        lifes.splice(0,lifes.length);
    
        for(let i = 0; i < npcs.length; i++){
            npcs[i].removeFromScreen();
        }
        npcs.splice(0,npcs.length);
}