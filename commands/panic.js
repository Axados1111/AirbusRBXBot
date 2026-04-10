const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panic')
    .setDescription('Lock all channels in the server (EMERGENCY)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache;

    await interaction.reply({ content: '🚨 Panic mode activated! Locking all channels...', ephemeral: true });

    channels.forEach(async (channel) => {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
          SendMessages: false
        });
      } catch (err) {
        console.log(`Couldn't lock ${channel.name}`);
      }
    });

    // Optional log
    const logChannel = interaction.guild.channels.cache.get('LOG_CHANNEL_ID');
    if (logChannel) {
      logChannel.send(`🚨 Panic mode activated by ${interaction.user.tag}`);
    }
  }
};
