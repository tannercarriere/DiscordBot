const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
    name: 'rec',
    description: 'Starts recording messages that are sent to the channel.',
    execute(message){
        message.channel.send("🔴 recording");
    }
}