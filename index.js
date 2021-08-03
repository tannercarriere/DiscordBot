const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const { Console } = require('console');
dotenv.config();

const client = new Discord.Client(); //Create session does not start the session
const apiKey = process.env.DISCORD_API_KEY;// Grab the API key from the .env file

const handlerFile = fs.readdirSync('./handlers/').filter(file => file.endsWith(".js"));

//Adds every command to a discord collection 
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

//Load the handlers for both commands and events.
handlerFile.forEach((file)=>{
    require(`./handlers/${file}`)(client, Discord);
});

//Logs the bot in with the appropriate API key
client.login(apiKey).catch(error =>{
    console.log("Wrong key.");
});