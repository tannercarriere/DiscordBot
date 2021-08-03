const dotenv = require('dotenv');
dotenv.config();
let dir = ["."];
let rec = false;
let recMsg = [];
const superUser = process.env.SUPER_USER_ID;// Grab the super user id from the .env file

/*
 * On each message the bot will check the prefix previously established, and make sure that the author wasn't the bot itself.
 * It uses a regex expression to split the command on any white space
 * We pop off the first arguement which is the command for the bot, then check that the command exsists, if it does it gets executed.
 */
module.exports = (Discord, client, message)=>{
    const prefix = '!'; //the prefix is what we use to tell the bot that we're issuing a command
    if(rec && !message.content.startsWith("!dump") && !message.author.bot){
        recMsg.push(message);
    }
    if(!message.content.startsWith(prefix) || message.author.bot){return}
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!command){return}
    //directory based commands
    if(cmd==='ls'||cmd==='cd'||cmd==='up'||cmd==='pwd'){
        command.execute(message, args, dir);
        return;
    }
    if(cmd==='play'||cmd==='skip'||cmd==='stop'){
        command.execute(message, args, dir, cmd);
        return;
    }
    //non-directory based commands
    if(cmd==="rec"){
        command.execute(message);
        rec = true;
        return;
    }
    if(cmd==="dump"){
        rec = false;
        command.execute(message, args, recMsg.splice(0,recMsg.length));
        return;
    }
    command.execute(message, args, superUser);
}