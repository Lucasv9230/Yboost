const express = require('express');
const fs = require('fs');
let pokemons = require('./db-pokemons');

const app = express();
const PORT = 3000;

app.use(express.json());

/*
* AJOUT AUTOMATIQUE DE DRACOFEU EN BAS
*/
const dracofeuExists = pokemons.some(p => p.name === "Dracofeu");

if (!dracofeuExists) {
    const newId = Math.max(...pokemons.map(p => p.id)) + 1;

    const dracofeu = {
        id: newId,
        name: "Dracofeu",
        hp: 78,
        cp: 12,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
        types: ["Feu", "Vol"],
        created: new Date()
    };

    pokemons.push(dracofeu);

    const fileContent = `const pokemons = ${JSON.stringify(pokemons, null, 2)};\n\nmodule.exports = pokemons;`;
    fs.writeFileSync('./db-pokemons.js', fileContent);

    console.log("Dracofeu ajouté automatiquement !");
} else {
    console.log("Dracofeu déjà présent, aucun ajout.");
}

/*
* GET TOUS LES POKÉMONS
*/
app.get('/api/pokemons', (req, res) => {
    res.json(pokemons);
});

/*
* GET UN POKÉMON PAR ID
*/
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);

    if (!pokemon) {
        return res.status(404).json({ message: "Pokemon introuvable" });
    }

    res.json(pokemon);
});

/*
* PUT — MODIFIER UN POKÉMON (ANTI‑CRASH)
*/
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);

    if (!pokemon) {
        return res.status(404).json({ message: "Pokemon introuvable" });
    }

    const data = req.body || {};

    if (data.name !== undefined) pokemon.name = data.name;
    if (data.hp !== undefined) pokemon.hp = data.hp;
    if (data.cp !== undefined) pokemon.cp = data.cp;
    if (data.picture !== undefined) pokemon.picture = data.picture;
    if (data.types !== undefined) pokemon.types = data.types;

    const fileContent = `const pokemons = ${JSON.stringify(pokemons, null, 2)};\n\nmodule.exports = pokemons;`;
    fs.writeFileSync('./db-pokemons.js', fileContent);

    res.json({ message: "Pokemon mis à jour", pokemon });
});

/*
* PATCH — Modifier seulement une partie du Pokémon
*/
app.patch('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);

    if (!pokemon) {
        return res.status(404).json({ message: "Pokemon introuvable" });
    }

    const data = req.body || {};

    // On modifie uniquement ce qui est envoyé
    if (data.name !== undefined) pokemon.name = data.name;
    if (data.hp !== undefined) pokemon.hp = data.hp;
    if (data.cp !== undefined) pokemon.cp = data.cp;
    if (data.picture !== undefined) pokemon.picture = data.picture;
    if (data.types !== undefined) pokemon.types = data.types;

    // Sauvegarde dans la base
    const fileContent = `const pokemons = ${JSON.stringify(pokemons, null, 2)};\n\nmodule.exports = pokemons;`;
    fs.writeFileSync('./db-pokemons.js', fileContent);

    res.json({ message: "Pokemon modifié (PATCH)", pokemon });
});

/*
* DELETE — Supprimer un Pokémon par ID
*/
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemons.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Pokemon introuvable" });
    }

    // On supprime le Pokémon
    const deletedPokemon = pokemons.splice(index, 1)[0];

    // Sauvegarde dans la base
    const fileContent = `const pokemons = ${JSON.stringify(pokemons, null, 2)};\n\nmodule.exports = pokemons;`;
    fs.writeFileSync('./db-pokemons.js', fileContent);

    res.json({
        message: "Pokemon supprimé",
        pokemon: deletedPokemon
    });
});
/*
* LANCEMENT DU SERVEUR
*/
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});