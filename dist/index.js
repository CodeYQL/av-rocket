"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var bodyParser = require("body-parser");
var uuidv4 = require('uuid/v4');
var cors = require('cors');
var Commands = require("./commands");
var state_1 = require("./state");
var express = require("express");
var app = express();
app.use(bodyParser.json());
app.use(cors());
var state = 'ready';
function getTargetById(targets, id) {
    return targets.find(function (target) { return target.id === id; });
}
function returnTargetById(req, res, next) {
    var target = getTargetById(state_1.targets, req.params.id);
    if (!target) {
        res.status(404).send("Not Found");
    }
    else {
        res.send(target);
    }
    return next();
}
function fireAtTargetById(targets, id) {
    var target = targets.find(function (target) { return target.id === id; });
}
function addTarget(req, res, next) {
    var user = _.cloneDeep(req.body);
    _.set(user, 'id', uuidv4());
    // try {
    //   assert.hasAllDeepKeys(user, userInterface);
    //   assert.hasAllDeepKeys(user, commandInterface);
    // } catch (err) {
    //   res.send(err);
    //   res.end();
    //   return next();
    // }
    state_1.targets.push(user);
    res.send(user);
    res.end();
    return next();
}
function removeTarget(req, res, next) {
    var targetIndex = state_1.targets.findIndex(function (target) { return target.id === req.params.id; });
    if (targetIndex === -1) {
        res.status(404);
        res.send("Trying to delete non-existent target!");
        res.end();
        return next();
    }
    state_1.targets.splice(targetIndex, 1);
    res.send(state_1.targets);
    res.end();
    return next();
}
function updateTarget(req, res, next) {
    var user = _.cloneDeep(req.body);
    var targetIndex = state_1.targets.findIndex(function (target) { return target.id === req.params.id; });
    delete user.id;
    var editedUser = __assign({}, user, { id: req.params.id });
    state_1.targets[targetIndex] = editedUser;
    res.send(state_1.targets[targetIndex]);
    res.end();
    return next();
}
function fireAtTarget(req, res, next) {
    var id = req.params.id;
    var target = state_1.targets.find(function (target) { return target.id === id; });
    state = "firing";
    Commands.chainCommands(target.commands).then(function () {
        res.send('success');
        state = "ready";
        res.end();
        return next();
    });
}
function getState(req, res, next) {
    res.send({ state: state });
    res.end();
    return next();
}
function resetPosition(req, res, next) {
    Commands.resetPosition();
    res.send('Resetting Position');
    res.end();
    return next();
}
app.get("/reset", resetPosition);
app.get("/targets", function (req, res) { return res.send(state_1.targets); });
app.post("/targets", addTarget);
app.get("/targets/:id", returnTargetById);
app.put("/targets/:id", updateTarget);
app.delete("/targets/:id", removeTarget);
app.get("/targets/:id/fire", fireAtTarget);
app.get("/state", getState);
app.get("/", function (req, res) {
    res.send([
        { "/targets": [{ method: 'GET', description: 'Get list of targets' }, { method: 'POST', description: 'Post a new target' }] },
        { "/targets/:id": [{ method: 'GET' }, { method: 'PUT' }, { method: 'DELETE' }] },
        { "/targets/:id/fire": { method: 'GET' } },
        { "/state": { method: 'GET' } }
    ]);
    res.end();
});
app.listen(3000, function () { return console.log("CTBR listening on port 3000!"); });
//# sourceMappingURL=index.js.map