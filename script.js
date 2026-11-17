const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmarkLIst');
const boolmarkInputName = document.getElementById('Bookmark-Name');
const boolmarkInputURL = document.getElementById('Bookmark-URL');

let bookmarkStorg = JSON.parse(localStorage.getItem('bookmark')) || [];

addBookmarkBtn.addEventListener('click', function () {
  const Name = boolmarkInputName.value.trim();
  const URL = boolmarkInputURL.value;
  if (!Name || !URL) {
    return alert('please enter both name and url');
  } else {
    if (!URL.startsWith('http://') && !URL.startsWith('https://')) {
      alert('please enter a valid URL starting with http:// or https://');
      return;
    }
  }

  bookmarkStorg.push({
    id: Date.now(),
    Name,
    URL,
  });

  updetTransaxtionEl();
  boolmarkInputName.value = '';
  boolmarkInputURL.value = '';

  localStorage.setItem('bookmark', JSON.stringify(bookmarkStorg));
});

function updetTransaxtionEl() {
  bookmarkList.innerHTML = '';
  const setTrensactions = [...bookmarkStorg].reverse();
  setTrensactions.forEach((bookmarken) => {
    const bookmarkEl = craetElementLi(bookmarken);
    bookmarkList.appendChild(bookmarkEl);
  });
}

function craetElementLi(bookmarken) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.href = bookmarken.URL;
  link.textContent = bookmarken.Name;
  link.target = '_blank';
  span.textContent = 'Remove';

  span.addEventListener('click', () => deleteTransaction(bookmarken.id));

  li.appendChild(link);
  li.appendChild(span);

  return li;
}

function deleteTransaction(id) {
  bookmarkStorg = bookmarkStorg.filter((bokeark) => bokeark.id !== id);
  localStorage.setItem('bookmark', JSON.stringify(bookmarkStorg));
  updetTransaxtionEl();
}

updetTransaxtionEl();
