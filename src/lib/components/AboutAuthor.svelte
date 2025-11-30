<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'

  export let bio: string;
</script>

<section class="author" role="complementary">
  <h2>
    {#each getHighlightedParts("About the author", $searchQuery) as part}
      {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
    {/each}
  </h2>
  <p>
    {#each getHighlightedParts(bio, $searchQuery) as part}
      {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
    {/each}
  </p>
</section>