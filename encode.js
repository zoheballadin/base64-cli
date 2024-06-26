const fs = require("fs/promises");

const base64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const encode = async (fileName) => {
  try {
    let str = await fs.readFile(fileName);

    let binary = [];

    str.forEach((el) => binary.push(el.toString(2).padStart(8, 0)));
    str = binary.join("");

    let sixBits = [],
      six = "";

    for (let i = 0; i < str.length; i++) {
      six += str[i];

      if ((i + 1) % 6 == 0) {
        sixBits.push(six);
        six = "";
      }
    }

    const incompleteBits = str.slice(parseInt(str.length / 6) * 6);
    
    let numberOfEquals = 0;
    if (incompleteBits.length > 0) {
      numberOfEquals = (6 - incompleteBits.length) / 2;
      sixBits.push(incompleteBits.padEnd(6, 0));
    }

    sixBits = sixBits.map((bits) => parseInt(bits, 2));

    let answer = sixBits.reduce((acc, bits) => acc + base64[bits], "");

    while (numberOfEquals > 0) {
      answer += "=";
      numberOfEquals--;
    }
    await fs.writeFile("output.txt", answer);

  } catch (error) {
    console.log(error);
  }
};

module.exports = encode;
