const Discord = require('discord.js');
const {lstArgs, inVoiceChannel} = require('./functions.js');
require('dotenv').config();

const prefix = ".";
const token = process.env.client_id;
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);



client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const argument = message.content.slice(prefix.length).split(' ');
	const command = argument.shift().toLowerCase();
	
	if (command === 'moo' && inVoiceChannel(message)) {
		const argSelect = argument[0];

		// Commands
		switch(true) {
			case lstArgs[argSelect] !== undefined:
				message.channel.send(`Found. Entering chat...`);

				//Have bot enter channel > Start playing .mp3 file
				const connection = await message.member.voice.channel.join();
				const dispatcher = connection.play(lstArgs[argSelect]);
				dispatcher;

				//ERROR HANDLE
				dispatcher.on('error', () => {
					console.error
					const leave = message.member.voice.channel.leave();
					leave;
				})
				break; 
			// Disconnect
			case argSelect === 'dc':
				const leave = message.member.voice.channel.leave();
				leave;
				break;
			// Help
			case argSelect.toLowerCase() === 'help':
				message.channel.send(' ```AVAILABLE COMMANDS: \n COMMANDS HERE```');
				break;
			// Invalid command
			default:
				message.channel.send("Cannot be found :(");
		}
		
	}
	else {
		message.channel.send(`Yes?`);
	}
	return false;
});
