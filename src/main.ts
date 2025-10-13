import { search } from './modules/search.js';
import { toggleComments, commentForm } from './modules/comments.js';
import { wikibears } from './modules/wikibear.js';

const init = async (): Promise<void> => {
  // Fetch bear data
  await wikibears();

  // Initialize search functionality
  search();

  // Enable comment functionality with toggling
  toggleComments();
  commentForm();
};

await init();
