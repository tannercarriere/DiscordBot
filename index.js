const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client(); //Create session does not start the session
const apiKey = process.env.DISCORD_API_KEY;// Grab the API key from the .env file
const prefix = '!'; //the prefix is what we use to tell the bot that we're issuing a command
const superUser = process.env.SUPER_USER_ID;// Grab the super user id from the .env file
const commandFile = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));//grab all command files from the commands folder

//Adds every command to a discord collection 
client.commands = new Discord.Collection();
commandFile.forEach(element => {
    const command = require(`./commands/${element}`);
    client.commands.set(command.name, command);
});

//Lets the user know that the bot is running
client.once('ready', ()=>{
    console.log("Shell ready");
});
/*
 * On each message the bot will check the prefix previously established, and make sure that the author wasn't the bot itself.
 * It uses a regex expression to split the command on any white space
 * We pop off the first arguement which is the command for the bot, then check that the command exsists, if it does it gets executed.
 */
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot){return}
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(!client.commands.get(cmd.toString())){return}

    client.commands.get(cmd.toString()).execute(message, args, superUser);
});

//Logs the bot in with the appropriate API key
client.login(apiKey).catch(error =>{
    console.log("Wrong key.");
});