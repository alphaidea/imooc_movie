# 项目简介
此项目基于慕课网 - [Node.js+MongoDB建站攻略（一期）](https://www.imooc.com/learn/75)视频教程编写。所有项目均使用目前(2017/11/28)最新版本，其中jade换成了pug，使用了一些ES6语法
# 项目环境
- CentOS 7
- Node v8.9.1
# 项目目录
- `models/`: Mongoose模型
- `public/`: 项目静态资源
- `schemas/`: Mongoose模式
- `views/`: 项目视图文件
- `bowerrc`: bower配置文件
- `app.js`: 项目入口文件
# 项目部署
1. 安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)并启动
2. 安装[NodeJS](https://nodejs.org/en/)
3. 进入项目根目录，安装npm依赖，然后执行`npm install`
4. 安装bower依赖，`npm install bower -g`，然后执行`bower install`
# 项目启动
1. 进入项目根目录，然后执行`node app.js`
# 效果查看
- 首页`http://[ip]:3000`
- 电影列表页`http://[ip]:3000/admin/list`
- 电影录入页`http://[ip]:3000/admin/movie`