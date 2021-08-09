/**
 * Record command.
 * 
 * This is here to satisfy the handlers. The structures for recording are in the message handler.
 */
module.exports = {
    name: 'rec',
    description: 'Starts recording messages that are sent to the channel.',
    execute(message){
        message.channel.send("🔴 recording");
    }
}