<template>
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
              <li v-if="user" class="nav-item">
                <!-- 只有登录了才会显示 -->
                <nuxt-link 
                class="nav-link" 
                :class="{
                  active: tab === 'your_feed'
                }"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <!-- 无论登录与否都会显示 -->
                <nuxt-link 
                class="nav-link"
                :class="{
                  active: tab === 'global_feed'
                }"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <!-- 进行标签筛选才会显示，或者网址有tag= -->
                <a 
                class="nav-link" 
                :class="{
                  active: tab === 'tag'
                }"
                exact 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }"
                >#{{ tag }}</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <!-- <a href="" class="author">Eric Simons</a> -->
                <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
                {{ article.author.username }}
                </nuxt-link>
                <!-- 注意这里的日期格式要处理下 -->
                <span class="date">{{ article.createdAt | data('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                      :class="{
                        active: article.favorited
                      }"
                      @click="onFavorite(article)"
                      :disabled="article.favoriteDisabled">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 多余的去掉 -->
          <!-- <div class="article-preview">
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
          </div> -->

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" 
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link" 
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- 分页 -->

        </div>
        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
              :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag: item
                }
              }" 
              class="tag-pill tag-default" 
              v-for="item in tags" :key="item">
              {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- /标签 -->
      </div>
    </div>

  </div>
</template>

<script>
  import { 
    getArticles, 
    getFeedArticles,
    addFavorite,
    deleteFavorite
  } from '@/api/article.js'
  import { getTags } from '@/api/tag'
  import { mapState } from 'vuex'

  export default {
      name:'HomeIndex',
      async asyncData({ query, store }) {
        // console.log(store);
        const page = Number.parseInt(query.page|| 1);
        const limit = 20;
        const { tag } = query;
        const tab = query.tab || 'global_feed';
        const loadArticles = store.state.user && tab === 'your_feed'
        ? getFeedArticles
        : getArticles;

        const [articleRes, tagRes] = await Promise.all([
          loadArticles({
            limit,    //限制文章数
            offset: (page - 1) * limit,    //文章的偏移量/跳过数
            tag
          }),
          getTags()
        ])

        const { articles, articlesCount } = articleRes.data;
        const { tags } = tagRes.data;

        articles.forEach(article => article.favoriteDisabled = false)

        return {
          articles,
          articlesCount,   //文章总数
          tags,
          limit,
          page,
          tag,
          tab: query.tab || 'global_feed'
        }
      },
      watchQuery: ['page', 'tag', 'tab'],   //使用该watchQuery键可以设置查询字符串的监视程序。
      computed: {
        ...mapState(['user']),
        totalPage() {
          return Math.ceil(this.articlesCount / this.limit);
        }
      },
      methods: {
        async onFavorite (article) {  //获取文章对象,然后把addFavorite 和 deleteFavorite 拿进来
          article.favoriteDisabled = true
          // 如果文章已经点赞了
          if (article.favorited) {
            // 取消点赞
            await deleteFavorite(article.slug)
            article.favorited = false
            article.favoritesCount += -1
          }else{
            // 添加点赞
            await addFavorite(article.slug)
            article.favorited = true
            article.favoritesCount += 1
          }
          article.favoriteDisabled = false
        }
      }
      
  }
</script>

<style>

</style>