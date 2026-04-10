const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.GuildMemberAdd, async (member) => {
  try {
    const roleId = process.env.ROLE_ID;
    if (!roleId) return;

    const role = member.guild.roles.cache.get(roleId);
    if (!role) return;

    await member.roles.add(role);
    console.log(`Gave role to ${member.user.tag}`);
  } catch (err) {
    console.error("Auto-role error:", err);
  }
});

client.login(process.env.TOKEN);
