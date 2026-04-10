const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('Check warnings'),

  async execute(interaction) {
    await interaction.reply('No warnings found (placeholder)');
  }
};
