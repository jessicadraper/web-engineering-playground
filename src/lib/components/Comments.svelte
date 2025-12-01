<script lang="ts">
  import { Heading, Button, GradientButton, Input, Label, Helper } from "flowbite-svelte";
  import Table from './Table.svelte'

  let show = false;
  let name = '';
  let comment = '';
  let message = {
    'type': '',
    'text': ''}

  let comments = [
    ["Bob Fossil", "Oh I am so glad you taught me all about the big brown angry guys..."]
  ]

  const toggleComments = () => {
    console.log("toggled!")
    show = !show; // toggle boolean
  };

  const addComment = (e: Event) => {
    e.preventDefault();

    if (name.trim() && comment.trim()) {
      // Add new comment as [name, comment]
      comments = [...comments, [name.trim(), comment.trim()]];
      message.type = 'success'
      message.text = 'Comment posted!'

      // Clear input fields
      name = '';
      comment = '';
    } else {
      message.type = 'error'
      message.text = 'All fields are required'
    }
  }

  $: buttonText = show ? "Hide" : "Show"; // reactive variable updates automatically

</script>

<section class="comments border-t border-stone-200 mt-8">
  <div class="my-5">
    <Button pill outline as="button" type="button" color="amber" onclick={toggleComments}>
      {show ? "Hide" : "Show"} comments
    </Button>
  </div>

  {#if show}
    <div class="comment-wrapper">
      <Heading tag='h4'>Add comment</Heading>
      <form class="comment-form mb-7" on:submit={addComment}>
        <div class="my-3">
          <Label for="name">Your name</Label>
          <Input
            type="text"
            bind:value={name}
            name="name"
            id="name"
            placeholder="Enter your name"
            aria-label="Your name"
          />
        </div>
        <div class="my-3">
          <Label for="comment">Your comment</Label>
          <Input
            type="text"
            bind:value={comment}
            name="comment"
            id="comment"
            placeholder="Enter your comment"
            aria-label="Your comment"
          />
        </div>
        <div>
          {#if message.type == 'error'}
            <p class="text-red-700 pb-4" aria-live="polite">{message.text}</p>
          {:else if message.type == 'success'}
            <p class="text-green-700 pb-4" aria-live="polite">{message.text}</p>
          {/if}
          <Button pill type="submit" color="amber">Submit comment</Button>
        </div>
      </form>

      <Heading tag='h3' class="mb-5">Comments</Heading>
      <Table data={comments}></Table>
    </div>
  {/if}
</section>