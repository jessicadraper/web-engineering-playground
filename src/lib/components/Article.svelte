<script lang="ts">
  export let articleContent;

  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'
  import Table from './Table.svelte'
  import AboutAuthor from './AboutAuthor.svelte'
  // import CommentSection from './CommentSection.svelte'
  import Comments from './Comments.svelte'
  import { Heading, P } from "flowbite-svelte";

</script>

<article role="article" class="w-full bg-white p-10 rounded-xl shadow-xl">
  {#each articleContent as block}
    {#if block.type === 'p'}
      <P class="mb-5 {block.styles}">
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </P>
    {:else if block.type === 'h2'}
      <Heading tag='h2' class='mb-5 text-emerald-900 {block.styles}'>
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </Heading>
    {:else if block.type === 'h3'}
      <Heading tag='h3' class='mt-8 mb-5 font-medium {block.styles}'>
        {#each getHighlightedParts(block.text, $searchQuery) as part}
          {#if part.highlight}<mark class="highlight">{part.text}</mark>{:else}{part.text}{/if}
        {/each}
      </Heading>
    {:else if block.type === 'img'}
      <img src={block.src} alt={block.alt} class="rounded-xl mb-4 {block.styles}">
    {:else if block.type === 'audio'}
      <div class="flex flex-row gap-6 my-8">
        <audio controls aria-describedby={block.transcriptDiv}>
          {#each block.sources as s}
            <source src={s.src} type={s.type}/>
          {/each}
          <p>{block.fallback}</p>
        </audio>
        <div id={block.transcriptDiv} class="p-4 border border-stone-200 rounded-lg">
          <p><strong>Audio Transcript</strong></p>
          <p>
            <em>{block.transcriptText}</em>
          </p>
        </div>
      </div>
    {:else if block.type === 'table'}
      <Table header={block.header} data={block.data} caption={block.caption}></Table>
    {:else if block.type === 'component'}
      <svelte:component this={block.component} />
    {:else if block.type === 'bio'}
      <AboutAuthor bio={block.text}></AboutAuthor>
    {/if}
  {/each}
  <Comments></Comments>
</article>