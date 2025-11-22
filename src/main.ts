import { search } from './modules/search.js';
import { wikibears } from './modules/wikibear.js';
import './components/comment-section/comment-section.js';

const init = async (): Promise<void> => {
  // Fetch bear data
  await wikibears();

  // Initialize search functionality
  search();
};

await init();
