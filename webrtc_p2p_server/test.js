
// ���� mongodb
const {MongoClient} = require('mongodb');

// �������ݿ����ӵĵ�ַ
const url = 'mongodb://localhost:27017'; 
// const url = 'mongodb://admin:123456@localhost:27017/'; ���������ӷ�ʽ admin ��ʾ�û�����123456 ��ʾ����

// ����Ҫ���������ݿ�
const dbName = 'itying';

MongoClient.connect(url, { useUnifiedTopology: true },(err,client)=>{
  if(err){
    console.log(err); 
    return; 
  }
  console.log("���ӳɹ�"); 
  // ��ȡ db ���� 
  const db = client.db(dbName); 

  // ���������ݿ��һ��Ҫ�ǵùر�
  client.close();
})
