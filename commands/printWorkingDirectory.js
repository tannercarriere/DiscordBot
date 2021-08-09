/**
 * Prints current directory.
 * 
 * Prints out the current directory the bot is in.
 */
module.exports = {
    name: 'pwd',
    description: 'A bot specific pwd.',
    execute(message, args, dir){
        curDirectory = dir.join('/') + '/';
        message.channel.send(curDirectory);
    }
}