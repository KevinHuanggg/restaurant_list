const express = require("express");
const app = express();
const port = 3000;

// require express-handlebars here
const exphbs = require("express-handlebars");
const restaurants = require("./restaurant.json");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Handle request and response here
app.get("/", (req, res) => {
  const restaurantList = restaurants.results;
  res.render("index", { restaurantList: restaurantList });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const restaurant = restaurants.results.find(
    (restaurant) => restaurant.id.toString() === restaurant_id
  );
  req.res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase();
  const restaurantList = restaurants.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  );
  res.render("index", { restaurantList: restaurantList });
});

// setting static files
app.use(express.static("public"));

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
