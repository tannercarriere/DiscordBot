const fs = require('fs');
const fetch = require('node-fetch');
/**
 * Downloads a message attachment.
 * 
 * Downloads a message attachment from the sent message to the server. 
 */
module.exports = {
    name: 'down',
    description: 'Downloads a file from the message to the server. Takes the file name as argument. Creates a directory for the channel that the command was called from',
    execute(message, args, role){
        let file = message.attachments.first()
        if(args.length === 0){
            message.channel.send("You need to specify a file name.");
            return;
        }
        const channelName = message.channel.name;
        //Make a directory for the channel that the command was called on.
        fs.mkdirSync(channelName, { recursive: true }, (err) => {if (err) console.log(err);});
        //Create a fetch request from the url that is associated with the messages attachment.
        if(!file){
            message.channel.send("You need to attach a file to download.");
            return;
        }
        fetch(file.url).then(res => {
            //Create a write stream for the file we are going to create
            const dest = fs.createWriteStream(`./${channelName}/${args}`);
            //pipe the file to the destination.
            res.body.pipe(dest);
        }).catch(error => console.log(error));
    }
}