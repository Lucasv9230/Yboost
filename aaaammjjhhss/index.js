const express = require('express');
let pokemons = require('./db-pokemons');
let helper = require('./helper');


// Les variables utilisees dans le programme
const app = express();
const PORT = process.env.PORT || 3003;
/*
*---------------
* R O U T I N G
*---------------
*/
// GET
app.get('/', (req, res) => {
    res.send(`<h3>Hello, YBoosST TEAM !</h3>`);
});
/*
app.get('/api/pokemons/1', (req, res) => {
    res.send(`<h3>Bulbizarre !</h3>`);
});
*/
// parameter
/*
app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    res.send(`<h3>About Pokemon ${id} !</h3>`);
});
// parameters
app.get('/api/pokemons/:id/:name', (req, res) => {
    //
    const id = req.params.id;
    const name = req.params.name;
    //
    res.send(`<h3>About Pokemon ${id} : ${name} !</h3>`);
});
*/
app.get('/api/pokemons', (req, res) => {
    //const id = parseInt(req.params.id);
    // 
    //res.send(`Pokemons (${pokemons.length})`);
    //res.json(pokemons);
    const message = `List of ${pokemons.length} * pokemons`;
    res.json( helper.success(message, pokemons) );    
});
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // search for the id & give the name if exist...
    const pokemon = pokemons.find( pokemon=> pokemon.id === id );
    //res.send(`Pokemon {<br>id: ${id},<br>name: '${pokemon.name}'<br>}`);
    //res.json(pokemon);
    const message = "One pokemon is founded !";
    res.json( helper.success(message, pokemon) );
});


/*
*-----------------------------------------------
* L O G  O N  A D M I N  S C R E E N
*-----------------------------------------------
*/
app.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});
