const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports ={
    name: 'stop',
    description: 'Stops music found on the server.',
    async execute (message, args){
        const out = message.member.voice.channel;
        const permissions = out.permissionsFor(message.client.user);

        if(!out){
            message.channel.send("you need to be in the voice channel to play music");
        }
        await out.leave();
        await message.channel.send("Stopping play back")
    }

}