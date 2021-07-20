const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
    name: 'down',
    description: 'Downloads a file from the message to the server. Takes the file name as argument.',
    execute(message, args, role){
        const channelName = message.channel.name;
        fs.mkdirSync(channelName, { recursive: true }, (err) => {if (err) console.log(err);})
        fetch(message.attachments.first().url).then(res => {
            const dest = fs.createWriteStream("./"+channelName+"/"+args);
            res.body.pipe(dest);
        }).catch(error => console.log(error));
    }
}