var dataInstructions = require('../dataConn.js');

function addProfanity(serverID, profanity){
    dataInstructions.uploadProfanity(serverID, profanity);
}

module.exports = {
	name: 'profanity',
	description: 'Handles blocked words',
    usage: '[add, view, remove]',
	execute(message, args) {
        if(args[0] == 'add'){
            addProfanity(message.guild.id, args[1]);
        }
	},
};