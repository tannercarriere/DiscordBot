const { MessageAttachment } = require('discord.js');
module.exports = {
    name: 'up',
    description: 'Uploads a file from the bot\'s server to the called channel.',
    execute(message, args, role){
        const attachment = new MessageAttachment('./'+args);
        message.channel.send(attachment);
    }
}