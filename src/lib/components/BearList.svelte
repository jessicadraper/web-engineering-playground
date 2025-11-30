<script lang="ts">
  import { wikibears } from '../services/wikibear.js'
  
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'

  // Fetch bear data
  let bears = $state([]);
  $effect(async () => {
    bears = await wikibears();
  });
</script>

<section class="more_bears">
  <h3>More Bears</h3>
  {#if bears}
    {#each bears as bear}
      <div class="bear">
        <img src={bear.image} alt='' width="200px" height="auto">
        <p>
          <strong>
            {#each getHighlightedParts(bear.name, $searchQuery) as part}
              {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
            {/each}
          </strong>
          {#each getHighlightedParts(bear.binomial, $searchQuery) as part}
            {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
          {/each}
        </p>
        <p>Range:
          {#each getHighlightedParts(bear.range, $searchQuery) as part}
            {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
          {/each}
        </p>
      </div>
    {/each}
  {:else}
    <div class="empty">No bears</div>
  {/if}
</section>