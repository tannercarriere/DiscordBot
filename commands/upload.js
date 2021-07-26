const { MessageAttachment } = require('discord.js');
module.exports = {
    name: 'up',
    description: 'Uploads a file from the bot\'s server to the called channel.',
    execute(message, args, dir){
        curDirectory = "";
        dir.forEach(value => {
            curDirectory += `${value}/`;
        });
        //Create an attachment and send it to the channel that the command was sent from
        const attachment = new MessageAttachment(curDirectory+args);
        message.channel.send(attachment).catch(err =>{message.channel.send("File not found.")});
    }
}