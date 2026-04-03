import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(opt => opt.setName('target').setDescription('User to kick').setRequired(true))
        .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick')),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        }
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!member) return interaction.reply('User not found.');
        try {
            await member.kick(reason);
            await interaction.reply(`Kicked ${user.tag} | Reason: ${reason}`);
        } catch (err) {
            console.error(err);
            await interaction.reply('Failed to kick the user.');
        }
    }
};
