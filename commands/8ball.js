module.exports = {
	name: '8ball',
	description: 'Displays 8ball quote',
    usage: 'No args required',
	execute(message, args) {
        const responses = [ "As I see it, yes.",
                            "Ask again later.",
                            "Better not tell you now.",
                            "Cannot predict now.",
                            "Concentrate and ask again.",
                            "Don’t count on it.",
                            "It is certain.",
                            "It is decidedly so.",
                            "Most likely.",
                            "My reply is no.",
                            "My sources say no.",
                            "Outlook not so good.",
                            "Outlook good.",
                            "Reply hazy, try again.",
                            "Signs point to yes.",
                            "Very doubtful.",
                            "Without a doubt.",
                            "Yes.",
                            "Yes – definitely.",
                            "You may rely on it."
      ];

          //define a variable with the result with a random selector
          let answer = responses[Math.floor(Math.random()*responses.length)];

          //send the result as a message from our bot
          message.channel.send(`Whatever your question was, my answer is, ${answer}`);
	},
};