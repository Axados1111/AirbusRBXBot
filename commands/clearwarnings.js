const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
    .setDescription('Clear warnings'),

  async execute(interaction) {
    await interaction.reply('Warnings cleared (placeholder)');
  }
};
