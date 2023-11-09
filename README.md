# A 3dprinter IP camera with WebRTC

### Hardware:
1. MCU: GK7202V300 ARM
2. Camera：1080P
3. Encoder: H.264
4. wifi：2.4G 
5. USB host: connect to 3d printer
6. Linux version: 4.9.37

<img src="https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/main/images/144619.jpg" width="600" /> 



### WebRTC html 测试页面:
<img src="https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/main/images/109114434.jpg" width="600" /> 

### Turn数据中转测试服务器turnserver：
1）按照网络教程安装turnserver

2）配置文件例如这里测试配置是turnserver.conf 

3）运行服务器：``` turnserver -c /etc/turnserver.conf ```

此处测试Turnserver的IP地址是192.168.2.135
 
### 数据库mongodb测试例子
安装例子：https://zhuanlan.zhihu.com/p/76349679
数据库的数据结构如图，
<img src="https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/main/images/db1.png" width="600" /> 

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


### Time lapse at every layers
https://github.com/Eryoneoffical/3dprinter_IP_camera/blob/main/images/timelapse_layers.mp4





