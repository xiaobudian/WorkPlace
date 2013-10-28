var crypto = require('crypto'),
    User = require('../models/user.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'home page'
      , user: req.session.user
      , success: req.flash('success').toString()
      , error: req.flash('error').toString()
    });
  });
  app.get('/reg', function (req, res) {
    res.render('reg', {
    title: 'register'
    , user: req.session.user
    , success: req.flash('success').toString()
    , error: req.flash('error').toString()
    });
  });
  app.post('/reg', function (req, res) {
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //�����û���������������Ƿ�һ��
    if (password_re != password) {
      req.flash('error', 'Entered passwords differ!');
      return res.redirect('/reg');
    }
    //��������� md5 ֵ
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: req.body.name,
      password: password,
      email: req.body.email
    });
    //����û����Ƿ��Ѿ����� 
    User.get(newUser.name, function (err, user) {
      if (user) {
        req.flash('error', 'this user already exists!');
        return res.redirect('/reg');//�û��������򷵻�ע��ҳ
      }
      //����������������û�
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = user;//�û���Ϣ���� session
        req.flash('success', 'register success!');
        res.redirect('/');//ע��ɹ��󷵻���ҳ
      });
    });
  });
  app.get('/login', function (req, res) {
    res.render('login', { title: 'login' });
  });
  app.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');

    User.get(req.body.name, function (err, user) {
      if (!user) {
        req.flash('error', 'user not exist!');
        return res.redirect('/login');
      }
      if (user.password!=password) {
        req.flash('error', 'password error!');
        return res.redirect('/login');
      }

      req.session.user = user;
      req.flash('success', 'login success!');
      res.redirect('/');
    });
  });
  app.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', 'logout success!');
    res.redirect('/');
  });
  app.get('/post', function (req, res) {
    res.render('post', { title: 'post' });
  });
  app.post('/post', function (req, res) {
  });
};