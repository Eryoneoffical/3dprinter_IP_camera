# 3dprinter_IP_camera
3dprinter_IP_camera

Turn数据中转服务器运行turnserver：
在虚拟机安装和运行turnserver
运行命令：turnserver -c /etc/turnserver.conf
Turnserver的IP地址是192.168.2.135
turnserver.conf 文件内容：

web服务器运行：
cd webrtc_p2p_server
node index.js   
这里Web服务器IP地址192.168.2.34


安装老版本chrome浏览器：
最新版本的谷歌浏览器已经不支持H.264，所以这里选择老版本的chrome
F:\luojin\IPC\release\ChromeStandaloneSetup64.exe
运行浏览器页面：http://192.168.2.34:8182/p2p_sendturn.html
输入用户名何密码登录 test_0 密码123


安装数据库mongodb
教程：https://zhuanlan.zhihu.com/p/76349679
数据库的数据结构如图，
用户类别：分别为用户和打印机设备两种类型。
绑定：通过friend来绑定用户和打印机。



