const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();

// Load commands safely
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
}

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    if (!interaction.replied) {
      await interaction.reply({ content: 'Error running command', ephemeral: true });
    }
  }
});

client.on(Events.GuildMemberAdd, async member => {
  try {
    const roleId = process.env.ROLE_ID;
    if (!roleId) return;

    const role = member.guild.roles.cache.get(roleId);
    if (!role) return;

    await member.roles.add(role);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.TOKEN);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log("❌ Command not found:", interaction.commandName);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error("❌ Command error:", err);

    if (!interaction.replied) {
      await interaction.reply({
        content: "❌ There was an error running this command.",
        ephemeral: true
      });
    }
  }
});
