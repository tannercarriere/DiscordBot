const { MessageAttachment } = require('discord.js');
/**
 * Uploads a file to the Discord channel. 
 * 
 * Uploads a specifed file by attaching it to a message and sending it to the server.
 */
module.exports = {
    name: 'up',
    description: 'Uploads a file from the bot\'s server to the called channel.',
    execute(message, args, dir){
        curDirectory = dir.join('/') + '/';
        //Create an attachment and send it to the channel that the command was sent from
        const attachment = new MessageAttachment(curDirectory+args);
        message.channel.send(attachment).catch(err =>{message.channel.send("File not found.")});
    }
}