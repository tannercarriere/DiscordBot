/*
* A Bot specific ls.
*
* While we can use the shell command to use ls. That ls doesn't track what directory we should be in. 
* This gets around it by having the bot keep track of it's own directory, and adding the current directory to the ls command.
*/
module.exports = {
    name: 'ls',
    description: 'A bot specific ls.',
    execute(message, args, dir){
        curDirectory = dir.join('/') + '/';
        const { spawn } = require( 'child_process' );
        var isWin = process.platform === "win32";
        //Need to use the tirnary operator to dynamically assgning the spawn constant
        const cmd = isWin ? spawn('wsl', ['ls', curDirectory]) : spawn( 'ls', [curDirectory] );
        cmd.stdout.on('data', ( data ) => message.channel.send( `${ data }`));
    }
}