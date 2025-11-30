<script lang="ts">
  import { searchQuery } from '../../stores/search'
  import { getHighlightedParts } from '../utils/highlight'

  export let caption;
  export let header;
  export let data;
</script>

<table>
  <caption>
    {caption}
  </caption>
  {#if header}
    <thead>
      <tr>
        {#each header as columnName}
          <th scope="col">
            {#each getHighlightedParts(columnName, $searchQuery) as part}
              {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
            {/each}
          </th>
        {/each}
      </tr>
    </thead>
  {/if}
  <tbody>
    {#each data as row}
      <tr>
        {#each row as cellValue}
          <td>
            {#each getHighlightedParts(cellValue, $searchQuery) as part}
              {#if part.highlight}<mark>{part.text}</mark>{:else}{part.text}{/if}
            {/each}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>