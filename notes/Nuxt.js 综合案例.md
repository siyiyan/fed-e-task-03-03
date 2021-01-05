<!-- 两种方法可以让图片居中 -->
<!-- <div align="center"> 
  <img src="images/38.png">
</div> -->
<!-- <center>
  <img src="images/38.png">
</center> -->

<!-- TOC -->

- [Nuxt.js 综合案例](#nuxtjs-综合案例)
    - [介绍](#介绍)
    - [创建项目](#创建项目)
    - [导入样式资源](#导入样式资源)
            - [步骤](#步骤)
    - [布局组件](#布局组件)
        - [创建nuxt.config.js 配置](#创建nuxtconfigjs-配置)
        - [首页](#首页)
        - [登录注册页面](#登录注册页面)
        - [区分登录和注册](#区分登录和注册)
        - [用户页面](#用户页面)
        - [用户设置](#用户设置)
        - [创建和编辑文章](#创建和编辑文章)
        - [文章的详情页](#文章的详情页)
    - [处理顶部导航链接](#处理顶部导航链接)
    - [处理导航链接高亮](#处理导航链接高亮)
    - [封装请求模块](#封装请求模块)
    - [登录注册](#登录注册)
        - [实现基本登录功能](#实现基本登录功能)
        - [封装请求方法](#封装请求方法)
        - [表单验证](#表单验证)
        - [错误处理](#错误处理)
        - [用户注册](#用户注册)
        - [解析储存登录状态实现流程](#解析储存登录状态实现流程)
        - [将登录状态存储到容器中](#将登录状态存储到容器中)
        - [登录状态持久化](#登录状态持久化)
        - [处理导航栏链接展示状态](#处理导航栏链接展示状态)
        - [处理页面访问权限](#处理页面访问权限)
    - [首页](#首页-1)
        - [业务介绍](#业务介绍)
        - [展示公共文章列表](#展示公共文章列表)
        - [列表分页-分页参数的使用](#列表分页-分页参数的使用)
        - [列表分页-页码处理](#列表分页-页码处理)
        - [展示文章标签列表](#展示文章标签列表)
        - [优化并行异步任务](#优化并行异步任务)
        - [处理标签列表链接和数据](#处理标签列表链接和数据)
        - [处理导航栏](#处理导航栏)
            - [业务介绍](#业务介绍-1)
            - [展示状态处理](#展示状态处理)
            - [标签高亮及链接](#标签高亮及链接)
            - [展示用户关注的文章列表](#展示用户关注的文章列表)
        - [统一设置用户Token](#统一设置用户token)
        - [文章发布时间格式化处理](#文章发布时间格式化处理)
        - [文章点赞](#文章点赞)
        - [文章详情](#文章详情)
            - [业务介绍](#业务介绍-2)
            - [展示基本信息](#展示基本信息)
            - [把Markdown 转为 HTML](#把markdown-转为-html)
            - [展示文章作者相关信息](#展示文章作者相关信息)
            - [设置页面meta优化SEO](#设置页面meta优化seo)
            - [通过客户端渲染展示评论列表](#通过客户端渲染展示评论列表)
        - [发布部署](#发布部署)
            - [打包](#打包)
            - [最简单的部署方式](#最简单的部署方式)
            - [使用PM2启动Node服务](#使用pm2启动node服务)
            - [自动化部署介绍](#自动化部署介绍)
            - [准备自动部署内容](#准备自动部署内容)
            - [自动部署完成](#自动部署完成)

<!-- /TOC -->
## Nuxt.js 综合案例
### 介绍
GitHub仓库：https://github.com/gothinkster/realworld
在线示例：https://demo.realworld.io/#/
接口文档：https://github.com/gothinkster/realworld/tree/master/api
页面模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md

### 创建项目
```
# 创建项目目录
mkdir realworld-nuxtjs

# 进入项目目录
cd realworld-nuxtjs

# 生成 package.json 文件
npm init -y

# 安装 nuxt 依赖
npm install nuxt
```

在package.json中添加启动脚本：
```
"scripts": {"dev": "nuxt"}
```

创建pages/index.vue：
```
<template>
    <div>
      <h1>Home Page</h1>
    </div>
</template>

<script>
    export default {
        name: 'HomePage'
    }
</script>

<style></style>
```

启动服务：
npm run dev
在浏览器中访问http://localhost:3000/测试。

### 导入样式资源
创建app.html
```
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}

    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <!-- <link rel="stylesheet" href="//demo.productionready.io/main.css"> -->
    <link rel="stylesheet" href="/index.css">

  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```
再把样式放进去
第一条link，用这个网址https://www.jsdelivr.com/?query=ionicons转换下
##### 步骤
![](images/1.png)
![](images/2.png)
![](images/3.png)
![](images/4.png)
![](images/5.png)
![](images/6.png)

第二条link,因为加载比较快，不管

第三条link，放在本地创建文件夹static，放进去
![](images/7.png)

### 布局组件
pages/layout/index.vue
顶部导航栏 和 底部 文档中复制过来

```
<template>
    <div>
        <!-- 顶部导航栏 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="index.html">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <!-- Add "active" class when you're on that page" -->
                    <a class="nav-link active" href="">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                    <i class="ion-compose"></i>&nbsp;New Post
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">
                    <i class="ion-gear-a"></i>&nbsp;Settings
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">Sign up</a>
                </li>
                </ul>
            </div>
        </nav>
        <!-- /顶部导航栏 -->

        <!-- 子路由 -->
        <nuxt-child/>
        <!-- /子路由 -->

        <!-- 底部 -->
        <footer>
            <div class="container">
                <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
                An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                </span>
            </div>
        </footer>
        <!-- /底部 -->
    </div>
</template>

<script>
    export default {
        name: 'LayoutIndex'
    }
</script>

<style scoped>

</style>
```
#### 创建nuxt.config.js 配置
![](images/8.png)
```
/**
 * Nuxt.js 配置
 */

module.exports = {
    router: {
        extendRoutes(routes, resolve) {
            //清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
            routes.splice(0);

            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    
                }
            ])
        }
    }
}
```

目前可以看到的效果
![](images/9.png)

#### 首页
pages/home/index.vue
```
<template>
  <div>Home</div>
</template>

<script>
  export default {
      name:'HomeIndex'
  }
</script>

<style>

</style>
```
添加子路由
```
children:[
        {
            path: '',   //默认子路由
            name: 'home',
            component: resolve(__dirname, 'pages/home'),
        }
    ]
```

![](images/10.png)

效果是这样的
![](images/11.png)

然后去文档中把首页的内容复制过来
![](images/12.png)

```
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 29
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>How to build webapps that scale</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a href="" class="tag-pill tag-default">programming</a>
            <a href="" class="tag-pill tag-default">javascript</a>
            <a href="" class="tag-pill tag-default">emberjs</a>
            <a href="" class="tag-pill tag-default">angularjs</a>
            <a href="" class="tag-pill tag-default">react</a>
            <a href="" class="tag-pill tag-default">mean</a>
            <a href="" class="tag-pill tag-default">node</a>
            <a href="" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
```

![](images/13.png)

效果是这样的:
![](images/14.png)

删掉原本配置的index.vue删掉，没有用了
![](images/15.png)

#### 登录注册页面
pages/login/index.vue
![](images/16.png)

```
<template>
  
</template>

<script>
    export default {
        name: 'LoginIndex'
    }
</script>

<style>

</style>
```

把文档中的复制到模板中去，template
![](images/17.png)

```
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="">Have an account?</a>
        </p>

        <ul class="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
```

配置一下登录：
```
,
{
    path: '/login',   
    name: 'login',
    component: resolve(__dirname, 'pages/login'),
}
```

![](images/18.png)

效果是这样的：
![](images/19.png)

配置一下注册：
```
,
{
    path: '/register',   
    name: 'register',
    component: resolve(__dirname, 'pages/login'),
}
```
![](images/20.png)

效果是这样的：
![](images/21.png)

#### 区分登录和注册
修改login/index.vue
第一步
![](images/22.png)

```
,
computed: {
    isLogin() {     //如果是登录页面返回true，注册页面返回false
        return this.$route.name === 'login'
    }
}
```
![](images/23.png)
![](images/24.png)

第二步
![](images/25.png)
{{ isLogin ? 'Sign in' : 'Sign up'}}
![](images/26.png)
![](images/27.png)

第三步
![](images/28.png)
v-if="!isLogin"
![](images/29.png)
![](images/30.png)

第四步
![](images/31.png)
<!-- <a href="">Have an account?</a> -->
<nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
<nuxt-link v-else to="/login">Have an account?</nuxt-link>
![](images/32.png)
![](images/33.png)

#### 用户页面
pages/profile/index.vue

```
<template>

  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
            <h4>Eric Simons</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
              looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "UserProfile",
};
</script>

<style>
</style>
```

配置一下:
```
,
{
    path: '/profile/:username',   
    name: 'profile',
    component: resolve(__dirname, 'pages/profile'),
}
```
注意参照官网的路由:
![](images/34.png)

效果如下：
就是图片没出来，是因为没有翻墙，打开之后图片就出来了。
![](images/35.png)

#### 用户设置
pages/settings/index.vue

```
<template>

  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "SettingsIndex",
};
</script>

<style>
</style>
```

配置一下：
```
,
{
    path: '/settings',   
    name: 'settings',
    component: resolve(__dirname, 'pages/settings'),
}
```

效果如下：
![](images/36.png)

#### 创建和编辑文章
pages/editor/index.vue

```
<template>

  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'EditorIndex'
    };
</script>

<style>
</style>
```

配置一下：
```
,
{
    path: '/editor',   
    name: 'editor',
    component: resolve(__dirname, 'pages/editor'),
}
```

效果如下：
![](images/37.png)

#### 文章的详情页
pages/article/index.vue
```
<template>

  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>

        <div class="article-meta">
          <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            Web development technologies have evolved at an incredible clip over
            the past few years.
          </p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"
            ><img src="http://i.imgur.com/Qr71crq.jpg"
          /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'ArticleIndex'
    };
</script>

<style>
</style>
```

配置一下：
```
,
{
    path: '/article/:slug',   
    name: 'article',
    component: resolve(__dirname, 'pages/article'),
}
```

效果如下：
![](images/38.png) 

### 处理顶部导航链接
![](images/39.png) 
```
<nuxt-link class="nav-link active" to="/">conduit</nuxt-link>

<nuxt-link class="nav-link active" to="/">Home</nuxt-link>

<nuxt-link class="nav-link" to="/editor">

<nuxt-link class="nav-link" to="/settings">
    <i class="ion-gear-a"></i>&nbsp;Settings
</nuxt-link>

<li class="nav-item">
    <!-- <a class="nav-link" href="">Sign up</a> -->
    <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
</li>

<nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
```

点击可以切换页面
![](images/40.png) 


增加个人文章
```
<li class="nav-item">
  <nuxt-link class="nav-link" to="/profile/123">
      <img src="http://toutiao.meiduo.site/FtNcS8sKFSYQbtBbd40eFTL6lAs_"  class="user-pic" alt="">lpz999  
  </nuxt-link>
</li>
```
![](images/41.png)

### 处理导航链接高亮
![](images/43.png)
![](images/44.png)

```
linkActiveClass: 'active ',

<nuxt-link class="nav-link" to="/" exact >Home</nuxt-link>
```
![](images/42.png)

### 封装请求模块
安装
npm install axios --save

根路径创建utils/request.js
```
/**
 * 基于 axios 封装的请求模块
 */

 import axios from 'axios'

 const request = axios.create({
     baseURL: 'https://conduit.productionready.io'
 });

 export default request

```
### 登录注册
#### 实现基本登录功能
![](images/45.png)
![](images/46.png)
![](images/47.png)
```
data(){
    return {
        user: {
            email: '',
            password: ''
        }
    }
}
```
![](images/48.png)
```
v-model="user.email" 

v-model="user.password"
```
![](images/49.png)

提交跳到首页
![](images/50.png)
```
,
methods: {
    async onSubmit() {
        //提交表单登录请求
        const {data} = await request({
            method: 'POST',
            url: '/api/users/login',
            data: {
                user: this.user
            }
        })
        console.log(data);
        //保存用户的登录状态

        //跳转到首页
        this.$router.push('/')

    }
}
```
![](images/51.png)
```
@submit.prevent="onSubmit"
```
效果如下：
![](images/52.MP4)

#### 封装请求方法
根目录下创建api/user,js
![](images/53.png)
```
import request from '@/utils/request.js'

//用户登录
export const login = data => {
    return request({
        method: 'POST',   //注意：这里没有“s”
        url: '/api/users/login',
        data
    })
}
//用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}
```
注意注册这部分 /api/users，还是在这个[网址](https://github.com/gothinkster/realworld/tree/master/api)上复制下来
![](images/55.png)

![](images/54.png)
```
import {login} from '@/api/user.js'

login({
    user: this.user
});
```
检查登录http://localhost:3000/login
没有问题，能够正常调转到首页

#### 表单验证
给input标签加上 required ，必填项
效果如下：
![](images/56.png)

把邮箱的类型改下 type="email"
效果如下：
![](images/57.png)

给密码加上最小长度 minlength="6"
效果如下：
![](images/58.png)

当然，以上是它默认的处理，还可以添加想要的验证方式上去
#### 错误处理
![](images/59.png)
```
try {

} catch (err) {
    // console.log('请求失败', error)
    // console.dir(error);
    this.errors = err.response.data.errors;
}
```
![](images/60.png)
![](images/61.png)
```
<template v-for="(messages, field) in errors">
    <li v-for="(message, index) in messages" 
    :key="index">{{field}} {{message}}</li>
</template>
```
#### 用户注册
![](images/62.png)
```
const {data} = this.isLogin
? await login({
    user: this.user
})
: await login({
    user: this.user
});
```
![](images/63.png)

#### 解析储存登录状态实现流程
[跨域身份验证](https://zh.nuxtjs.org/faq/auth-external-jwt/)


#### 将登录状态存储到容器中
根目录下创建store/index.js

![](images/64.png)
```
export const state = () => {
    return {
        foo: 'bar'
    }
}
```
![](images/65.png)

修改为当前的store/index.js
![](images/66.png)

```
export const state = () => {
    return {
        //当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    //用来修改state的状态
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {}
```
修改为当前的login/index.js
![](images/67.png)
```
this.$store.commit('setUser', data.user)
```
效果如下：
![](images/68.png)
![](images/69.png)

#### 登录状态持久化
[官方demo网址](https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/auth-jwt?fontsize=14&amp%3Bhidenavigation=1&amp%3Btheme=dark&file=/pages/login.vue)

客户端渲染安装依赖：
  npm install js-cookie --save

![](images/70.png)
```
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

// 为了防止刷新页面数据丢失，我们需要把数据持久化
Cookie.set('user', data.user)
```
效果如下：
![](images/71.png)

  npm install cookieparser --save

![](images/72.png)
```
const cookieparser = process.server ? require('cookieparser') : undefined

nuxtServerInit ({ commit }, { req }) {
  let user = null

  // 如果请求头中有 Cookie
  if (req.headers.cookie) {
    // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
    const parsed = cookieparser.parse(req.headers.cookie)
    try {
      user = JSON.parse(parsed.user)
    } catch (err) {
      // No valid cookie found
    }
  }

  // 提交 mutation 修改 state 状态
  commit('setUser', user)
}
```

#### 处理导航栏链接展示状态
/layout/index.js
![](images/73.png)
```
import { mapState } from 'vuex'

computed: {
    ...mapState(['user'])
}
```

![](images/74.png)

#### 处理页面访问权限
根目录新建 middleware/authenticated.js   middleware/notAuthenticated.js
![](images/75.png)
![](images/76.png)

profile/index.vue  settings/index.vue  editor/index.vue
![](images/77.png)
```
//在路由匹配组件渲染之前先执行中间件处理，middleware - 中间件
middleware: 'authenticated',
```
login/index.vue 
![](images/78.png)

### 首页
#### 业务介绍

#### 展示公共文章列表
/api/article.js
![](images/79.png)
![](images/80.png)
```
import { request } from '@/utils/request.js'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
```
/pages/home/index.vue

![](images/82.png)
```
import { getArticles } from '@/api/article'

,
async asyncData() {
  const { data } = await getArticles()
  console.log(data)
}
```
![](images/81.png)
![](images/83.png)
```
return {
  articles: data.articles,
  articlesCount: data.articlesCount
}
```
![](images/84.png)
![](images/85.png)
![](images/86.png)

效果如下：
![](images/87.png)
![](images/88.png)
![](images/89.png)


#### 列表分页-分页参数的使用
![](images/90.png)
```
const page = 3;
const limit = 2;

limit,    //限制文章数
offset: (page - 1) * limit    //文章的偏移量/跳过数
```
#### 列表分页-页码处理
![](images/91.png)

![](images/92.png)
```
<!-- 分页 -->
<nav>
  <ul class="pagination">
    <li class="page-item" 
      :class="{
        active: item === page
      }"
      v-for="item in totalPage" :key="item">
      <nuxt-lick class="page-link" 
      :to="{
        name: 'home',
        query: {
          page: item
        }
      }"
      >{{ item }}</nuxt-lick>
    </li>
  </ul>
</nav>
<!-- 分页 -->
```

#### 展示文章标签列表
![](images/93.png)
```
import request from '@/utils/request.js'

// 获取文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
```

![](images/94.png)
```
const { data: tagData } = await getTags();
console.log(tagData);
```
效果如下：
![](images/95.png)

#### 优化并行异步任务
![](images/96.png)
```
const [articleRes, tagRes] = await Promise.all([
  getArticles({
    limit,    //限制文章数
    offset: (page - 1) * limit    //文章的偏移量/跳过数
  }),
  getTags()
])

const { articles, articlesCount } = articleRes.data;
const { tags } = tagRes.data;
return {
  articles,
  articlesCount,   //文章总数
  tags,
  limit,
  page
}
```
![](images/97.png)

#### 处理标签列表链接和数据
![](images/98.png)
![](images/99.png)
![](images/100.png)
效果如下：
![](images/101.png)

#### 处理导航栏
##### 业务介绍


##### 展示状态处理
![](images/102.png)
![](images/103.png)
效果如下：
![](images/104.png)
重新登录
效果如下：
![](images/105.png)

修改标签
![](images/106.png)
![](images/107.png)
效果如下：
![](images/108.png)
![](images/109.png)

##### 标签高亮及链接
![](images/110.png)
![](images/111.png)
效果如下：
![](images/112.png)
![](images/113.png)

修改标签
![](images/114.png)
![](images/115.png)
效果如下：
![](images/116.png)
当再次点击Your Feed 或者 Global Feed时，标签就消失了

##### 展示用户关注的文章列表
![](images/117.png)
![](images/118.png)
```
//获取关注的用户文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    headers: {
      //注意数据格式：Token空格数据Token
      Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNjE0NDI2NDg2fQ.GnOsR9DqVDkxQnptMiXVyPtXDxOKRqmnAkLLVsGb1Mk`
    },
    params
  })
}
```
![](images/119.png)

效果如下：
现在导航和数据是对应起来的
![](images/120.png)
![](images/121.png)
![](images/122.png)

#### 统一设置用户Token
[axios/axios](https://github.com/axios/axios#interceptors)
搜索 Interceptors

util/request.js 里面
![](images/123.png)
```
//请求拦截器
// Add a request interceptor
/**
 * 任何请求都要经过请求拦截器
 * 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
 */
request.interceptors.request.use(function (config) {
   // Do something before request is sent
   // 请求会经过这里
   config.headers.Authorization = `Token XX`
   
   // 返回 Token 请求配置对象
   return config;
 }, function (error) {
   // Do something with request error
   // 如果请求失败（此时请求还没有发出去）就会进入这里
   return Promise.reject(error);
 });
```

根目录下创建plugins/request.js
![](images/124.png)
![](images/125.png)
<!-- 数据就出来了 -->
![](images/126.png)

![](images/127.png)
![](images/128.png)

以下都替换了
![](images/129.png)
![](images/130.png)
![](images/131.png)

测试正常
![](images/132.png)

#### 文章发布时间格式化处理
轻量级的处理日期的js类库 [iamkun/dayjs](https://github.com/iamkun/dayjs)
安装 npm install dayjs --save

最好把它封装为全局的过滤器
根目录创建 plugins/dayjs.js

format 的格式参考
![](images/133.png)
![](images/134.png)
![](images/135.png)

![](images/136.png)
```
import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器}}
Vue.filter('data', (value, format = 'YYYY-MM-DD HH-mm-ss') => {
    return dayjs(value).format(format)
})
```
然后注册一下,在nuxt.config.js里面
```
'~/plugins/dayjs.js'
```

找到pages/home/index.js
![](images/138.png)

效果如下： 日期就被处理了

![](images/137.png)

再处理一下日期的简写
![](images/139.png)
效果如下： 

![](images/140.png)

#### 文章点赞
先找到数据接口，添加点赞和删除点赞
![](images/141.png)

封装起来，找到api/article.js

![](images/142.png)
```
// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: '/api/articles/${slug}/favorite',
    params
  })
}

// 取消点赞
export const addFavorite = slug => {
  return request({
    method: 'DELETE',
    url: '/api/articles/${slug}/favorite',
    params
  })
}
```

在home/index.vue 里面找到 button 添加一个点击事件
![](images/144.png)

![](images/143.png)
```
@click="onFavorite(article)"


,
methods: {
  async onFavorite(article) {   //获取文章对象,然后把addFavorite 和 deleteFavorite 拿进来
    // 如果文章已经点赞了
    if(article.favorited){
      // 取消点赞
      await deleteFavorite(article.slug);
      article.favorited = false;
      article.favoritesCount += -1;
    }else{
      // 添加点赞
      await addFavorite(article.slug);
      article.favorited = true;
      article.favoritesCount += 1;
    }
    console.log(article)
  }
}
```
刷新页面，测试点赞
注意先登录进去，翻墙进去

点赞请求期间是禁用的
![](images/146.png)
![](images/145.png)

![](images/147.png)
![](images/148.png)
```
articles.forEach(article => article.favoriteDisabled = false)

:disabled="article.favoriteDisabled"

article.favoriteDisabled = true

article.favoriteDisabled = false
```

#### 文章详情
##### 业务介绍 

##### 展示基本信息
把文章的详情展示出来，找到数据接口
![](images/149.png)

找到api 把它封装起来
![](images/150.png)
```
// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
```
找到article/index.vue
![](images/151.png)
```
import { getArticle } from '@/api/article'

async asyncData ({ params }) {  //拿到路由
  const { data } = await getArticle(params.slug)
  return {
    article: data.article
  }
}
```
![](images/152.png)

效果如下：

![](images/153.png)

##### 把Markdown 转为 HTML
借助第三方包 markdown-it 可以轻松把 markdown的格式转化为 HTML
安装 npm install markdown-it --save

然后在文章的详情页把这个包加载进来

![](images/154.png)
```
import MarkdownIt from 'markdown-it'

const { article } = data
const md = new MarkdownIt()
article.body = md.render(article.body)

return {
  article
}
```
![](images/155.png)

改成 html数据渲染
![](images/156.png)
![](images/157.png)

##### 展示文章作者相关信息
article 文件夹下创建 components 文件夹 创建 article-meta.vue
然后把下图的内容，放到模板里面
![](images/158.png)

article-meta.vue 里面的内容如下：

![](images/160.png)

引入和注册articleMeta

![](images/159.png)

然后把数据传递给子组件

![](images/161.png)

子组件获取下

![](images/162.png)

看是否有数据

![](images/163.png)

![](images/164.png)

##### 设置页面meta优化SEO
[默认 Meta 标签](https://www.nuxtjs.cn/guide/views)
[API: head 方法](https://www.nuxtjs.cn/api/pages-head)

![](images/165.png)
![](images/166.png)

效果如图：

![](images/167.png)

##### 通过客户端渲染展示评论列表
把评论封装成组件
创建 article/components/article-comments.vue

![](images/168.png)

配置API
api/article.js

![](images/168.png)

![](images/169.png)
![](images/170.png)

![](images/171.png)
```
import { getComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [] // 文章列表
    }
  },
  async mounted () {  //客户端渲染
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  }
}
```
![](images/172.png)


#### 发布部署
##### 打包
[](https://zh.nuxtjs.org/guide/commands)
|
V
[](https://zh.nuxtjs.org/docs/2.x/get-started/commands/)

![](images/173.png)
![](images/174.png)

打包
npm run build

![](images/175.png)
![](images/176.png)

启动打包结果
npm run start

##### 最简单的部署方式
  配置 Host + Port
  压缩发布包
  把发布包传到服务器
  解压
  安装依赖
  启动服务

  ![](images/177.png)

  这些文件需要传到服务器-右键压缩打包

  ![](images/177.png)

  连接到自己的服务器

  终端：ssh root@39.105.28.5
  ls
  mkdir realworld-nuxtjs
  cd realworld-nuxtjs
  pwd //路径打印出来
  /root/realworld-nuxtjs //复制路径
  exit //退出
  scp .\realworld-ruxtjs.zip root@39.105.28.5:/root/realworld-nuxtjs  //从本地和服务端传送文件的一个工具
  ssh root@39.105.28.5 //重新连接服务器
  cd realworld-nuxtjs/
  ls //查看本地的包有没有传到服务器
  unzip realworld-ruxtjs.zip //解压
  ls //查看下
  ls -a //可以看到隐藏目录
  npm install //安装一下
  clear //清空
  npm run start //安装成功以后，执行 npm run start

  公网IP + 端口号 来进行访问
  http://39.105.28.5:3000/

##### 使用PM2启动Node服务
github地址：[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)
官方文档：[https://pm2.io/](https://pm2.io/)
安装：npm install --global pm2
启动：pm2 start 脚本路径

web服务端安装 npm install --global pm2
启动 pm2 start npm -- start
关闭 pm2 stop id/name

pm2 list 查看应用列表
pm2 reload 重载应用
pm2 restart 重启应用
pm2 delete 删除应用

##### 自动化部署介绍
传统的部署方式
  更新
    本地构建
    发布
  更新
    本地构建
    发布
  。。。

现代化的部署方式
  ![](images/179.png)

##### 准备自动部署内容

CI/CD 服务
Jenkins
Gitlab CI
GitHub Actions
Travis CI
Circle CI
...

环境准备
Linux 服务器
把代码提交到 GitHub 远程仓库

配置 GitHubAccessToken
生成：https://github.com/settings/tokens
配置到项目的 Secrets 中：https://github.com/lipengzhou/realworld-nuxtjs/settings/secrets

  ![](images/180.png)
  ![](images/181.png)
  ![](images/182.png)

生成一个新的token
41fc8dee8a7ea9ca4da4e84a866e713dd5646702 

![](images/183.png)
![](images/184.png)

![](images/185.png)

配置 GitHub Actions 执行
  在项目根目录创建 .github/workflows 目录
  下载 main.yml 到 workflows 目录
    [lipengzhou/main.yml](https://gist.github.com/lipengzhou/b92f80142afa37aea397da47366bd872)
    
    ![](images/185.png)
    ![](images/186.png)

    ctrl + s
    选择所有文件，后缀名为 .yml

    创建 pm2.config.js 文件
```
{
    "apps": [
      {
        "name": "RealWorld",
        "script": "npm",
        "args": "start"
      }
    ]
}
```
    ![](images/187.png)
    
远程仓库 Secrets 创建 HOST USERNAME PASSWORD PORT

  修改配置
  配置 PM2 配置文件
  提交更新
  查看自动部署状态
  访问网址
  提交更新...

##### 自动部署完成

git add .
[git commit -m "发布部署-测试"
git push]

git tag v0.1.0
git tag
git push origin v0.1.0

打开github - Actions - build-and-deploy - 全部是绿色的勾，说明部署完了
Release v0.1.0 发布包

39.105.28.5:3000 访问成功


更新：
git add .
git commit -m "部署更新测试"
git push

git tag
git tag v0.1.1
git push origin v0.1.1

下载 release.tgz 部署到服务器

