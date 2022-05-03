const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const _ = require("lodash");

const app = express();

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Player = mongoose.model("players", PlayerSchema);
Player.createIndexes();

async function dbConnect() {
    const dbName = 'nvsgolfDB';
    const adminName = 'smokesaksllc';
    const adminPassword = 'PuffTuff$420';
    const dbURI = `mongodb+srv://${adminName}:${adminPassword}@cluster0.cq4yw.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    // const dbURI = `mongodb://localhost:27017/${dbName}`;
    await mongoose.connect(dbURI, err => err ? console.log(`Error! Code (${err})`) : console.log(`Connected to ${dbName}`));
  };



function main() {
    app.use(express.json());
    app.use(cors());


    // ******* GET methods *******
    app.get("/", (req, res) => {
        res.send("Backend is working!")
    });



    // ******* POST methods *******
    app.post("/register", async (req, res) => {
        try {
            const player = new Player(req.body);
            let result = await player.save();
            result = result.toObject();
            console.log(result);
        } catch (e) {
            res.send("Something fokt opp");
        }
    });

    let port = process.env.PORT;
    if (port == null || port == "") { port = 5000; };
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

dbConnect()
    .then(main());