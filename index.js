const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');


const client = new Discord.Client();
const apiKey = process.env.DISCORD_API_KEY;
const prefix = '!'

dotenv.config();

client.commands = new Discord.Collection();

client.once('ready', ()=>{
    console.log("Shell ready");
})

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot){return}
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping"){
        message.channel.send("pong.");
    }
})

client.login(apiKey); //API key here