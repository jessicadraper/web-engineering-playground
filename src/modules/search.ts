// search.js

const search = () => {
  // Search highlighter
  const search = document.querySelector('.search');
  if (search instanceof HTMLFormElement) {
    search.addEventListener('submit', (e) => {
      e.preventDefault();

      const highlight = document.querySelectorAll('.highlight');
      if (highlight !== null) {
        highlight.forEach((el) => {
          const parent = el.parentNode;
          parent?.replaceChild(document.createTextNode(el.textContent), el);
          parent?.normalize();
        });
      }

      const input = search.querySelector(
        'input[name="q"]'
      ) as HTMLInputElement | null;
      const searchKey = input?.value.trim();

      const searchResults = [];
      if (!searchKey) return;

      const articles = document.getElementsByTagName('ARTICLE');

      const regex = new RegExp(
        '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'gi'
      );

      const walk = (node: Node) => {
        if (node.nodeType == Node.TEXT_NODE && node.nodeValue) {
          // Text node
          const text = node.nodeValue;
          const matches = [...text.matchAll(regex)];

          if (matches.length > 0) {
            searchResults.push(text);

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;

            for (const match of matches) {
              if (match[1]) {
                const matchText = match[1];
                const index = match.index;

                // Add text before match
                const before = text.slice(lastIndex, index);
                if (before) {
                  fragment.appendChild(document.createTextNode(before));
                }

                // Add <mark> element
                const mark = document.createElement('mark');
                mark.className = 'highlight';
                mark.textContent = matchText;
                fragment.appendChild(mark);

                lastIndex = index + matchText.length;
              }
            }

            // Add remaining text after last match
            const after = text.slice(lastIndex);
            if (after) {
              fragment.appendChild(document.createTextNode(after));
            }

            node.parentNode?.replaceChild(fragment, node);
          }
        } else if (node.nodeType == Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Don't search certain elements
          if (['SCRIPT', 'STYLE', 'FORM'].includes(element.tagName)) return;

          // Don't replace if already highlighted
          if (!element.classList.contains('highlight')) {
            Array.from(node.childNodes).forEach(walk);
          }
        }
      };

      if (articles instanceof HTMLCollection) {
        Array.from(articles).forEach(walk);
      }

      const showResultsMessage = () => {
        let resultsMessage;
        const numResults = searchResults.length;

        if (numResults === 0) {
          resultsMessage = 'No results found';
        } else if (numResults === 1) {
          resultsMessage = '1 result found';
        } else {
          resultsMessage = `${numResults} results found`;
        }

        // If results already exist
        const existing = document.getElementsByClassName('search-result')[0];
        if (existing) {
          existing.textContent = resultsMessage;
          return;
        }

        // Otherwise create new results div and append
        const newDiv = document.createElement('div');
        newDiv.textContent = resultsMessage;
        newDiv.className = 'search-result';
        search.appendChild(newDiv);
      };

      showResultsMessage();
    });
  }
};

export { search };
