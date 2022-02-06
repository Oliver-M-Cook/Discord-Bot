const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var dataInstructions = require("./dataConn.js");

//Token should be kept secret, allows the code to run with the bot
const bot_secret_token =
  "ODMyNzAxMDE2MDYzMjEzNTcw.YHnnQQ.FKc7SkR8zXK6Mr0RFaukaLyozoQ";

//When the client connects, it outputs confirmation to the console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  updateDatabase();
});

//Listener that filters through chats to output the correct command
client.on("message", (message) => {
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    !message.guild
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

//This function will call functions to update the database with the correct data
function updateDatabase() {
  let guildIDs = client.guilds.cache.map((guild) => guild.id);
  updateServer(guildIDs);
  updateMember(guildIDs);
}

function updateServer(guildIDs) {
  guildIDs.forEach((guildID) => {
    client.guilds
      .fetch(guildID)
      .then((guild) => dataInstructions.uploadServer(guild.id, guild.name));
  });
}

function updateMember(guildIDs) {
  guildIDs.forEach((guildID) => {
    const list = client.guilds.cache.get(guildID);
    list.members.cache.each((member) => {
      if (!member.user.bot) {
        let roles = [];
        dataInstructions.uploadMember(member.user.id, member.user.username);
        member.roles.cache.each((role) => {
          roles.push(role.name);
        });
        dataInstructions.uploadMSWeak(guildID, member.user.id, roles);
      }
    });
  });
}

//Every 5 minutes the updateDatabase is called, 5 minutes puts less pressure on the system
let delay = 5;
let interval = delay * 60 * 1000;
setInterval(updateDatabase, interval);

client.login(token);
