const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
    name: 'down',
    description: 'Downloads a file from the message to the server. Takes the file name as argument. Creates a directory for the channel that the command was called from',
    execute(message, args, role){
        const channelName = message.channel.name;
        //Make a directory for the channel that the command was called on.
        fs.mkdirSync(channelName, { recursive: true }, (err) => {if (err) console.log(err);});
        //Create a fetch request from the url that is associated with the messages attachment.
        fetch(message.attachments.first().url).then(res => {
            //Create a write stream for the file we are going to create
            const dest = fs.createWriteStream(`./${channelName}/${args}`);
            //pipe the file to the destination.
            res.body.pipe(dest);
        }).catch(error => console.log(error));
    }
}