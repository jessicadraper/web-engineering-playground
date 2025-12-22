<script lang="ts">
  import { wikibears } from '../services/wikibear.js'
  
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'

  import { Heading, Card, Spinner } from "flowbite-svelte";
  import { onMount } from 'svelte';

  // Fetch bear data
  let bears = $state([]);
  let loading = $state(true);
  // $effect(async () => {
  //   bears = await wikibears();
  //   loading = false;
  // });
  onMount(async () => {
    bears = await wikibears();
    loading = false;
  });
</script>

<section class="more_bears">
  <Heading tag='h3' class="mb-4 font-medium">More Bears</Heading>
  {#if loading}
    <Spinner type="dots" color="lime"/>
  {/if}
  {#if bears}
    <div class="flex flex-colum md:flex-row flex-wrap gap-6">
      {#each bears as bear}
          <Card>
            <img src={bear.image} alt=''/>
            <div class="p-4">
              <p class="text-xl">
                <strong>
                  {#each getHighlightedParts(bear.name, $searchQuery) as part}
                    {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
                  {/each}
                </strong>
              </p>
              <p class="italic">
                {#each getHighlightedParts(bear.binomial, $searchQuery) as part}
                  {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
                {/each}
              </p>
              <p class="pt-3">
                {#each getHighlightedParts("Range: ", $searchQuery) as part}
                  {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
                {/each}
                {#each getHighlightedParts(bear.range, $searchQuery) as part}
                  {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
                {/each}
              </p>
            </div>
          </Card>
      {/each}
    </div>
  {:else}
    <div class="empty">No bears</div>
  {/if}
</section>