import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

export default {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Check warnings for a user')
        .addUserOption(opt => opt.setName('target').setDescription('User to check').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const warnings = JSON.parse(fs.readFileSync('warnings.json'));

        if (!warnings[user.id] || warnings[user.id].length === 0) {
            return interaction.reply(`${user.tag} has no warnings.`);
        }

        const warnList = warnings[user.id].map((w, i) => `${i + 1}. ${w.reason} (by ${w.moderator} on ${w.date.split('T')[0]})`).join('\n');
        await interaction.reply(`Warnings for ${user.tag}:\n${warnList}`);
    }
};
