//TODO: Make a check for if the OS is windows or unix based and have the bot react appropriately.
module.exports = {
    name: 'shell',
    description: 'executes shell commands on the computer the bot is running on. I can not stress how unsafe this is.',
    execute(message, args, role){
        if(!message.member.roles.cache.has(role)){
            message.channel.send("You don't have permission to use the shell.");
            return -1;
        }
        const { spawn } = require( 'child_process' );
        const dir = spawn('wsl', args);

        dir.stdout.on('data', ( data ) => message.channel.send( `stdout: ${ data }`));
        dir.stderr.on('data', ( data ) => console.log( `stderr: ${ data }`));
        dir.on('close', ( code ) => console.log( `child process exited with code ${code}`));
    }
}

