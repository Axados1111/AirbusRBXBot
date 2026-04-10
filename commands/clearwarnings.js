const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
    .setDescription('Clear all warnings for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to clear warnings for')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('user');

    // Load warnings
    let warnings = {};
    if (fs.existsSync('./warnings.json')) {
      warnings = JSON.parse(fs.readFileSync('./warnings.json'));
    }

    // Clear warnings
    warnings[target.id] = 0;

    // Save file
    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

    // Log channel (replace with your channel ID)
    const logChannel = interaction.guild.channels.cache.get('LOG_CHANNEL_ID');

    if (logChannel) {
      logChannel.send(`${target.tag}'s warnings were cleared by ${interaction.user.tag}`);
    }

    await interaction.reply({
      content: `✅ Cleared all warnings for ${target.tag}`,
      ephemeral: true
    });
  }
};
