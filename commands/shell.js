module.exports = {
    name: 'shell',
    description: 'executes shell commands on the computer the bot is running on. I can not stress how unsafe this is.',
    execute(message, args, role){
        if(!message.member.roles.cache.has(role)){
            message.channel.send("You don't have permission to use the shell.");
            return -1;
        }
        const { spawn } = require( 'child_process' );
        // NOTE: Windows Users, this command appears to be differ for a few users.
        // You can think of this as using Node to execute things in your Command Prompt.
        // If `cmd` works there, it should work here.
        // If you have an issue, try `dir`:
        // const dir = spawn( 'dir', [ '.' ] );
        const dir = spawn('wsl', args);

        dir.stdout.on('data', ( data ) => message.channel.send( `stdout: ${ data }`));
        dir.stderr.on('data', ( data ) => console.log( `stderr: ${ data }`));
        dir.on('close', ( code ) => console.log( `child process exited with code ${code}`));
    }
}

