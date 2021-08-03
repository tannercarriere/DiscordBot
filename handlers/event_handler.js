const fs = require('fs');
/**
 * Loads all the events from the events folder into the Events collection in the client.
 */
module.exports=(client, Discord)=>{
    const loadDir = (dir) =>{
        const events = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith(".js"));
        events.forEach(element => {
            const event = require(`../events/${dir}/${element}`);
            const name = element.split('.')[0];
            client.on(name, event.bind(null, Discord, client));
        });
    }
    const eventDirs = fs.readdirSync('./events/');
    eventDirs.forEach((element)=>{
        loadDir(element);
    });

}