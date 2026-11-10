(() => {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const query = params.get('cosmotab_q') || hashParams.get('cosmotab_q');
  if (!query) return;

  params.delete('cosmotab_q');
  hashParams.delete('cosmotab_q');

  const search = params.toString();
  const hash = hashParams.toString();
  const cleanUrl =
    `${window.location.pathname}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;

  try {
    window.history.replaceState(null, '', cleanUrl);
  } catch {
     
  }

  let attempts = 0;
  let timer = 0;

  function isVisible(field) {
    const rect = field.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function setFieldValue(field, value) {
    if (field instanceof HTMLTextAreaElement) {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value'
      ).set;
      setter.call(field, value);
      field.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    }

    if (field instanceof HTMLInputElement) {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;
      setter.call(field, value);
      field.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    }

    if (field.isContentEditable) {
      field.focus();

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(field);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('insertText', false, value);
      field.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: value
      }));

      return true;
    }

    return false;
  }

  function findField() {
    const selectors = [
      '#prompt-textarea',
      'textarea',
      '.ql-editor[contenteditable="true"]',
      '[contenteditable="true"]'
    ];

    for (const selector of selectors) {
      for (const field of document.querySelectorAll(selector)) {
        if (field.disabled) continue;
        if (!isVisible(field)) continue;
        return field;
      }
    }

    return null;
  }

  function fill() {
    const field = findField();

    if (!field) {
      attempts += 1;
      if (attempts > 120) window.clearInterval(timer);
      return;
    }

    window.clearInterval(timer);
    setFieldValue(field, query);
    field.focus();
  }

  timer = window.setInterval(fill, 250);
  fill();
})();
