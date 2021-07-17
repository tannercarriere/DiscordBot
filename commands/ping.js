module.exports = {
    name: 'ping',
    description: 'Responds to ping with pong',
    execute(message, args){
        message.channel.send('pong');
    }
}