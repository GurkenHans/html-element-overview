const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    { corsOptions } = require('./config'),
    CompatData = require('./CompatData'),
    app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.listen();

app.get('/categories', async (req, res) => {
    const compatData = new CompatData();
    
    res.status(200).json(await compatData.getCategories());
});

app.get('/elements', async (req, res) => {
    const compatData = new CompatData();
    
    res.status(200).json(await compatData.getElements());
});

app.get('/elements/:tag', async (req, res) => {
    const compatData = new CompatData(),
        element = await compatData.getElement(req.params.tag);
    
    if(typeof element === 'undefined') {
        res.status(404);
    } else {
        res.status(200).json(element);
    }
});