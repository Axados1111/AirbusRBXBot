const { Client, GatewayIntentBits, Events } = require('discord.js');

console.log("🟡 Bot file loaded...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on('error', console.error);
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

client.on('guildMemberAdd', async (member) => {
  console.log("👤 Member join detected");

  try {
    const roleId = process.env.ROLE_ID;

    console.log("ROLE_ID =", roleId);

    if (!roleId) {
      console.log("❌ ROLE_ID missing in Railway variables");
      return;
    }

    const role = member.guild.roles.cache.get(roleId);

    if (!role) {
      console.log("❌ Role not found in server");
      return;
    }

    await member.roles.add(role);
    console.log(`✅ Role given to ${member.user.tag}`);
  } catch (err) {
    console.error("❌ Auto-role crash:", err);
  }
});

client.login(process.env.TOKEN);
