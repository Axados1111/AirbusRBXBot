import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const { default: command } = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Slash command handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Error executing command!', ephemeral: true });
    }
});

// Welcome new members + auto-role
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    const role = member.guild.roles.cache.get(process.env.MEMBER_ROLE_ID);
    if (channel) channel.send(`🚀 Welcome ${member.user} to Airbus RBX! Check the rules and enjoy the community.`);
    if (role) member.roles.add(role).catch(console.error);
});

client.login(process.env.DISCORD_TOKEN);
