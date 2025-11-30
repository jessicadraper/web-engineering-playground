<script lang="ts">
  import Navigation from './Navigation.svelte'
  import Search from './Search.svelte'

  export let title: string; // declare title prop

</script>

<header>
  <div>
    <h1>{title}</h1>
  </div>

  <nav class="nav">
    <Navigation></Navigation>
    <Search></Search>
  </nav>
</header>