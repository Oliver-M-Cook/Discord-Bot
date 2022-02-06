const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/botDatabase.db', (err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Connected to database.');
});

function uploadServer(serverID, serverName){
    db.run(`INSERT INTO Servers VALUES(?, ?)`, [serverID, serverName], function(err){
        if(err){
            db.run(`UPDATE Servers SET serverName = ? WHERE serverID = ?`, [serverName, serverID], function(err){
                if(err){
                    console.error(err.message);
                }
            });
        }
    });
}

function uploadMember(memberID, memberName){
    db.run(`INSERT INTO Members VALUES(?, ?)`, [memberID, memberName], function(err){
        if(err){
            db.run(`UPDATE Members SET memberName = ? WHERE memberID = ?`, [memberName, memberID], function(err){
                if(err){
                    console.error(err.message);
                }
            });
        }
    });
}

function uploadMSWeak(serverID, memberID, memberRole){
    db.run(`INSERT INTO ServerMemberWeak (serverID, memberID, memberRole) VALUES(?, ?, ?)`, [serverID, memberID, memberRole], function(err){
        if(err){
            db.run(`UPDATE ServerMemberWeak SET memberRole = ? WHERE serverID = ? AND memberID = ?`, [memberRole, serverID, memberID], function(err){
                if(err){
                    console.error(err.message);
                }
            });
        }
    });
}

module.exports = {uploadServer, uploadMember, uploadMSWeak};