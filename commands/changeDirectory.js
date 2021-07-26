/*
* A Bot specific cd.
*
* While we can use the shell command to use cd. That ls doesn't track what directory we should be in the file directory. 
* This gets around it by having the bot keep track of it's own directory, and adding the current directory to the cd command.
*/
module.exports = {
    name: 'cd',
    description: 'A bot specific cd.',
    execute(message, args, dir){
        curDirectory = "";

        if(args[0] === ".."){//Check if the user wants to return up a level
            dir.pop();
            dir.forEach(value => {
                curDirectory += `${value}/`;
            });
            
            message.channel.send(`${curDirectory}`);
            return;
        }

        //Create a well formed file path
        dir.push(`${args}`);
        dir.forEach(value => {
            curDirectory += `${value}/`;
        });

        const { spawn } = require( 'child_process' );
        const cmd = spawn('wsl', ['cd', curDirectory]);

        cmd.stderr.on('data', (data) => { //if the file path causes an error tell the user and remove the last thing added
            message.channel.send( `stdout: ${ data }`);
            dir.pop();
        });
        cmd.on('exit', code =>{
            if(code === 0){
                message.channel.send(`${curDirectory}`);
            }
        })
    }
}
