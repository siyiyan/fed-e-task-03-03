<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <!-- 因为重复，封装组件 -->
        <article-meta :article="article" />
        <!-- /因为重复，封装组件 -->
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <!-- 因为重复，封装组件 -->
        <article-meta :article="article"/>
        <!-- /因为重复，封装组件 -->
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 评论表单 -->
          <article-comments :article="article" />
          <!-- <form class="card comment-form">
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
          </div> -->
          <!-- /评论表单 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { getArticle } from '@/api/article'
    import MarkdownIt from 'markdown-it'
    import articleMeta from './components/article-meta.vue';
    import ArticleComments from './components/article-comments.vue';

    export default {
        components: { articleMeta, ArticleComments },
        name: 'ArticleIndex',
        async asyncData ({ params }) {  //拿到路由
          const { data } = await getArticle(params.slug)
          const { article } = data
          const md = new MarkdownIt()
          article.body = md.render(article.body)

          return {
            article
          }
        },
        head() {
          return {
            title: `${this.article.title} - RealWorld`,
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.article.description
              }
            ]
          }
        }
    };
</script>

<style>
</style>