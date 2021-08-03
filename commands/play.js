const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const fs = require('fs');

const system_queue = new Map();

module.exports ={
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'Plays music found on the server.',
    async execute (message, args, dir, cmd){
        const out = message.member.voice.channel;
        const permissions = out.permissionsFor(message.client.user);

        if(!out){message.channel.send("you need to be in the voice channel to play music");return;}
        if(!permissions.has('CONNECT')||!permissions.has('SPEAK')){message.channel.send("you don't have the proper permissions.");return;}

        const channel_queue = system_queue.get(message.guild.id);

        if(cmd==='play'){
            if(args.length === 0){message.channel.send("you need to send something to play");return;}
            if(!args[0].startsWith("-")){message.channel.send("you need to specify a source. -l for local or -yt for youtube.");return;}
            play(message, args, dir, out, channel_queue);
            return;
        }
        if(cmd==='skip'){
            skip(message, channel_queue);
            return;
        }
        if(cmd==='stop'){
            stop(message, channel_queue);
            return;
        }
        
    }
}

async function play(message, args, dir, out, channel_queue){
    const src = args.shift();
    let song = {};

    if(src === "-l"){
        curDirectory = "";
        dir.forEach(value => {
            console.log(value);
            curDirectory += `${value}/`;
        });
        let songName = args.join(' ')
        let targetFile = `${curDirectory}/${songName}`
        fs.access(targetFile, (error)=>{
            if(error){
                message.channel.send("File not found");
            }else{
                song = {title: songName, url: targetFile, src: src};
            }
        })
    }else if(src === "-yt"){
        if(ytdl.validateURL(args[0])){
            const info = await ytdl.getInfo(args[0]);
            song = {title: info.videoDetails.title, url: info.videoDetails.video_url, src: src};
        }else{
            const search = async (query) => {
                const results = await ytSearch(query);
                return (results.videos.length > 1) ? results.videos[0] : null; 
            }
    
            const video = await search(args.join(' '));
    
            if(video){
                song = {title: video.title, url: video.url, src: src};
            }else{
                message.channel.send('no video found');
            }
        }
    }

    if(!channel_queue){
        const queue_construtor = {
            voiceChannel: out,
            textChannel:  message.channel,
            connection:   null,
            songs:        []
        }
        system_queue.set(message.guild.id, queue_construtor);
        queue_construtor.songs.push(song);

        try{
            const connection = await queue_construtor.voiceChannel.join();
            queue_construtor.connection = connection;
            videoPlayer(message.guild, queue_construtor.songs[0]);
        }catch(error){
            system_queue.delete(message.guild.id);
            message.channel.send("Error connecting");
            throw error;
        }
    }else{
        channel_queue.songs.push(song);
        return message.channel.send(`${song.title} added to queue.`)
    }
}

const videoPlayer = async (guild, song) => {
    const channel_queue = system_queue.get(guild.id);

    if(!song){
        channel_queue.voiceChannel.leave();
        system_queue.delete(guild.id);
        return;
    }
    
    const stream = ytdl(song.url, {filter: 'audioonly'});
    channel_queue.connection.play(stream, {seek: 0, volume: 0.5})
    .on('finish', ()=>{
        channel_queue.songs.shift();
        videoPlayer(guild, channel_queue.songs[0]);
    });
    await channel_queue.textChannel.send(`Now playing ${song.title}`);
}

const skip = async (message, channel_queue) => {
    if(!channel_queue){
        return message.channel.send("their are no more songs in the queue");
    }
    channel_queue.connection.dispatcher.end();
}

const stop = async (message, channel_queue) => {
    await message.channel.send("Stopping play back")
    channel_queue.songs = [];
    channel_queue.connection.dispatcher.end();
}