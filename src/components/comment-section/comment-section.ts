// comments.js
import styles from './comment-section.scss?inline';

const template = document.createElement('template');

template.innerHTML = `
  <style>${styles}</style>
  <section class="comments">
    <div class="show-hide">Show comments</div>

    <div class="comment-wrapper">
      <h3>Add comment</h3>
      <form class="comment-form">
        <div class="flex-pair">
          <label for="name">Your name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            aria-label="Your name"
          />
        </div>
        <div class="flex-pair">
          <label for="comment">Your comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Enter your comment"
            aria-label="Your comment"
          />
        </div>
        <div>
          <p id="submitMessage"></p>
          <input type="submit" value="Submit comment" />
        </div>
      </form>

      <h2>Comments</h2>
      <ul class="comment-container">
        <li>
          <p>Bob Fossil</p>
          <p>
            Oh I am so glad you taught me all about the big brown angry
            guys...
          </p>
        </li>
      </ul>
    </div>
  </section>
  `;

class CommentsElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot != null) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback(): void {
    console.log('Custom comments element added to page.');

    const toggleComments = (): void => {
      if (this.shadowRoot == null) return;

      // Show/hide comments toggle
      const showHideBtn = this.shadowRoot.querySelector('.show-hide');
      const commentWrapper = this.shadowRoot.querySelector('.comment-wrapper');
      if (
        !(showHideBtn instanceof HTMLElement) ||
        !(commentWrapper instanceof HTMLElement)
      )
        return;

      commentWrapper.style.display = 'none';

      showHideBtn.onclick = () => {
        const isVisible = commentWrapper.classList.toggle('visible');
        showHideBtn.textContent = isVisible ? 'Hide comments' : 'Show comments';
        commentWrapper.style.display = isVisible ? 'block' : 'none';
      };
    };

    const commentForm = (): void => {
      if (this.shadowRoot == null) return;

      // Comment form stuff
      const form = this.shadowRoot.querySelector('.comment-form');
      const nameField = this.shadowRoot.querySelector('#name');
      const commentField = this.shadowRoot.querySelector('#comment');
      const list = this.shadowRoot.querySelector('.comment-container');
      const message = this.shadowRoot.querySelector('#submitMessage');

      if (
        !(form instanceof HTMLElement) ||
        !(nameField instanceof HTMLInputElement) ||
        !(commentField instanceof HTMLInputElement) ||
        !(list instanceof HTMLElement)
      ) {
        console.warn('Comment form elements missing');
        return;
      }

      form.onsubmit = (e) => {
        e.preventDefault();

        const listItem = document.createElement('li');
        const namePara = document.createElement('p');
        const commentPara = document.createElement('p');

        const nameValue = nameField.value.trim();
        const commentValue = commentField.value.trim();

        if (
          nameValue == null ||
          nameValue === '' ||
          commentValue == null ||
          commentValue === ''
        ) {
          if (message instanceof HTMLElement) {
            message.textContent = 'All fields required';
            message.className = 'error';
          }
          return;
        }

        // escape form inputs to prevent HTML injections
        namePara.textContent = escapeHTML(nameValue);
        commentPara.textContent = escapeHTML(commentValue);

        list.appendChild(listItem);
        listItem.appendChild(namePara);
        listItem.appendChild(commentPara);

        if (message instanceof HTMLElement) {
          message.textContent = 'Comment posted!';
          message.className = 'success';
        }

        nameField.value = '';
        commentField.value = '';
      };
    };

    const escapeHTML = (str: string): string => {
      return str.replace(/[&<>"']/g, (char) => {
        const escapeChars: Record<'&' | '<' | '>' | '"' | "'", string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;',
        };
        return escapeChars[char as keyof typeof escapeChars];
      });
    };

    toggleComments();
    commentForm();
  }

  disconnectedCallback(): void {
    console.log('Custom element removed from page.');
  }

  adoptedCallback(): void {
    console.log('Custom element moved to new page.');
  }
}

customElements.define('comment-section', CommentsElement);

export { CommentsElement };
