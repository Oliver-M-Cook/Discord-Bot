const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/botDatabase.db', (err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Connected to database.');
});

const dropProfanity = `DROP TABLE IF EXISTS ProfanityFilter`;
const dropRules = `DROP TABLE IF EXISTS ServerRules`;
const dropSMWeak = `DROP TABLE IF EXISTS ServerMemberWeak`;
const dropServers = `DROP TABLE IF EXISTS Servers`;
const dropMembers = `DROP TABLE IF EXISTS Members`;

db.run(dropProfanity);
db.run(dropRules);
db.run(dropSMWeak);
db.run(dropServers);
db.run(dropMembers);