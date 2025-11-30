<script lang="ts">
import Header from './src/lib/components/Header.svelte'
import Article from './src/lib/components/Article.svelte'
import RelatedArticles from './src/lib/components/RelatedArticles.svelte'
import Footer from './src/lib/components/Footer.svelte'

import { bearArticleContent } from './src/lib/data/bearArticle'
import './src/lib/styles/styles.scss';
</script>

<Header title="Welcome to our wildlife website"></Header>
<main>
  <Article articleContent={bearArticleContent}></Article>
  <aside>
    <RelatedArticles></RelatedArticles>
  </aside>
</main>
<Footer></Footer>