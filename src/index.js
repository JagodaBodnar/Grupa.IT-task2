let movies = []

const generateTable = () => {
    if (localStorage.getItem("movies")) {
        const getMovies = JSON.parse(localStorage.getItem("movies"))
        movies = [...getMovies]
    }
    if (movies.length === 0) {
        document.getElementById("table").classList.add("hide")
        document.getElementById("info").classList.add("show")
    }
    const body = document.getElementById("table_body")
    movies.forEach(item => body.appendChild(document.createElement("tr")).innerHTML =
        `<tr>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.priority}</td>
            <td>${item.category}</td>
        </tr>`
    )
}
generateTable()

const validationHandler = (e) => {
    e.preventDefault();
    const titleValue = document.getElementById("book_title").value
    const titleError = document.getElementById("book_title_error");
    const authorValue = document.getElementById("author").value;
    const authorError = document.getElementById("author_error");
    const priorityValue = document.getElementById("priority").value;
    const priorityError = document.getElementById("priority_error");
    const categoryValue = document.getElementById("category").value;

    titleValue.trim() === "" ? titleError.innerHTML = "Title must be at least 1 character long" : titleError.innerHTML = "";
    (authorValue.trim() === "" || authorValue.length < 3) ? authorError.innerHTML = "Author must be at least 3 characters long" : authorError.innerHTML = "";
    (priorityValue.trim() === "" || +priorityValue < 1 || +priorityValue> 5) ? priorityError.innerHTML = "Priority value must be in range 1-5" : priorityError.innerHTML = "";
    if (titleValue.trim() === "" || (authorValue.trim() === "" || authorValue.length < 3) || (priorityValue.trim() === "" || +priorityValue < 1 || +priorityValue > 5)) {
        return;
    }

    const newBook = {
        title: titleValue,
        author: authorValue,
        priority: priorityValue,
        category: categoryValue,
    }
    addNewBook(newBook)
    movies = [...movies, newBook]
    localStorage.setItem("movies", JSON.stringify(movies))
    clearInputs()
}

const clearInputs = (e) => {
    e.preventDefault()
    document.querySelectorAll("input").forEach(item => item.value = "")
    document.querySelectorAll(".error").forEach(item => item.innerHTML = "")
}
const addNewBook = ({title, author, priority, category}) => {
    const body = document.getElementById("table_body")
    const newBookElement = document.createElement("tr");
    newBookElement.innerHTML =
        `<td>${title}</td>
         <td>${author}</td>
         <td>${priority}</td>
         <td>${category}</td>`
    document.getElementById("info").classList.remove("show")
    document.getElementById("table").classList.remove("hide")
    body.appendChild(newBookElement)
}

document.getElementById("cancel_button").addEventListener("click", clearInputs)
document.getElementById("submit_button").addEventListener("click", validationHandler)

