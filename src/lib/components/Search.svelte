<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { writable } from 'svelte/store'

  let searchInput = '';
  let resultsMessage = '';

  const handleSearch = (e: Event) => {
    e.preventDefault();
    searchQuery.set(searchInput.trim())
    console.log("handled!")
  }

</script>

<form class="search" role="search" on:submit={handleSearch}>
  <label for="search" class="visuallyhidden">Search</label>
  <input
    id="search"
    type="search"
    bind:value={searchInput}
    name="q"
    placeholder="Search query"
    aria-label="Search through site content"
  />
  <input type="submit" value="Search" />
  {#if resultsMessage}
    <div class="search-result" aria-live="polite">{resultsMessage}</div>
  {/if}
</form>