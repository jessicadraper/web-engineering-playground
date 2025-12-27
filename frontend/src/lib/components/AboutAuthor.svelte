<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'
  import { Heading, Card } from "flowbite-svelte";

  export let bio: string;
</script>

<section class="author border-t border-stone-200 pt-8 mt-12" role="complementary">
  <Heading tag='h2' class="mb-4 text-3xl">
    {#each getHighlightedParts("About the author", $searchQuery) as part}
      {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
    {/each}
  </Heading>
  <p>
    {#each getHighlightedParts(bio, $searchQuery) as part}
      {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
    {/each}
  </p>
</section>