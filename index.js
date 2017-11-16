const express = require("express");
const app = express();

const targets = [
  {
    name: "Chris",
    id: "1",
    commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
  },
  {
    name: "Matt",
    id: "2",
    commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
  },
  {
    name: "Juan",
    id: "3",
    commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
  },
  {
    name: "Tyler",
    id: "4",
    commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
  },
  {
    name: "Kevin",
    id: "5",
    commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
  }
];

function getTargetById(targets, id) {
  return targets.find(target => target.id === id);
}

function returnTargetById(req, res, next) {
  const target = getTargetById(targets, req.params.id);

  if (!target) {
    res.status(404).send("Not Found");
  } else {
    res.send(target);
  }

  return next();
}

function fireAtTargetById(targets, id) {
  const target = targets.find(target => target.id === id);
}

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/targets", (req, res) => res.send(targets));
app.get("/targets/:id", returnTargetById);
app.get("/targets/:id/fire", (req, res) => res.send(req.params));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
