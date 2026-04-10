const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panic')
    .setDescription('Enable panic mode'),

  async execute(interaction) {
    await interaction.reply('🚨 Panic mode activated (placeholder)');
  }
};
