const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Shows server info'),

  async execute(interaction) {
    const guild = interaction.guild;
    await interaction.reply(`Server: ${guild.name} | Members: ${guild.memberCount}`);
  }
};
