// comments.js

const toggleComments = (): void => {
  // Show/hide comments toggle
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
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
  // Comment form stuff
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');
  const message = document.querySelector('#submitMessage');

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

    if (!(nameValue ?? '') || !(commentValue ?? '')) {
      if (message) {
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

    if (message) {
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

export { toggleComments, commentForm };
