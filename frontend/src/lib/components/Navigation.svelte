<script lang="ts">
  import Search from './Search.svelte'
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
</script>

<Navbar class="bg-white shadow">
  <NavBrand class="font-semibold text-xl text-emerald-800">The Wild Life</NavBrand>
  <NavUl>
    <NavLi href="#">Home</NavLi>
    <NavLi href="#">Our Team</NavLi>
    <NavLi href="#">Projects</NavLi>
    <NavLi href="#">Blog</NavLi>
  </NavUl>
  <Search></Search>
  <NavHamburger></NavHamburger>
</Navbar>

