const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports ={
    name: 'play',
    description: 'Plays music found on the server.',
    async execute (message, args, dir){
        const out = message.member.voice.channel;
        const permissions = out.permissionsFor(message.client.user);

        if(!out){
            message.channel.send("you need to be in the voice channel to play music");
        }
        if(!permissions.has('CONNECT')||!permissions.has('SPEAK')){
            message.channel.send("you don't have the proper permissions.");
        }
        if(args.length === 0){
            message.channel.send("you need to send something to play");
        }
        if(!args[0].startsWith("-")){
            message.channel.send("you need to specify a source. -l for local or -yt for youtube.");
        }
        const src = args.shift();
        if(src === "-l"){
            curDirectory = "";
            dir.forEach(value => {
                console.log(value);
                curDirectory += `${value}/`;
            });
            out.join().then(connection => {
                console.log(args[1]);
                const dispatcher = connection.play(`${curDirectory}/${args.join(' ')}`);
            });
        }else if(src === "-yt"){
            const connect = await out.join();

            const search = async (query) => {
                const results = await ytSearch(query);
                return (results.videos.length > 1) ? results.videos[0] : null; 
            }

            const video = await search(args.join(' '));

            if(video){
                const stream = ytdl(video.url, {filter: 'audioonly'});
                connect.play(stream, {seek: 0, volume: 1})
                .on('finish', () =>{
                    out.leave();
                });
                await message.reply(`Now Playing: ${video.title}`);
            }else{
                message.channel.send('no video found');
            }
        }
    }
}