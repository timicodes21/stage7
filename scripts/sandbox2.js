
const blogContent = document.querySelector('.blog-content');

const post = JSON.parse(localStorage.getItem('post'));

let html = ``;

html = `
    <div class="">
        <h5 class="text-danger d-flex justify-content-end">${post.id}</h5>
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    </div>
`;

blogContent.innerHTML = html;




