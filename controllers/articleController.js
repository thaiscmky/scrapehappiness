const express = require('express');
const router = express.Router();
const request = require('request-promise');
const path = require('path');
const burger = require(__basedir + '/app/models/burger');
let obj = {};
router.get("/", function(req, res) {

    let response = burger.getList();
    if(response instanceof Error){
        res.render('index', {error_msg: response.message});
        return;
    }

    response.then(response => {
        obj.burgers = response;
        res.render('index', obj);
    });
});

router.post("/addburger", function(req, res) {
    resetErrors();
    let request = req.body;
    let item = {};
    for (let prop in request) {
        if (request.hasOwnProperty(prop)) {
            item.label = prop;
            item.value = request[prop];
        }
    }
    let response = burger.addNew(item);
    if(response instanceof Error){
        res.render('index', {error_msg: response.message});
        return;
    }
    response.then(response => {
        obj.success_msg = `Item ${response.insertId} successfully added`;
        res.redirect('/');
    });
});

router.put("/updateburger", function(req, res) {
    resetErrors();
    let item = req.body;
    let response = burger.updateById(item.id, item.devoured);
    if(response instanceof Error){
        obj.error_msg = response.message;
        res.status(400).json(response.message);
        return;
    }
    response.then(response => {
        if(response.affectedRows){
            obj.success_msg = `Item ${item.id} successfully devoured`;
            res.json(obj);
        }
        else {
            obj.error_msg = `Item ${item.id} not devoured...for some reason.`;
            res.status(400).json(obj.error_msg);
        }
    });

});

router.get('*', function(req, res){
    res.render('index', {error_msg: `"${req.path}" is not a valid route`});
});

function resetErrors() {
    obj.error_msg = null;
    obj.success_msg = null;
}

module.exports = router;