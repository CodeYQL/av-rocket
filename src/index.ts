import { ITarget, ITargetCommand } from 'interfaces';
import { Response, Request, NextFunction } from 'express';

const express = require("express");
const app = express();

const targets: ITarget[] = [
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

function getTargetById(targets: ITarget[], id: string): ITarget {
  return targets.find((target: ITarget) => target.id === id);
}

function returnTargetById(req: Request, res: Response, next: NextFunction) {
  const target: ITarget = getTargetById(targets, req.params.id);

  if (!target) {
    res.status(404).send("Not Found");
  } else {
    res.send(target);
  }

  return next();
}

function fireAtTargetById(targets: ITarget[], id: string) {
  const target = targets.find((target: ITarget) => target.id === id);
}

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.get("/targets", (req: Request, res: Response) => res.send(targets));
app.get("/targets/:id", returnTargetById);
app.get("/targets/:id/fire", (req: Request, res: Response) => res.send(req.params));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
