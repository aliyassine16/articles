function listArticles(res) {

    var filePath = __dirname + '/../public/data/data.json';

    //console.log(filePath);

    require('fs').readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            res.send({success: false, err: err});
        }

        var articles = JSON.parse(data);
        res.send({success: true, data: articles});
    });
}


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.get('/api/listArticles', function (req, res) {

        listArticles(res);
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
