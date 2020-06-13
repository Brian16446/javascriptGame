// Procedurally Generate a level
function town(){
    // Eventually, I would use some algorithm to choose this map sprite.
    map = new Sprite(resources["assets/town.png"].texture);
    map.scale.set(2);
    map.interactive = true;
    mapLayer.addChild(map);

    inn = new Box([
        {x: 1930, y: 960, width:20, height: 300},    // Left
        {x: 2170, y: 960, width:20, height: 300},    // Right
        {x: 1930, y: 960, width:250, height: 20},    // Top
        {x: 1930, y: 1240, width:260, height: 20}     // Bottom
    ]);
    rooms.push(inn);

    dungeonEntrance = {x:230, y:150, width: 50, height: 50};

    manmsg = "Hey, this guy looks like me!";
    manmsg2 = "Why's this guy staring at me?";

    sensei = new Npc("sensei", 300, 600, manmsg);
    npcs.push(sensei);
    oldman = new Npc("sensei", 400, 600, manmsg2);
    oldman.object.scale.x *= -1;
    npcs.push(oldman);

    msg = "Hello there Traveller!\nCheck back later,\nmy stock has ran out!";
    vendor = new Npc("vendor", 800, 100, msg); // Set back to 1300, 1100
    npcs.push(vendor);



    key = new Key(480,485);
    keys.push(key);

    let l = new Life(705, 485);
    lifes.push(l);

    // Render town sprites
    chest1 = new Chest(600, 350);
    chests.push(chest1);
    

    box = new Box(
        [
            {x: 450, y: 290, width:20, height: 90},    // Left
            {x: 560, y: 290, width:20, height: 90},    // Right
            {x: 450, y: 290, width:130, height: 20},    // Top
            {x: 450, y: 370, width:130, height: 20}     // Bottom
        ]);
    rooms.push(box);

    box2 = new Box(
        [
            {x: 670, y: 290, width:20, height: 90},    // Left
            {x: 780, y: 290, width:20, height: 90},    // Right
            {x: 670, y: 290, width:130, height: 20},    // Top
            {x: 670, y: 370, width:130, height: 20}     // Bottom
        ]);
    rooms.push(box2);

    castle = new Box(
        [
            {x: 30, y: 30, width:20, height: 110},    // Left
            {x: 460, y: 30, width:20, height: 110},    // Right
            {x: 30, y: 30, width:430, height: 20},    // Top
            {x: 30, y: 140, width:450, height: 20}     // Bottom
        ]);
    rooms.push(castle);

}

function dungeon(){
    // need some way of calling maps randomly until dungeon complete. 
    if(dungeonLevel == 0){
        levelOne();
        dungeonLevel++;
    }
    else if(dungeonLevel == 1){
        levelTwo();
        dungeonLevel++;
    }
    else if(dungeonLevel == 2){
        levelThree();
        dungeonLevel++;
    }
    else if(dungeonLevel == 3){
        levelFour();
        dungeonLevel++;
    }
    else{
        spritesLayer.removeChild(ladder);
        loadTown();
        dungeonLevel = 0;
    }

}

function levelOne(){
    // load a dungeon
    map = new Sprite(resources["assets/dungeon1.png"].texture);
    // map1
    // map2 etc

    // Render a ladder too
    ladder = new Sprite(resources["assets/Roguelike Sprites/Doors/ladder.png"].texture)
    ladder.scale.set(2);
    ladder.position.set(880, 500);
    spritesLayer.addChild(ladder);
    dungeonEntrance = {x:880, y:500, width: 50, height: 50};

    room = new Room([
        {x: 180, y: 130, width:20, height: 120},    // Left
        {x: 310, y: 130, width:20, height: 120},    // Right
        {x: 180, y: 130, width:150, height: 20},    // Top
        {x: 180, y: 250, width:150, height: 20}     // Bottom
    ], {x: 180, y: 130, width: 150, height:120});
    rooms.push(room);

    bigRoom = new Room([
        {x: 500, y: 170, width:20, height: 200},    // Left
        {x: 830, y: 170, width:20, height: 200},    // Right
        {x: 500, y: 170, width:330, height: 20},    // Top
        {x: 500, y: 370, width:350, height: 20}     // Bottom
    ], {x: 500, y: 170, width: 350, height:200});
    rooms.push(bigRoom);

    room2 = new Room([
        {x: 180, y: 430, width:20, height: 120},    // Left
        {x: 310, y: 430, width:20, height: 120},    // Right
        {x: 180, y: 430, width:150, height: 20},    // Top
        {x: 180, y: 550, width:150, height: 20}     // Bottom
    ], {x: 180, y: 430, width: 150, height:120});
    rooms.push(room2);


    room3 = new Room([
        {x: 980, y: 430, width:20, height: 120},    // Left
        {x: 1110, y: 430, width:20, height: 120},    // Right
        {x: 980, y: 430, width:150, height: 20},    // Top
        {x: 980, y: 550, width:150, height: 20}     // Bottom
    ], {x: 980, y: 430, width: 150, height:120});
    rooms.push(room3);

    map.scale.set(2);

    chest3 = new Chest(230,200);
    chests.push(chest3);

    key = new Key(645,270);
    keys.push(key);

    key2 = new Key(645,470);
    keys.push(key2);

    life = new Life(1042,450);
    lifes.push(life);
    // Choose a random map.
    mapLayer.addChild(map);

    skeleton = new MeleeEnemy();
    enemies.push(skeleton);

    skeleton2 = new MeleeEnemy();
    skeleton2.enemy.position.x = 900;
    enemies.push(skeleton2);

    vampire = new RangedEnemy();
    enemies.push(vampire);

    
}


function levelTwo(){    
    map = new Sprite(resources["assets/dungeon2.png"].texture);

    // CAN UPDATE THE CONTAIN THING HERE MAYBE?

    map.scale.set(2);

    mapLayer.addChild(map);

    room = new Room([
        {x: 110, y: 100, width:20, height: 540},    // Left
        {x: 290, y: 100, width:20, height: 540},    // Right
        {x: 110, y: 100, width:200, height: 20},    // Top
        {x: 110, y: 640, width:200, height: 20}     // Bottom
    ], {x: 110, y: 100, width: 200, height:540});
    rooms.push(room);

    room2 = new Room([
        {x: 460, y: 400, width:20, height: 210},    // Left
        {x: 700, y: 400, width:20, height: 210},    // Right
        {x: 460, y: 400, width:260, height: 20},    // Top
        {x: 460, y: 610, width:260, height: 20}     // Bottom
    ], {x: 460, y: 400, width: 260, height:210});
    rooms.push(room2);

    room3 = new Room([
        {x: 870, y: 130, width:20, height: 230},    // Left
        {x: 1160, y: 130, width:20, height: 230},    // Right
        {x: 870, y: 130, width:310, height: 20},    // Top
        {x: 870, y: 360, width:310, height: 20}     // Bottom
    ], {x: 870, y: 130, width: 310, height:230});
    rooms.push(room3);




    let l = new Life(550, 500);
    lifes.push(l);

    let key = new Key(1000, 600);
    keys.push(key);

    let chest = new Chest(1000, 270);
    chests.push(chest);

    let life = new Life(175, 520);
    lifes.push(life);

}


function levelThree(){
    map = new Sprite(resources["assets/dungeon3.png"].texture);

    // CAN UPDATE THE CONTAIN THING HERE MAYBE?

    map.scale.set(4);

    mapLayer.addChild(map);

}


function levelFour(){
    map = new Sprite(resources["assets/dungeon4.png"].texture);

    // CAN UPDATE THE CONTAIN THING HERE MAYBE?

    map.scale.set(4);

    mapLayer.addChild(map);
    
}

function finalRoom(){
    //add a boss enemy in the at some point.
}