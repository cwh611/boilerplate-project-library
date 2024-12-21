const resultsElement = document.getElementById("results");

document.getElementById("view-library-btn").addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://chunk-library-905782540339.herokuapp.com/api/books")
    .then(response => response.json())
    .then(data => {
      resultsElement.innerText = data;
      console.log(data)
    })
    .catch(err => {
      console.log(err);
      alert(`Request error: ${err}`);
    })
});

const addTitleInput = document.getElementById("add-title-input");
const addAuthorInput = document.getElementById("get-author-input");
const addGenreInput = document.getElementById("add-genre-input");
const addYearPublishedInput = document.getElementById("get-year-published-input");

document.getElementById("add-book-btn").addEventListener("click", (event) => {
  const title = addTitleInput.value ? addTitleInput.value : "";
  const author = addAuthorInput.value ? addAuthorInput.value : "";
  const genre = addGenreInput.value ? addGenreInput.value : "";
  const publishedYear = addYearPublishedInput.value ? addYearPublishedInput.value : "";
  event.preventDefault();
  fetch("https://chunk-library-905782540339.herokuapp.com/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      title,
      author,
      genre,
      publishedYear
    }
  })
    .then(response => response.json())
    .then(data => {
      resultsElement.innerText = data;
    })
    .catch(err => {
      console.log(err);
      alert(`Request error: ${err}`);
    })
});

document.getElementById("delete-book-btn").addEventListener("click", (event) => {
  const deleteBookId = document.getElementById("delete-book-input").value;
  fetch(`https://chunk-library-905782540339.herokuapp.com/api/books/${deleteBookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: `delete request: book ${deleteBookId}`
  })
    .then(response => response.json())
    .then(data => {
      resultsElement.innerText = data;
    })
    .catch(err => {
      console.log(err);
      alert(`Request error: ${err}`);
    })
});

document.getElementById("delete-library-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const confirm = confirm("Are you sure you want to delete the library? This cannot be undone.");
  if (confirm) {
    fetch("https://chunk-library-905782540339.herokuapp.com/api/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: "delete request: library"
    })
      .catch(err => {
        console.log(err);
        alert(`Request error: ${err}`);
      })
  } else return;
});

document.getElementById("add-comment-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const selectedBook = document.getElementById("select-book").value;
  const comment = document.getElementById("input-comment").value;
  fetch(`https://chunk-library-905782540339.herokuapp.com/api/books/${selectedBook}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {comment}
  })
    .then(response => response.json())
    .then(data => {
      resultsElement.innerText = data;
    })
    .catch(err => {
      console.log(err);
      alert(`Request error: ${err}`);
    })
});

document.getElementById("find-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const _id = document.getElementById("find-_id-input").value;
  fetch(`https://chunk-library-905782540339.herokuapp.com/api/books/${_id}`)
    .then(response => response.json())
    .then(data => {
      resultsElement.innerText = data;
    })
    .catch(err => {
      console.log(err);
      alert(`Request error: ${err}`);
    })
})