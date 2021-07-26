module.exports = {
    name: 'pwd',
    description: 'A bot specific pwd.',
    execute(message, args, dir){
        curDirectory = "";
        dir.forEach(value => {
            curDirectory += `${value}/`;
        });

        message.channel.send(curDirectory);
    }
}