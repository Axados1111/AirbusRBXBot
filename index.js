import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes, Collection } from 'discord.js';
import fs from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // 🔥 LOAD COMMANDS
    const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.default.data.name, command.default);
    }

    // 🔥 DEPLOY COMMANDS (PUT IT HERE)
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    const commands = client.commands.map(cmd => cmd.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
    );

    console.log('✅ Commands deployed');
});

// 🔥 HANDLE COMMANDS
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(interaction);
});

// LOGIN
client.login(process.env.TOKEN);
