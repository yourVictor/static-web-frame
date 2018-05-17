# static-web-frame

> web前端(静态页项目)构建框架【构建完交给后台同学去发挥，你就可以下班了】


> 本项目基于sass & ejs & gulp 相关技术

> 本项目包含三个终端用户：即：admin后台管理系统端、pc端、m移动端，可根据需要只用其中的某个端
## Build Setup

``` bash

# Clone project || 克隆项目
git clone https://github.com/yourVictor/static-web-frame.git

# Install dependencies || 安装依赖
npm install or cnpm install

# start project at localhost || 启动项目，本地开发代码，自动构建，随时查看效果
npm start

# build for production with minification || 编译项目，将编译后的代码交给后端开发人员，自己就可以下班了
npm run build

```

## project directory || 项目目录结构

```
static-web-frame
 ├─dist [编译后的项目代码，可以直接交给后端童鞋的代码]
 |   ├─curriculum-pc-view [pc端可以直接打开预览效果的代码]
 |   |         ├─index.html
 |   |         ├─js
 |   |         | ├─common-722ec8659e.js
 |   |         | └main-cb36d0e84e.js
 |   |         ├─css
 |   |         |  ├─index-d41d8cd98f.css
 |   |         |  └main-6c763fd116.css
 |   ├─curriculum-pc  [pc端交给后端童鞋对接的代码]
 |   |       ├─index.html
 |   |       ├─js
 |   |       | ├─common-722ec8659e.js
 |   |       | └main-cb36d0e84e.js
 |   |       ├─css
 |   |       |  ├─index-d41d8cd98f.css
 |   |       |  └main-6c763fd116.css
 |   ├─curriculum-m-view  [m端可以直接打开预览效果的代码]
 |   |         ├─index.html
 |   |         ├─js
 |   |         | ├─common-722ec8659e.js
 |   |         | └main-a15a733f9f.js
 |   |         ├─css
 |   |         |  ├─index-d41d8cd98f.css
 |   |         |  └main-6c763fd116.css
 |   ├─curriculum-m  [m端交给后端童鞋对接的代码]
 |   |      ├─index.html
 |   |      ├─js
 |   |      | ├─common-722ec8659e.js
 |   |      | └main-a15a733f9f.js
 |   |      ├─css
 |   |      |  ├─index-d41d8cd98f.css
 |   |      |  └main-6c763fd116.css
 |   ├─curriculum-admin-view  [admin端可以直接打开预览效果的代码]
 |   |           ├─index.html
 |   |           ├─js
 |   |           | ├─common-722ec8659e.js
 |   |           | └main-cb36d0e84e.js
 |   |           ├─css
 |   |           |  ├─index-d41d8cd98f.css
 |   |           |  └main-6c763fd116.css
 |   ├─curriculum-admin  [admin端交给后端童鞋对接的代码]
 |   |        ├─index.html
 |   |        ├─js
 |   |        | ├─common-722ec8659e.js
 |   |        | └main-cb36d0e84e.js
 |   |        ├─css
 |   |        |  ├─index-d41d8cd98f.css
 |   |        |  └main-6c763fd116.css
 |
 ├─src [项目源码]
 |  ├─project-admin [admin端源码]
 |  |     ├─js [项目admin端js]
 |  |     | ├─common.js
 |  |     | └main.js
 |  |     ├─css [项目admin端css,自动构建生成的，不用手动编写修改]
 |  |     |  ├─index.css
 |  |     |  └main.css
 |  |     ├─_temporary [admin端_temporary,放置ejs和scss文件]
 |  |     |     ├─scss
 |  |     |     |  ├─main.scss [所有页面共用的一个scss文件]
 |  |     |     |  ├─theme  [放置主题scss文件:default,...]
 |  |     |     |  |   └_default.scss
 |  |     |     |  ├─page [放置页面scss文件:pop,...]
 |  |     |     |  |  └index.scss
 |  |     |     |  ├─layout  [放置页面布局scss文件]
 |  |     |     |  |   ├─___index.scss
 |  |     |     |  |   ├─__header.scss
 |  |     |     |  |   └_content.scss
 |  |     |     |  ├─component [放置组件scss文件:pop,...]
 |  |     |     |  |     ├─_flexLayout.scss
 |  |     |     |  |     ├─_float.scss
 |  |     |     |  |     └_pop.scss
 |  |     |     |  ├─base  [放置基本scss文件:css reset]
 |  |     |     |  |  └_reset.scss
 |  |     |     |  ├─abstract [放置抽象scss文件:scss参数和mixins]
 |  |     |     |  |    ├─__variables.scss
 |  |     |     |  |    └_mixins.scss
 |  |     |     ├─ejs
 |  |     |     |  ├─templates  [放置模板ejs文件]
 |  |     |     |  |     └head_src.ejs
 |  |     |     |  ├─pages  [放置页面ejs文件]
 |  |     |     |  |   └index.ejs   
 |  ├─project-pc [pc端源码] 
 |  |     ├─ ...
 |  ├─project-m [m端源码]
 |  |     ├─ ...
 ├─gulpfile.js [gulp配置文件]
 ├─package.json [项目依赖]
 ├─projectConfig.js [项目构建配置文件]
 ...
 
```

## project config || 项目构建配置
##### edit projectConfig.js to config project

<table>
  <tr>
     <th width=15%, bgcolor=yellow >参数名</th>
     <th width="25%", bgcolor=yellow>参数类型</th>
     <th width=25%, bgcolor=yellow>详细解释</th>
     <th width="25%", bgcolor=yellow>备注</th>
  </tr>
  <tr>
    <td bgcolor=#eeeeee> projectName </td>
    <td> string  </td>
    <td> 项目名称  </td>
    <td> 整个项目名称，构建时会用到这个参数 </td>
  </tr>
  <tr>
    <td bgcolor=#00FF00>admin </td>
    <td> object </td>
    <td> 项目的admin端(即后台)构建配置 </td>
    <td> 默认值: 见底下admin参数</td>
  <tr>
    <td bgcolor=rgb(0,10,0)>pc </td>
    <td> object </td>
    <td> 项目的pc端 </td>
    <td> 同上 </td>
  </tr>
  <tr>
    <td bgcolor=rgb(0,10,0)>m </td>
    <td> object </td>
    <td> 项目的m端(即移动端) </td>
    <td> 同上 </td>
  </tr>
</table>


##### admin 参数详情
<table>
  <tr>
     <th width=15%, bgcolor=yellow >参数名</th>
     <th width="25%", bgcolor=yellow>参数类型</th>
     <th width=25%, bgcolor=yellow>详细解释</th>
     <th width="25%", bgcolor=yellow>备注</th>
  </tr>
  <tr>
    <td bgcolor=#eeeeee> css </td>
    <td> object  </td>
    <td> css构建配置  </td>
    <td> 默认值：{compress: true, version: true} </td>
  </tr>
  <tr>
    <td bgcolor=#00FF00>js </td>
    <td> object </td>
    <td> js构建配置  </td>
    <td> 默认值：{compress: true, version: true} </td>
  <tr>
    <td bgcolor=rgb(0,10,0)>img </td>
    <td> object </td>
    <td> img构建配置  </td>
    <td> 默认值：{compress: true, version: true} </td>
  </tr>
  <tr>
    <td bgcolor=rgb(0,10,0)>html </td>
    <td> object </td>
    <td> html构建配置  </td>
    <td> 默认值：{compress: false, compressCss: true, compressJs: true} </td>
  </tr>
  <tr>
    <td bgcolor=rgb(0,10,0)>pluginsPath </td>
    <td> object </td>
    <td> 项目用到的插件路径，*这个参数一般由后台开发人员提供*  </td>
    <td> 默认值：'plugins' </td>
  </tr>
</table>

欢迎大家疯狂star，疯狂提issue。

Copyright (c) 2018-present Mole