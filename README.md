# Discoshell

Discoshell, or Discord Shell, is a shell that operates as a Discord bot. It can access
files on the server that the bot is running on, as well as navigate through the file
structure. 

## Usage
This bot functions as a psuedo SSH and SFTP. It can upload files from the host to the
Discord server that it is running on. As well as download files from Discord's own
file server that have been attached to messages. However this is limited by the
maximum file size for message attachements.

## Commands

| Command     | Description                |
| :---------- | :------------------------- |
| `shell`     | Creates a shell and executes whatever command is specified.                                 |
| `cd`        | Bot specific cd. `shell` doesn't maintain state this does.                                  |
| `ls`        | Bot specific ls. `shell` doesn't maintain state this does.                                  |
| `pwd`       | Bot specific cd. `shell` doesn't maintain state this does.                                  |
| `up`        | Upload a file from the running server to the called Discord channel.                        |
| `down`      | Download a file from the called Discord channel to the server running the bot.              |
| `rec`       | Record messages until `dump` is called.                                                     |
| `dump`      | Sends all recorded messages to a file. if no file type is specified it will dump to a .txt. |
| `play`      | Plays either a YouTube video or a local music file. `-yt` for YouTube `-l` for local.       |
| `skip`      | Skips songs in the play queue.                                                              |
| `stop`      | Stops all audio playback and deletes the playback queue.                                    |
| `ping`      | Pings the channel. Used for testing.                                                        |
