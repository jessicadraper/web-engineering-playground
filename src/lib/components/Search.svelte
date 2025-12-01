<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { writable } from 'svelte/store'
  import { Button, Input, Label, Helper } from "flowbite-svelte";

  let searchInput = '';

  const handleSearch = (e: Event) => {
    e.preventDefault();
    searchQuery.set(searchInput.trim())
    console.log("handled!")
  }

</script>

<form class="search" role="search" on:submit={handleSearch}>
  <div class="flex flex-row items-center gap-3">
    <Label for="search" class="hidden">Search</Label>
    <Input
      id="search"
      type="search"
      bind:value={searchInput}
      name="q"
      placeholder="Search content"
      aria-label="Search through site content"
    />
    <Button pill type="submit" color="amber">Search</Button>
  </div>
</form>