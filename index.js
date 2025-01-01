// Import prequisites
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Import Commands
const mysteriousCalcCommand = require("./commands/slash/mysteriousCalc.js");

// Initialize
dotenv.config();
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register Commands to Client
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

client.commands = new Collection();

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`[INFO] Register command: ${command.data.name}`);
    } else {
      console.log(
        `[WARN] ${file} is not a valid command file. "data" or "execute" propaty is missing.`
      );
    }
  }
}

// Reading external Events Files
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Launch bot
client.login(token);
