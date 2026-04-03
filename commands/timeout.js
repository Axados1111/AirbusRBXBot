import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user')
        .addUserOption(opt => opt.setName('target').setDescription('User to timeout').setRequired(true))
        .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in minutes').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({ content: 'You do not have permission to timeout members.', ephemeral: true });
        }

        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getInteger('duration');

        if (!member) return interaction.reply('User not found.');
        try {
            await member.timeout(duration * 60 * 1000, `Timed out by ${interaction.user.tag}`);
            await interaction.reply(`${user.tag} has been timed out for ${duration} minutes.`);
        } catch (err) {
            console.error(err);
            await interaction.reply('Failed to timeout the user.');
        }
    }
};
