const Discord = require('discord.js');

const cardData = {
    'AC' : 1, 'AH' : 1, 'AS' : 1, 'AD' : 1,
    '2C' : 2, '2H' : 2, '2S' : 2, '2D' : 2,
    '3C' : 3, '3H' : 3, '3S' : 3, '3D' : 3,
    '4C' : 4, '4H' : 4, '4S' : 4, '4D' : 4,
    '5C' : 5, '5H' : 5, '5S' : 5, '5D' : 5,
    '6C' : 6, '6H' : 6, '6S' : 6, '6D' : 6,
    '7C' : 7, '7H' : 7, '7S' : 7, '7D' : 7,
    '8C' : 8, '8H' : 8, '8S' : 8, '8D' : 8,
    '9C' : 9, '9H' : 9, '9S' : 9, '9D' : 9,
    '10C' : 10, '10H' : 10, '10S' : 10, '10D' : 10,
    'JC' : 10, 'JH' : 10, 'JS' : 10, 'JD' : 10,
    'QC' : 10, 'QH' : 10, 'QS' : 10, 'QD' : 10,
    'KC' : 10, 'KH' : 10, 'KS' : 10, 'KD' : 10,
}

let playerArray = [];

class blackjackPlayer{
    playerCards = [];
    constructor(userID){
        this.userID = userID;
        for(let i = 0; i < 2; i++){
            this.getRandomCard();
        }
    }

    getPlayerCards(){
        return this.playerCards;
    }

    getUserID(){
        return this.userID;
    }

    getRandomCard(){
        let keys = Object.keys(cardData);
        this.playerCards.push(keys[Math.floor(Math.random() * 52)]);
    }

    getTotal(){
        let total = 0;
        for(let i = 0; i < this.playerCards.length; i++){
            total += cardData[this.playerCards[i]];
        }
        return total;
    }

    checkTotal(){
        if(this.getTotal() <= 21){
            return true;
        }

        else{
            return false;
        }
    }
}

function checkPlayer(userID){
    for(let i = 0; i < playerArray.length; i++){
        if(playerArray[i].getUserID() == userID){
            return playerArray[i];
        }
    }
    return null;
}

function removePlayer(userID){
    for(let i = 0; i < playerArray.length; i++){
        if(playerArray[i].getUserID() == userID){
            playerArray.splice(i, 1)
        }
    }


}

function checkWin(playerTotal, dealerTotal){
    let playerDiff = 21 - playerTotal;
    let dealerDiff = 21 - dealerTotal;

    if(dealerDiff < 0){
        return('player');
    }
    else if(playerDiff < dealerDiff){
        return('player');
    }
    else if(playerDiff == dealerDiff){
        return('draw');
    }
    else{
        return('dealer');
    }
}

function start(message){
    if(!(checkPlayer(message.author.id))){
        let player = new blackjackPlayer(message.author.id);
        playerArray.push(player);

        message.channel.send(
            new Discord.MessageEmbed()
            .setColor('#006600')
            .setAuthor(message.author.username)
            .addFields(
                {name: 'Cards', value: player.getPlayerCards().join(' '), inline: true},
                {name: 'Total', value: player.getTotal(), inline: true},
                {name: 'Next move', value: 'hit or stand'})
        );
    }
    else{
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor('#006600')
            .setAuthor(message.author.username)
            .setDescription('A game instance already exists (hit or stand)')
        );
    }
}

function hit(message){
    let player = checkPlayer(message.author.id);
    if(player){
        player.getRandomCard();

        if(player.checkTotal()){
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#006600')
                .setAuthor(message.author.username)
                .addFields(
                    {name: 'Cards', value: player.getPlayerCards().join(' '), inline: true},
                    {name: 'Total', value: player.getTotal(), inline: true},
                    {name: 'Next move', value: 'hit or stand'})
            );
        }
        else{
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#006600')
                .setAuthor(message.author.username)
                .addFields(
                    {name: 'Cards', value: player.getPlayerCards().join(' '), inline: true},
                    {name: 'Total', value: player.getTotal(), inline: true},
                    {name: 'Bust', value: 'better luck next time'})
            );

            removePlayer(message.author.id);
        }
    }
    else{
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor('#006600')
            .setAuthor(message.author.username)
            .setDescription('No game instance, use start to create one')
        );
    }
}

function stand(message){
    let player = checkPlayer(message.author.id);
    if(player){
        let dealerCards = [];
        let dealerTotal = 0;
        while(dealerTotal < 18){
            let keys = Object.keys(cardData);
            let card = keys[Math.floor(Math.random() * 52)];
            dealerTotal += cardData[card];
            dealerCards.push(card);
        }

        const endMessage = new Discord.MessageEmbed()
        .setColor('#006600')
        .setAuthor(message.author.username)
        .addFields(
            {name: 'Your Cards', value: player.getPlayerCards().join(' '), inline: true},
            {name: 'Your Total', value: player.getTotal(), inline: true},
            {name: '\u200B', value: '\u200B'},
            {name: 'Dealer Cards', value: dealerCards.join(' '), inline: true},
            {name: 'Dealer Total', value: dealerTotal, inline: true}
        );

        if(checkWin(player.getTotal(), dealerTotal) == 'player'){
            message.channel.send(
                endMessage.addField('You Win', 'congratulations')
            );
        }
        else if(checkWin(player.getTotal(), dealerTotal) == 'dealer'){
            message.channel.send(
                endMessage.addField('Dealer Wins', 'better luck next time')
            );
        }
        else{
            message.channel.send(
                endMessage.addField('Draw', 'so close yet so far')
            );
        }

        removePlayer(message.author.id);
    }
    else{
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor('#006600')
            .setAuthor(message.author.username)
            .setDescription('No game instance, use start to create one')
        );
    }
}

module.exports = {
	name: 'blackjack',
	description: 'blackjack',
	execute(message, args) {
        if(args[0] == 'start'){
            start(message);
        }

        else if(args[0] == 'hit'){
            hit(message);
        }

        else if(args[0] == 'stand'){
            stand(message);
        }

        else{
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#006600')
                .setAuthor(message.author.username)
                .setDescription('Missing args(start, hit, stand)')
            );
        }
	},
};