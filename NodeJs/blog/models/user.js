var mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

module.exports = User;

//�洢�û���Ϣ
User.prototype.save = function (callback) {
  //Ҫ�������ݿ���û��ĵ�
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  //�����ݿ�
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//���󣬷��� err ��Ϣ
    }
    //��ȡ users ����
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//���󣬷��� err ��Ϣ
      }
      //���û����ݲ��� users ����
      collection.insert(user, { safe: true }, function (err, user) {
        mongodb.close();//�ر����ݿ�
        callback(null, user[0]);//�ɹ���err Ϊ null�������ش洢����ĵ�
      });
    });
  });
};

//��ȡ�û���Ϣ
User.get = function (name, callback) {
  //�����ݿ�
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//���󣬷��� err ��Ϣ
    }
    //��ȡ users ����
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();//�ر����ݿ�
        return callback(err);//���󣬷��� err ��Ϣ
      }
      //�����û�����name����ֵΪ name һ���ĵ�
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();//�ر����ݿ�
        if (user) {
          return callback(null, user);//�ɹ������ز�ѯ���û���Ϣ
        }
        callback(err);//ʧ�ܣ����� err ��Ϣ
      });
    });
  });
};