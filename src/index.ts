import { Response, Request, NextFunction } from 'express';
import * as _ from 'lodash';
import { assert } from 'chai';
import * as bodyParser from 'body-parser';
import * as uuidv4 from 'uuid/v4'
import * as cors from 'cors';

import { ITarget, ITargetCommand } from './interfaces';
import * as Commands from "./commands";
import { targets, userInterface, commandInterface } from './state';

const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors())

let state: string = 'ready';

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

function addTarget(req: Request, res: Response, next: NextFunction) {
  const user: ITarget = _.cloneDeep(req.body);
  _.set(user, 'id', uuidv4());

  targets.push(user);

  res.send(user);
  res.end();
  return next();
}

function removeTarget(req: Request, res: Response, next: NextFunction) {
  const targetIndex = targets.findIndex((target: ITarget) => target.id === req.params.id);

  if (targetIndex === -1) {
    res.status(404);
    res.send("Trying to delete non-existent target!");
    res.end();
    return next();
  }

  targets.splice(targetIndex, 1);
  res.send(targets);
  res.end();
  return next();
}

function updateTarget(req: Request, res: Response, next: NextFunction) {
  const user: ITarget = _.cloneDeep(req.body);

  const targetIndex = targets.findIndex((target: ITarget) => target.id === req.params.id);
  delete user.id

  const editedUser: ITarget = {
    ...user,
    id: req.params.id,
  };

  targets[targetIndex] = editedUser;
  res.send(targets[targetIndex]);
  res.end();
  return next();
}

function fireAtTarget(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  const target = targets.find((target : ITarget) => target.id === id);
  state = "firing";
  Commands.chainCommands(target.commands).then(() => {
    res.send('success');
    state = "ready";
    res.end();
    return next();
  })
}

function getState(req: Request, res: Response, next: NextFunction) {
  res.send({state});
  res.end();
  return next();
}

function resetPosition(req: Request, res: Response, next: NextFunction) {
  Commands.resetPosition();

  res.send('Resetting Position');
  res.end();
  return next();
}

app.get("/reset", resetPosition);
app.get("/targets", (req: Request, res: Response) => res.send(targets));
app.post("/targets", addTarget);

app.get("/targets/:id", returnTargetById);
app.put("/targets/:id", updateTarget);
app.delete("/targets/:id", removeTarget);

app.get("/targets/:id/fire", fireAtTarget);

app.get("/state", getState);

app.get("/", (req: Request, res: Response) => {
  res.send([
    {"/targets": [{method: 'GET', description: 'Get list of targets'}, {method: 'POST', description: 'Post a new target'}]},
    {"/targets/:id": [{method: 'GET'}, {method: 'PUT'}, {method: 'DELETE'}]},
    {"/targets/:id/fire": {method: 'GET'}},
    {"/state": {method: 'GET'}}
  ]);

  res.end();
});

app.listen(3000, () => console.log("CTBR listening on port 3000!"));
