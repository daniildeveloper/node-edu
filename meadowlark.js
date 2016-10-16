var express = require('express'),
    handlebars = require('express-handlebars').create({ defaultLayout: 'main' });//use layout '/views/lauots/main.handlebars' as main(or root)

var fortune = require('./lib/fortune');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

//marshrute
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) { 
    res.render('about', { fortune: fortune.getFortune, pageTestScript: '/qa/test-global.js' });
});

//tours
app.get("tours/hood-river", function (req, res) {
   res.render('tours/hood-river');
});
app.get("tours/request-group-rate", function (req, res) {
   res.render('tours/request-group-rate');
});
//404
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express launched on http://localhost:' + app.get('port'));
})
