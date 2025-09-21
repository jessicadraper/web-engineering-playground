// search.js

const search = () => {

    // Search highlighter
    document.querySelector('.search').addEventListener('submit', function(e) {
        e.preventDefault();

        document.querySelectorAll('.highlight').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        const searchKey = this.q.value.trim();
        const searchResults = [];
        if (!searchKey) return;

        const articles = document.getElementsByTagName('ARTICLE');

        const regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

        const walk = (node) => {
            if (node.nodeType == Node.TEXT_NODE) { // Text node
                const match = node.nodeValue.match(regex);
                if (match) {
                    searchResults.push(node.nodeValue)

                    const span = document.createElement('span');
                    span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');

                    // create fragment from span for replacing content safely using static array
                    const fragment = document.createDocumentFragment();
                    Array.from(span.childNodes).forEach( child => fragment.appendChild(child))
                    node.parentNode.replaceChild(fragment, node);
                }
            } 
            else if (node.nodeType == Node.ELEMENT_NODE) {
                
                // Don't search certain elements
                if (['SCRIPT', 'STYLE', 'FORM'].includes(node.tagName)) return;
                
                // Don't replace if already highlighted
                if (!node.classList.contains('highlight')) {
                    Array.from(node.childNodes).forEach(walk);
                }
            }
        }

        Array.from(articles).forEach(walk);

        const showResultsMessage = (message) => {

            // If results already exist
            let existing = document.getElementsByClassName('search-result')[0];
            if (existing) {
                existing.textContent = message;
                return
            }

            // Otherwise create new results div and append
            const newDiv = document.createElement('div');
            newDiv.textContent = message;
            newDiv.className = 'search-result';
            this.appendChild(newDiv);
        }

        let resultsMessage;

        if (numResults === 0) {
        resultsMessage = 'No results found';
        } else if (numResults === 1) {
        resultsMessage = '1 result found';
        } else {
        resultsMessage = `${numResults} results found`;
        }

        showResultsMessage(message);

    });

}

export {search}