const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
const apiKey = process.env.DISCORD_API_KEY;
const prefix = '!';
const superUser = '866067521118535730'
const commandFile = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));

client.commands = new Discord.Collection();
commandFile.forEach(element => {
    const command = require(`./commands/${element}`);
    client.commands.set(command.name, command);
});

client.once('ready', ()=>{
    console.log("Shell ready");
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot){return}
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(!client.commands.get(cmd.toString())){return}

    client.commands.get(cmd.toString()).execute(message, args, superUser);
});

client.login(apiKey).catch(error =>{
    console.log("Wrong key.");
}); //API key here*/