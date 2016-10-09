var express = require('express'),
    handlebars = require('express-handlebars').create({ defaultLayout: 'main' });//use layout '/views/lauots/main.handlebars' as main(or root)

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    res.render('about');
});
//404
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

//user 50x page
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express launched on http://localhost:' + app.get('port'));
})
