const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const rest = new REST({
    version: '10'
}).setToken(process.env.TOKEN);

const commands = [
   {
    name: 'roll',
    description: 'adds two numbers',
    options: [
        {
            name: 'quantity',
            description: 'number of dices',
            type: ApplicationCommandOptionType.Number,
            required: true,             
        },
        {
            name: 'sides',
            description: 'sides of dices',
            type: ApplicationCommandOptionType.Number,
            required: true,                    
        }
    ]
   },
   {
    name: 'fair_roll',
    description: 'adds only dices with 6+',
    options: [
        {
            name: 'quantity',
            description: 'number of dices',
            type: ApplicationCommandOptionType.Number,
            required: true,            
           
        },
        {
            name: 'sides',
            description: 'sides of dices',
            type: ApplicationCommandOptionType.Number,
            required: true,                     
        }
    ]
   }
];

(async () => {
    try {
        console.log('Registrando comandos...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('Todos os comandos registrados!');
    } catch (error) {
        console.log(`Houve um erro: ${error}`);
    }
})();
