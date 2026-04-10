const fs = require('fs');
const path = require('path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events
} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
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

  console.log(`Loaded ${client.commands.size} commands`);
} else {
  console.log("⚠️ No commands folder found");
}


// READY
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});


// SLASH COMMAND HANDLER
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);

    if (interaction.replied || interaction.deferred) {
      await interaction.editReply('❌ Error running command.');
    } else {
      await interaction.reply({ content: '❌ Error running command.', ephemeral: true });
    }
  }
});


// AUTO ROLE ON JOIN
client.on(Events.GuildMemberAdd, async member => {
  try {
    const roleId = process.env.ROLE_ID;
    if (!roleId) return;

    const role = member.guild.roles.cache.get(roleId);
    if (!role) return;

    await member.roles.add(role);

    console.log(`🎉 Gave role to ${member.user.tag}`);
  } catch (err) {
    console.error("Auto-role error:", err);
  }
});


// LOGIN
client.login(process.env.TOKEN);
