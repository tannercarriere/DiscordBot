const fs = require('fs');
module.exports = {
    name: 'dump',
    description: 'dumps messages recorded by the rec command. can specify what kind of file we would like defaults to .txt.',
    execute(message, args, recMsg){
        message.channel.send("⚫ recording stopped");
        if(recMsg.length === 0){
            return;
        }
        const channelName = message.channel.name;
        let fileName;
        if(args.length > 0){
            fileName = `${channelName}-${Date.now()}.${args}`;
        }else{
            fileName = `${channelName}-${Date.now()}.txt`;
        }
        //Make a directory for the channel that the command was called on.
        fs.mkdirSync(channelName, { recursive: true }, (err) => {if (err) console.log(err);});
        //Create a write stream for the file we are going to create
        const file = fs.createWriteStream(`./${channelName}/${fileName}`);
        file.on('error', err => {file.end();console.log(err)})
        recMsg.forEach(val =>{
            file.write(val.content.concat('\n'));
        })
        //write each thing stored in the recMsg array.
        file.end();
}
}