module.exports = {
    name: 'rec',
    description: 'Starts recording messages that are sent to the channel.',
    execute(message){
        message.channel.send("🔴 recording");
    }
}