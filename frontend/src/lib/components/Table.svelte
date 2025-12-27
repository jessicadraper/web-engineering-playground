<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell  } from "flowbite-svelte";

  export let caption;
  export let header;
  export let data;
</script>

<Table>
  <caption class="pb-3 text-left">
    {caption}
  </caption>
  {#if header}
    <TableHead>
        {#each header as columnName}
          <TableHeadCell>
            {#each getHighlightedParts(columnName, $searchQuery) as part}
              {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
            {/each}
          </TableHeadCell>
        {/each}
    </TableHead>
  {/if}
  <TableBody>
    {#each data as row}
      <TableBodyRow class="border-stone-200">
        {#each row as cellValue}
          <TableBodyCell>
            {#each getHighlightedParts(cellValue, $searchQuery) as part}
              {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
            {/each}
          </TableBodyCell>
        {/each}
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>