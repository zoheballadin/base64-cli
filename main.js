const readlineSync = require("readline-sync");
const encode = require("./encode");
const decode = require("./decode");
const decodeToText = require("./decodeToText");

const printMenu = () =>
  console.log(
    `    0 to Exit
    1 to encode image to text
    2 to decode text to image
    3 to encode text to text
    4 to decode text to text
    `
  );

let choice;

const cli = async () => {
  printMenu();
  choice = readlineSync.questionInt("Enter your choice: ");
  const fileName = readlineSync.question("enter file name: ");
  switch (choice) {
    case 0:
      console.log("exiting..");
      return;
    case 1:
      await encode(fileName);
      break;
    case 2:
      await decode(fileName);
      break;
    case 3:
      await encode(fileName);
      break;
    case 4:
      await decodeToText(fileName);
      break;

    default:
      break;
  }
  const isContinue = readlineSync.question("DO YOU WANT TO CONTINUE? (yes/no)");
  if (isContinue.toLowerCase() === "yes") cli();
};

cli();
