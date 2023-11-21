const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`${client.user.tag} está rodando`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'roll') {
        const quantity = options.getNumber('quantity');
        const sides = options.getNumber('sides');

        if (!quantity || !sides) {
            return interaction.reply('Por favor, forneça valores válidos para a quantidade e os lados.');
        }

        if (quantity.toString().length > 2 || sides.toString().length > 2) {
            return interaction.reply('Digite no máximo dois dígitos');
        }   
        
        const results = rollDice(quantity, sides);
        const resultsString = results.join(', ');

        interaction.reply(`Resultados dos dados: ${resultsString}`);
    }
    
    if (commandName === 'fair_roll') {
        const quantity = options.getNumber('quantity');
        const sides = options.getNumber('sides');

        if (!quantity || !sides) {
            return interaction.reply('Por favor, forneça valores válidos para a quantidade e os lados.');
        }

        if (quantity.toString().length > 2 || sides.toString().length > 2) {
            return interaction.reply('Digite no máximo dois dígitos');
        }   

        const results = rollFairDice(quantity, sides);
        const resultsString = results.join(', ');

        interaction.reply(`Resultado que deveria ter sido: ${resultsString}`);

    }
});

function rollDice(quantity, sides) {
    const results = [];
    for (let i = 0; i < quantity; i++) {
        const rollResult = Math.floor(Math.random() * sides) + 1;
        results.push(rollResult);
    }
    return results;
}

function rollFairDice(quantity, sides) {
    const results = [];
    const minRoll = 6;
    const additionalRange = 5;

    for (let i = 0; i < quantity; i++) {
        const rollResult = Math.floor(Math.random() * additionalRange) + minRoll;
        results.push(rollResult);
    }
    return results;
}

client.login(process.env.TOKEN);