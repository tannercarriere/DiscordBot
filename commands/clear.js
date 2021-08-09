module.exports = {
    name: 'clear',
    description: 'Clears all messages from a given channel',
    async execute(message, args, dir){
        let fetched= await message.channel.messages.fetch({limit: 100});
        while(fetched.size >= 2){
            message.channel.bulkDelete(fetched);
        }
    }
}