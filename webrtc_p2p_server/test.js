
// 引入 mongodb
const {MongoClient} = require('mongodb');

// 定义数据库连接的地址
const url = 'mongodb://localhost:27017'; 
// const url = 'mongodb://admin:123456@localhost:27017/'; 有密码连接方式 admin 表示用户名，123456 表示密码

// 定义要操作的数据库
const dbName = 'itying';

MongoClient.connect(url, { useUnifiedTopology: true },(err,client)=>{
  if(err){
    console.log(err); 
    return; 
  }
  console.log("连接成功"); 
  // 获取 db 对象 
  const db = client.db(dbName); 

  // 操作完数据库后，一定要记得关闭
  client.close();
})
