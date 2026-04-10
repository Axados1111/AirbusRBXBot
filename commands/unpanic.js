const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unpanic')
    .setDescription('Unlock all channels')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache;

    await interaction.reply({ content: '🔓 Unlocking all channels...', ephemeral: true });

    channels.forEach(async (channel) => {
      try {
        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
          SendMessages: true
        });
      } catch (err) {}
    });
  }
};
