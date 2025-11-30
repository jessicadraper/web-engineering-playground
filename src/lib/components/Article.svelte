<script lang="ts">
  export let articleContent;

  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'
  import Table from './Table.svelte'
  import AboutAuthor from './AboutAuthor.svelte'
  import CommentSection from './CommentSection.svelte'

</script>

<article role="article">
  {#each articleContent as block}
    {#if block.type === 'p'}
      <p>
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </p>
    {:else if block.type === 'h2'}
      <h2>
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </h2>
    {:else if block.type === 'h3'}
      <h3>
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </h3>
    {:else if block.type === 'img'}
      <img src={block.src} alt={block.alt}>
    {:else if block.type === 'table'}
      <Table header={block.header} data={block.data}></Table>
    {:else if block.type === 'component'}
      <svelte:component this={block.component} />
    {:else if block.type === 'bio'}
      <AboutAuthor bio={block.text}></AboutAuthor>
    {/if}
  {/each}
  <CommentSection></CommentSection>
</article>