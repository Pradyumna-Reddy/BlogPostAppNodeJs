const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { json: bodyparserJson, urlencoded: bodyparserUrlencoded } = require('body-parser');

const nav = [{ link: '/posts', title: 'Posts' }];

const postRouter = require('./src/routes/postRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')(nav);

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyparserJson());
app.use(bodyparserUrlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'blogpost' }));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));
// app.use('/css', express.static(path.join(__dirname, '/nodemodules/bootstrap/dist/css')));
// for links starting with ? /css/**/*.css the above format searches the given dir
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/posts', postRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.redirect('/posts/');
});

app.listen(port, () => {
  debug(`listening in port ${chalk.green(port)}`);
});
