module.exports = {
	name: 'coinflip',
	description: 'Flips a coin',
    usage: 'No args required',
	execute(message, args) {
        const myArray = ["Heads","Tails"];

          //define a variable with the result with a random selector
          let flipResult = myArray[Math.floor(Math.random()*myArray.length)];

          //send the result as a message from our bot
          message.channel.send(`You flipped a ${flipResult}`);
	},
};