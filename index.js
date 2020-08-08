require("dotenv").config();
const express = require("express");
const axios = require("axios");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");

app.use(require("morgan")("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));

// GET - main index of site
app.get("/", (req, res) => {
  const pokemonUrl = "http://pokeapi.co/api/v2/pokemon?limit=151>";
  // Use request to call the API
  axios.get(pokemonUrl).then((response) => {
    console.log(response.data);
    let pokemon = response.data.results;
    console.log(pokemon[0]);
    res.render("index", { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use("/pokemon", require("./routes/pokemon"));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
