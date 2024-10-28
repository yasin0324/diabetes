# 控糖宝

## 代码仓库

-   GitHub:<https://github.com/yasin0324/diabetes>

## 项目功能

-   使用 Vue3 开发
-   采用 Vite 作为项目开发、打包工具

## 安装使用

```
#GitHub
git clone https://github.com/yasin0324/smart-fram-manageSystem.git

#安装依赖
npm/yarn install
#启动项目
npm run dev
yarn dev
#项目打包
npm run build
yarn build
```

## 项目目录结构

```
|- public                # 静态资源文件（该文件夹不会被打包）
|- src
| |- api                 # API接口管理
| |- assets              # 静态资源文件
| |- common              # 静态资源文件
| |- components          # 全局组件
| |- router              # 路由管理
| |- util                # axios二次封装
| |- views               # 项目所有页面
| |- App.vue             # 项目主组件
| └─ main.js             # 项目入口文件
|- .gitignore            # 忽略git提交
|- index.html            # 入口html
|- package-lock.json     # 依赖包包版本锁
|- package.json          # 依赖包管理
|- README.md             # README介绍
└─ vite.config.js        # vite全局配置文件
```
