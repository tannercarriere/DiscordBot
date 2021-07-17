module.exports = {
    name: 'ping',
    description: 'Responds to ping with pong',
    execute(message, args, role){
        message.channel.send('pong');
    }
}