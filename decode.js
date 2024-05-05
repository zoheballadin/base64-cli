const fs = require("fs/promises");
const base64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const decode = async (fileName) => {
  try {
    const str = await fs.readFile(fileName, "utf-8");

    let letters = str.split("");
    let numberOfEquals = letters.reduce(
      (acc, letter) => (letter == "=" ? acc + 1 : acc),
      0
    );
    letters.splice(letters.length - numberOfEquals);
    letters = letters
      .map((letter) => base64.indexOf(letter))
      .map((decimalValue) => decimalValue.toString(2).padStart(6, 0));

    letters = letters.join("");
    while (numberOfEquals > 0) {
      letters += "00";
      numberOfEquals--;
    }

    let eightBits = [],
      eight = "";

    for (let i = 0; i < letters.length; i++) {
      eight += letters[i];

      if ((i + 1) % 8 == 0) {
        eightBits.push(eight);
        eight = "";
      }
    }
    const answer = eightBits.map((binary) => parseInt(binary, 2));
    const buffer = Buffer.from(answer, "base64");
    await fs.writeFile("output.png", buffer);
  } catch (error) {
    console.log(error);
  }
};
module.exports = decode;
