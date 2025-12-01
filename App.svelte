<script lang="ts">
import Header from './src/lib/components/Header.svelte'
import Article from './src/lib/components/Article.svelte'
import RelatedArticles from './src/lib/components/RelatedArticles.svelte'
import Footer from './src/lib/components/Footer.svelte'

import { bearArticleContent } from './src/lib/data/bearArticle'
import './src/app.css';
</script>

<Header title="Welcome to our wildlife website"></Header>
<main class="flex flex-col justify-center xl:flex-row gap-6 m-auto px-6 w-auto xl:max-w-5xl">
  <Article articleContent={bearArticleContent}></Article>
  <aside class="w-full min-w-80 xl:max-w-80"> 
    <RelatedArticles></RelatedArticles>
  </aside>
</main>
<Footer></Footer>