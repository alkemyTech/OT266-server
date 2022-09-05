const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testimonyRouter = require('./routes/testimony');
const categoriesRouter = require('./routes/categories')
const organizationRouter = require('./routes/organization')
const rolesRouter = require('./routes/roles');
const newsRouter = require('./routes/news');
const membersRouter = require('./routes/member.routes');
const activityRouter = require('./routes/activity');
const authRouter = require('./routes/auth');
const imagesRouter = require('./routes/images');
const contactRouter = require('./routes/contact');
const slidesRouter = require('./routes/slides')
const backOfficeRouter = require('./routes/backoffice');

const app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//original
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoriesRouter);
app.use('/members', membersRouter);
app.use('/activities', activityRouter);
app.use('/news', newsRouter);
app.use('/auth', authRouter);
app.use('/testimony', testimonyRouter);
app.use('/organization', organizationRouter);
app.use('/roles', rolesRouter);
app.use('/images', imagesRouter);
app.use('/contacts', contactRouter);
app.use('/slides', slidesRouter);
app.use('/backoffice', backOfficeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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