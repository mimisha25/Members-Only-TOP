const { Router } = require('express');
const newsRouter = Router();


newsRouter.get('/news', (req, res) => {
    res.render('news')
});

module.exports = newsRouter;