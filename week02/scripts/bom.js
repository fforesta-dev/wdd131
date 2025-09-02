const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

function createListItem(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');

    li.textContent = text;
    delBtn.textContent = '❌';

    delBtn.setAttribute('aria-label', `Remove ${text}`);
    delBtn.title = `Remove ${text}`;

    delBtn.addEventListener('click', () => {
        li.remove();
        input.focus();
    });

    li.append(delBtn);
    return li;
}

button.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
        input.focus();
        return;
    }
    const li = createListItem(value);
    list.append(li);
    input.value = '';
    input.focus();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        button.click();
    }
});
