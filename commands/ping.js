/**
 * Pings the channel
 * 
 * Causes the bot to ping the channel. This is here mostly for testing.
 */
module.exports = {
    name: 'ping',
    description: 'Responds to ping with pong',
    execute(message, args, role){
        message.channel.send('pong');
    }
}