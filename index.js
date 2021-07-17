const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const prefix = '!'

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

client.login(''); //API key here