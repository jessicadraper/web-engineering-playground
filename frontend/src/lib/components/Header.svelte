<script lang="ts">
  import Navigation from './Navigation.svelte'
  import { Heading, Span } from "flowbite-svelte";

  export let title: string; // declare title prop

</script>

<header>
  <Navigation></Navigation>
  <div class="my-15 text-center">
    <Heading tag='h1'><Span gradient="tealToLime">{title}</Span></Heading>
  </div>
</header>