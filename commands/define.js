const fetch = require('node-fetch');
const querystring = require('querystring');
const Discord = require('discord.js');


async function getDefinition(phrase, channel){
    if(!phrase) return channel.send(
        new Discord.MessageEmbed()
        .setColor('#006600')
        .setDescription('No phrase supplied, please supply a phrase after command')
    );
    let searchQuery = querystring.stringify({term: phrase});
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${searchQuery}`).then(response => response.json());
    try{
        const wordData = list[0];

        const wordDescription = new Discord.MessageEmbed()
        .setColor('#006600')
        .setTitle(`Phrase: ${phrase}`)
        .setURL(wordData.permalink)
        .setAuthor(`Published by ${wordData.author}`)
        .addFields(
            {name: 'Definition', value: wordData.definition},
            {name: 'Example', value: wordData.example},
            {name: 'Rating', value: `${wordData.thumbs_up} 👍. ${wordData.thumbs_down} 👎.`},
        )
        .setFooter('Posted on Urban Dictionary');
        
        channel.send(wordDescription);
    } 
    catch (error){             
        const noWord = new Discord.MessageEmbed()
        .setColor('#006600')
        .setDescription(`No phrase was found for: **${phrase}**`);

        channel.send(noWord);
    }
}

module.exports = {
	name: 'define',
	description: 'Gets phrase definition',
	execute(message, args) {
        let phrase = args.join(' ');
        getDefinition(phrase, message.channel);
	},
};