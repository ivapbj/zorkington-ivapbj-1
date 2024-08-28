const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function prompt(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function Zorkington() {
  let openingMessage = `182 Main St.
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign * "Welcome to Burlington,VT. Theres lots to do here including, skiing, cooking classes and shopping, however your budget only alloted lodging at an AirBNB. You can move(use keyword "move") between any of the five rooms located here (bedroom, foyer, kitchen, living room, bathroom).Within each room you are able to grab an item ("grabItem"), drop an item ("dropItem"), enter ("enter") through a locked door, or read ("read")items."`;
  console.log(openingMessage);
  console.log("You are on the porch, where would you like to go?\n");
  //if the key action move is followed by a room destination call move wit that desstination in mind, if not give the user some options(consolelog)

  let input = await prompt(">_");
  console.log(input);

  //input will always  be two words

  const roomsList = {
    porch: {
      description:
        "You begin at the front door and {enter} the {code} the owner emailed you. You attempt the code but the door is still locked. After multiple failed attempts at reaching the renter you realize youre going to have to find an alternative way to enter the home. One of the porch windows seems to be unlocked so you shimmy it open and enter through the window. ",
      inventory: ["keypad", "door"],
      exits: ["foyer"],
    },

    foyer: {
      description:
        "You find yourself in the foyer, from here you can move into the living-room on the left , the bathroom straight ahead, back out onto the porch or the kitchen to your right.You decide you really need to use the bathroom",
      inventory: [],
      exits: ["livingroom", "kitchen", "bathroom", "porch"],
    },

    bathroom: {
      description:
        "welcome to the bathroom, sweet relief!  After washing your hands you realize there isn't a towel to dry your hands. You must go to the kitchen to find some paper towels to dry your hands.",
      inventory: [],
      exits: ["kitchen", "bedroom", "foyer"],
    },

    kitchen: {
      description:
        "You are in the kitchen. Once your hands are dry you decide to leave a roll in the bathroom so that you don't have to repeat the walk and shake dance ",
      inventory: ["papertowel"],
      exits: ["foyer", "bathroom", "bedroom"],
    },

    bedroom: {
      description:
        "you realize the bedroom door is locked, there is a keypad so you know somewhere there must be a code that opens that door.You must search the other rooms to find that code.",
      inventory: ["keypad"],
      exits: ["bathroom", "livingroom", "kitchen", "foyer"],
    },

    livingroom: {
      description:
        "You are now in the living room, you find a piece of paper under the TV. You try to take it with you but you arent allowed to, you read 'please leave this code here for our other AirBNBers, code:1234 '. You tuck this in the back of your mind.",
      inventory: ["paper"],
      exits: ["foyer", "bedroom"],
    },
  };
  let playerInventory = [];
  let currentRoom = "porch";

  function move(newRoom) {
    console.log(newRoom);
    const validTransition = roomsList[currentRoom];
    if (validTransition.exits.includes(newRoom)) {
      currentRoom = newRoom;
      console.log(`You have moved into ${newRoom}`);
    } else {
      console.log("You cant go that way.");
    }
  }

  function dropItem(item) {
    console.log(item);
    if (!roomsList[currentRoom].inventory.includes(item)) {
      playerInventory.splice(item, 1);
      roomsList[currentRoom].inventory.push(item);
      console.log(`you dropped ${item}\n`);
      if (item === "papertowel") {
        console.log(
          "All that walking around has made you super tired, you decide you need a nap and decide to head to the bedroom "
        );
      }
    }
  }

  function grabItem(item) {
    if (roomsList[currentRoom].inventory.includes(item)) {
      playerInventory.push(item);
      //also remove from room inventory
      roomsList[currentRoom].inventory.splice(item, 1);
      console.log(`you picked up ${item}`);
    }
  }

  async function playerCommands(command) {
    const commandArray = command.split(" ");
    switch (
      commandArray[0] //commandArray= ['move', 'foyer']
    ) {
      case "enterCode":
        let userInput = await prompt("enter the code:");
        if (correctCode(userInput)) {
          console.log("that is correct! Enjoy your nap!");
          roomsList.bedroom.description =
            "The bedroom is now unlocked. You can enter and take a nap.";
        } else {
          console.log("Wrong code, try again.");
        }
        break;

      case "read":
        readItem(commandArray[1]);
        if (currentRoom !== "porch") {
          console.log(roomsList[currentRoom].description);
        } else {
          console.log(openingMessage);
        }
        break;

      case "move":
        move(commandArray[1]);
        if (currentRoom !== "porch") {
          console.log(roomsList[currentRoom].description);
        } else {
          console.log(openingMessage);
        }
        break;

      case "grabItem":
        grabItem(commandArray[1]);
        if (currentRoom !== "porch") {
          console.log(roomsList[currentRoom].description);
        } else {
          console.log(openingMessage);
        }
        break;

      case "dropItem":
        dropItem(commandArray[1]);
        if (currentRoom !== "porch") {
          console.log(roomsList[currentRoom].description);
        } else {
          console.log(openingMessage);
        }
        break;

      // new function that will call upon description of new room that you move into and then a function that allows player to do commands.}
      default:
        console.log(`Sorry I dont understand ${command}`);
      //first make sure user input can be accepted, make sure user inpu tdoes something accoring toits command, have some way the winner can win the game using the commands.
    }
    let newInput = await prompt(">");
    playerCommands(newInput);
  }
  // let correctCode = 1234;
  // return userInput === correctCode;
  playerCommands(input);
}
function correctCode(userInput) {
  let correctCode = 1234;
  return userInput === correctCode;
}
Zorkington();
