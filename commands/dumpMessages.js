const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
    name: 'dump',
    description: 'dumps messages recorded by the rec command',
    execute(message, args, role, recMsg){
        message.channel.send("⚫ recording stopped");
        if(recMsg.length === 0){
            return;
        }
        const channelName = message.channel.name;
        const fileName = `${channelName}-${Date.now()}.txt`;
        //Make a directory for the channel that the command was called on.
        fs.mkdirSync(channelName, { recursive: true }, (err) => {if (err) console.log(err);});
        //Create a write stream for the file we are going to create
        const dest = fs.createWriteStream(`./${channelName}/${fileName}`);
        //write each thing stored in the recMsg array.
        fs.writeFile(`./${channelName}/${fileName}`, recMsg.splice(0,recMsg.length), { flag: 'w+' }, err => {});
}
}