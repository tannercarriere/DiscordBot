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
        var isWin = process.platform === "win32";
        //Need to use the tirnary operator to dynamically assgning the spawn constant
        const cmd = isWin ? spawn('wsl', args) : spawn( args.shift(), args );
        cmd.stdout.on( 'data', ( data ) => message.channel.send( `stdout: ${ data }` ));
        cmd.stderr.on( 'data', ( data ) => message.channel.send( `stderr: ${ data }` ));
        cmd.on( 'close', ( code ) => message.channel.send( `child process exited with code ${ code }` ));
        
    }
}

