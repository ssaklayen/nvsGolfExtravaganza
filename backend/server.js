const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const _ = require("lodash");

const app = express();
const golferRoutes = express.Router();

let Golfer = require("./golfer.model");
Golfer.createIndexes();

async function dbConnect() {
  const dbName = "nvsgolfDB";
  // const adminName = 'smokesaksllc';
  // const adminPassword = 'PuffTuff$420';
  // const dbURI = `mongodb+srv://${adminName}:${adminPassword}@cluster0.cq4yw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const dbURI = `mongodb://localhost:27017/${dbName}`;
  await mongoose.connect(dbURI, (err) =>
    err
      ? console.log(`Error! Code (${err})`)
      : console.log(`Connected to ${dbName}`)
  );
}

function main() {
  app.use(express.json());
  app.use(express.urlencoded( {extended: false}));
  app.use(cors());

  // ******* GET methods *******

  golferRoutes.route("/").get((req, res) => {
    Golfer.find({}, (err, golferList) => {
      if (err) {
        console.log(err);
      } else {
        res.json(golferList);
      }
    });
  });

  golferRoutes.route("/:id").get((req, res) => {
    let id = req.params.id;
    Golfer.findById(id, (err, golfer) => {
      res.json(golfer);
    });
  });

  // ******* POST methods *******

  golferRoutes.route("/add").post((req, res) => {
    let newGolfer = new Golfer(req.body);
    console.log(req.body);
    newGolfer.save()
    .then(golfer => {
      res.status(200).json({"golfer": "Golfer added successfully"});
    })
    .catch(err => {
      res.status(400).send('Adding new golfer failed');
    })
  });

  golferRoutes.route("/update/:id").post((req, res) => {
    Golfer.findById(req.params.id, (err, golfer) => {
      if (!golfer)
        res.status(404).send("Golfer not found");
      else
        golfer.golfer_name = req.body.golfer_name;
        golfer.golfer_handicap = req.body.golfer_handicap;
        golfer.golfer_team = req.body.golfer_team;

        golfer.save()
        .then(golfer => {
          res.json('Golfer updated!');
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    });
  });

  app.use("/golfers", golferRoutes);

  let port = process.env.PORT;
  if (port == null || port === "") {
    port = 5000;
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

dbConnect().then(main());
