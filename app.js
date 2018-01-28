var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var customers = require('./routes/customers');
var editCustomer = require('./routes/editCustomer');
var addCustomer = require('./routes/addCustomer');
var addRole = require('./routes/addRole');
var customerInfo = require('./routes/customerInfo');
var findCustomer = require('./routes/findCustomer');
var findRoles = require('./routes/findRoles');
var customerMedia = require('./routes/customerMedia');
var auth = require('./routes/auth');
var logout = require('./routes/logout');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* routes */
app.use('/', index);
app.use('/customers', customers);
app.use('/addCustomer/:name/:division', (req, res, next) => {
	req.name = req.params.name;
	req.division = req.params.division;
	next();
}, addCustomer);

app.use('/editCustomer/:recordId/:name/:division', (req, res, next) => {
	req.recordId = req.params.recordId;
	req.name = req.params.name;
	req.division = req.params.division;
	next();
}, editCustomer);

app.use('/addRole/:customerId/:role', (req, res, next) => {
	req.customerId = req.params.customerId;
	req.role = req.params.role;
	next();
}, addRole);

app.use('/customers/:recordId', (req, res, next) => {
	req.recordId = req.params.recordId;
	next();
}, customerInfo);

app.use('/customers/find/:customerName', (req, res, next) => {
	req.customerName = req.params.customerName;
	next();
}, findCustomer);

app.use('/roles/find/:customerId', (req, res, next) => {
	req.customerId = req.params.customerId;
	next();
}, findRoles);

app.use('/customers/:recordId/media/:customerId', (req, res, next) => {
	req.customerId = req.params.customerId;
	next();
}, customerMedia);

app.use('/auth', auth);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
