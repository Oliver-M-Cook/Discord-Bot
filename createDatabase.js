const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/botDatabase.db', (err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Connected to database.');
});

const servers = `CREATE TABLE IF NOT EXISTS Servers (
    serverID INTEGER PRIMARY KEY, 
    serverName TEXT NOT NULL
    )`;

const serverRules = `CREATE TABLE IF NOT EXISTS ServerRules (
    serverID INTEGER NOT NULL,
    ruleID INTEGER PRIMARY KEY,
    rule TEXT NOT NULL,

    CONSTRAINT fk_column
        FOREIGN KEY (serverID)
        REFERENCES Servers (serverID)
    )`;

const profanityFilter = `CREATE TABLE IF NOT EXISTS ProfanityFilter (
    serverID INTEGER NOT NULL,
    profanityID INTEGER PRIMARY KEY AUTOINCREMENT,
    profanity TEXT NOT NULL,

    CONSTRAINT fk_column
        FOREIGN KEY (serverID)
        REFERENCES Servers (serverID)
    )`;

const members = `CREATE TABLE IF NOT EXISTS Members (
    memberID INTEGER PRIMARY KEY, 
    memberName TEXT NOT NULL
    )`;

const serverMemberWeak = `CREATE TABLE IF NOT EXISTS ServerMemberWeak (
    serverID INTEGER,
    memberID INTEGER,
    memberRole TEXT NOT NULL,
    banned BOOLEAN,
    bannedDate DATE,
    banReason TEXT,
    warningCount INTEGER,

    CONSTRAINT fk_column
        FOREIGN KEY (serverID) REFERENCES Servers (serverID)
        FOREIGN KEY (memberID) REFERENCES Members (memberID)

    CONSTRAINT pk_column
        PRIMARY KEY (serverID, memberID)
    )`;

db.run(servers);
db.run(serverRules);
db.run(profanityFilter);
db.run(members);
db.run(serverMemberWeak);

db.close();