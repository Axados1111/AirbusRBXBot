const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages')
    .addIntegerOption(o => o.setName('amount').setDescription('Number').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.reply(`Would delete ${amount} messages (logic not added yet)`);
  }
};
