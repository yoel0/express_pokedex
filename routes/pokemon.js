const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const findPokemons = await db.pokemon.findAll();
    res.render("favorites", { pokemon: findPokemons });
  } catch (error) {
    res.render("error");
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      },
    });
    res.redirect("/pokemon");
  } catch (error) {
    res.render("error");
  }
});

// GET /pokemon - data
router.get("/:name", async (req, res) => {
  try {
    if (req.params && req.params.name) {
      const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(pokemonURL);
      let pokemondata = result.data;
      res.render("show", { pokedata: pokemondata });
    }
  } catch (error) {
    res.render("error");
  }
});

// DELETE route
router.delete("/", async (req, res) => {
  try {
    await db.pokemon.destroy({
      where: {
        name: req.body.name,
      },
    });
    res.redirect("/pokemon");
  } catch (error) {
    res.render("error");
  }
});

module.exports = router;
