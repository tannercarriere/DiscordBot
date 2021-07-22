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
        curDirectory = "";
        dir.forEach(value => {
            curDirectory += `${value}/`;
        });

        const { spawn } = require( 'child_process' );
        const cmd = spawn('wsl', ['ls', curDirectory]);
        console.log(curDirectory);
        cmd.stdout.on('data', ( data ) => message.channel.send( `stdout: ${ data }`));
    }
}