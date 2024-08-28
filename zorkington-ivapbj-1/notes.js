/*- for rooms we need a state machine to mange the change in rooms
! Core Gameplay Loop
FIRST some text to start Gamepad, giving them commands to do THEN handle that input (if acceptable thendo command else say no and ask again)
THEN provide feedback to user(i.e 'you stole the sign')

find someway to enter the building
tell user they are in x room
give tools to solve puzzle (could be numbers or a keypad or a key to a door, etc)

once solved, move to next room

tell user they are in y room and give description
have user do something in the room

*Inventory Story*
needs a place to store items (use an array cuz this is a list)
use method push into inventory array,and remove items from our room (needs to be in a function so we can call it anytime)
if player is in room 2&& our item is in room 2, then push (item) into player inventory and remove item from room inventory 
drop items into the room, and remove them from our inventory (needs to be in a function so we can call it anytime)


*/
function grabItem() {
  if (playerState === "room 2" && rooms[currentRoom].inventory.includes(item)) {
    playerInventory.push(item);
    //also remove from room inventory
    rooms[currentRoom].inventory.splice(item, 1);
  }
}
let room1 = {
  desc: "string",
  inventory: [],
};
//call room1.desc
function dropItem() {
  if (rooms[currentRoom].inventory.includes(item)) {
    playerInventory.splice(item, 1);
    rooms[currentRoom].inventory.push(item);
  }
}

currentRoom = room1;

let trafficLightStates = {
  red: ["green"],
  green: "yellow",
  yellow: "red",
};

let currentState = "red";

function changeCurrentState(newState) {
  let validTransition = [trafficLightStates[currentState]];
  if (validTransition.includes(newState)) {
    currentState = newState;
    console.log(`You are in ${currentState}`);
  } else {
    console.log(`We cannot fo to ${newState}`);
  }
}
stateMachine("green");
stateMachine("yellow");
stateMachine("red");
stateMachine("yellow");
