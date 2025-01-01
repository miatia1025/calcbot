const wait = require("timers/promises").setTimeout;
const { SlashCommandBuilder } = require("discord.js");
const { stringify } = require("querystring");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mysterious_calc")
    .setDescription("三つの数を与えて謎計算するよ")
    .addIntegerOption((option) =>
      option.setName("front_value").setDescription("最初の数").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("allies_summed_value")
        .setDescription("残り全員の和")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply("計算中...");
    await wait(1_000);

    const frontValue = interaction.options.get("front_value").value;
    const alliesSummedValue = interaction.options.get(
      "allies_summed_value"
    ).value;
    const result = frontValue + alliesSummedValue / 5;

    await interaction.editReply(`${result}`);
  },
};
