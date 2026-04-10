const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('User info lookup')
    .addUserOption(o => o.setName('user').setDescription('User')),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(`WhoIs: ${user.tag}`);
  }
};
