var express = require('express'),
    handlebars = require('express-handlebars').create({
        defaultLayout: 'main',
        helpers: {
            //секции в отличие от макетов используются для внедрение в другие части макета
            // идея почерпнута у Razor
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            }
        }

    }),
    formidable = require('formidable');//use layout '/views/lauots/main.handlebars' as main(or root)

var fortune = require('./lib/fortune'),
    credentials = require('./lib/credentials'), //personal privae data
    weather = require('./lib/weatherData');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');   //used `handlebars` template engine
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
app.use(function (req, res, next) {
    if (!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.weatherContext = weather.getWeatherData();
    next();
});
app.use(require('cookie-parser')(credentials.cookieSecret));
//marshrute
app.get('/', function (req, res) {
    res.render('home');
    res.cookie('monster', 'mom mom');
});
app.get('/about', function (req, res) {
    res.render('about', { fortune: fortune.getFortune, pageTestScript: '/qa/test-global.js' });
});
app.get('/newsletter', function (req, res) {
    res.render('newsletter', { csrf: 'CSRF token goes here' });
});
app.post('/process', function (req, res) {
    if (req.xhr || req.accepts('json.html') === 'json') {
        res.send({ succes: true });
    } else {
        res.redirect(303, '/thank-you');
    }
});
app.get('/thank-you', function (req, res) {
    res.render('thank-you');
});

//tours
app.get("tours/hood-river", function (req, res) {
    res.render('tours/hood-river');
});
app.get("tours/request-group-rate", function (req, res) {
    res.render('tours/request-group-rate');
});

//settings
app.get('/headers', function (req, res) {
    res.set('Content-type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ": " + req.headers[name] + "\n";
    }
    res.send(s);
});

//loaders
app.get('/contest/vacation-photo', function (req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear,
        month: now.getMonth()
    });
});
app.post('/contest/vaction-photo/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(function (err, fields, files) {
        if (err) {
            return res.redirect(303, '/error');
        }
        console.log("recived fields: ");
        console.log(fields);
        console.log("recived-files: ");
        console.log(files);
        res.redirect(303, '/thank-you');
    });
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
});