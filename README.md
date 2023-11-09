# 3dprinter_IP_camera

<img src="https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/4b6cd71608f7fd8a318b4825841dd4b66ee78b3f/images/109114434.jpg" width="800" /> 

### Turn数据中转服务器运行turnserver：
1）按照网络教程安装turnserver

2）配置文件例如这里测试配置是turnserver.conf 

3）运行服务器：``` turnserver -c /etc/turnserver.conf ```

此处测试Turnserver的IP地址是192.168.2.135
 
### 安装数据库mongodb
安装例子：https://zhuanlan.zhihu.com/p/76349679
数据库的数据结构如图，
<img src="https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/4b6cd71608f7fd8a318b4825841dd4b66ee78b3f/images/db1.png" width="800" /> 

用户类别：分别为用户和打印机设备两种类型。
绑定：通过friend来绑定用户和打印机。

### web页面服务器运行：
```
cd webrtc_p2p_server
node index.js
```
这里Web服务器IP地址192.168.2.34


### 安装老版本chrome浏览器：
1)最新版本的谷歌浏览器已经不支持H.264，所以这里选择老版本的chrome May 2022  Version 102.0.5005.63

2)运行浏览器页面：http://192.168.2.34:8182/p2p_sendturn.html

3)输入用户名何密码登录 test_0 密码123






