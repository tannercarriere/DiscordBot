const fs = require('fs');
/**
 * Loads all the commands from the command folder into the Commands collection in the client.
 */
module.exports = (client, Discord)=>{
    const commandFile = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
    commandFile.forEach(element => {
        const command = require(`../commands/${element}`);
        if(command.name){
            client.commands.set(command.name, command);
        }
    });
}