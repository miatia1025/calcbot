// Import field
const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Initialize
dotenv.config();
token = process.env.BOT_TOKEN;
clientId = process.env.APP_ID;
guildId = process.env.GUILD_ID;

// Grab Comands to Push to Discord
const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARN] ${file} is not a valid command file. "data" or "execute" propaty is missing.`
      );
    }
  }
}

// Push Commands to Discord
const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(
      `Staeted refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
})();
