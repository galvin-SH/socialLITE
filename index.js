const express = require("express");
const db = require("./utils/connection");
const routes = require("./routes");

const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
    app.listen(port, () =>
        console.log(`🌍 Now listening on localhost:${port}`)
    );
});
