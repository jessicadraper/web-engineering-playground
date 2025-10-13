import { search } from './modules/search.js';
import { toggleComments, commentForm } from './modules/comments.js';
import { wikibears } from './modules/wikibear.js';

const init = async () => {
  // Fetch bear data
  await wikibears();

  // Initialize search functionality
  search();

  // Enable comment functionality with toggling
  toggleComments();
  commentForm();
};

init();
