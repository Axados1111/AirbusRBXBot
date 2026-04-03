import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user')
        .addUserOption(opt => opt.setName('target').setDescription('User to warn').setRequired(true))
        .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({ content: 'You do not have permission to warn members.', ephemeral: true });
        }

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const warnings = JSON.parse(fs.readFileSync('warnings.json'));

        if (!warnings[user.id]) warnings[user.id] = [];
        warnings[user.id].push({ reason, moderator: interaction.user.tag, date: new Date().toISOString() });

        fs.writeFileSync('warnings.json', JSON.stringify(warnings, null, 2));
        await interaction.reply(`Warned ${user.tag} | Reason: ${reason}`);
    }
};
