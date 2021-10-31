let postTitle = document.querySelector('#post-title');
let postBody = document.querySelector('#post-body');
let postForm = document.querySelector('form');
let card = document.querySelector('.card');
let userPost = [];
let goto = document.querySelector('div');

postForm.addEventListener('submit', e => {
    e.preventDefault();
    createPost();
})


function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let postLayout = document.querySelector('#post-layout');
            userPost = data;
            let html = ``
            userPost.forEach((post, index) => {
                html += `
                    <div class="col-md-4">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-warning rounded" onClick="updatePost(${post.id})">Update</button>
                        </div> 
                        <a href="html/blog.html" class="goto" id="${post.id}">
                            <div class="card mb-4 shadow-sm" id="${post.id}">
                                <div class="card-body text-dark" id="${post.id}">
                                    <h6 class="post-title mb-2 d-flex justify-content-end text-danger">${post.id}</h6>
                                    <h5 class="post-title mb-4 my-post-title" >${post.title}</h5>
                                    <p class="post-body my-post-body" >${post.body}</p>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-danger rounded">Delete</button>
                                    </div>  
                                                                    
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                postLayout.innerHTML = html;
                goto = document.querySelector('a');
            })
            localStorage.setItem('userPosts', JSON.stringify(userPost));
        })

}

getPosts();




const createPost = () => {
    let pTitle = postTitle.value;
    let pBody = postBody.value;
    console.log(pTitle, pBody)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: pTitle,
            body: pBody,
            userId: 5
        }),
        headers: {
            'content-type' : 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('POST', data)
        alert('post created');
        userPost.push(data);
        console.log(userPost)
        let postLayout = document.querySelector('#post-layout');
        let html = ``
            userPost.forEach(post => {
                html += `
                    <div class="col-md-4">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-warning rounded" onClick="updatePost(${post.id})">Update</button>
                        </div> 
                        <a href="html/blog.html" class="goto" id="${post.id}">
                            <div class="card mb-4 shadow-sm" id="${post.id}">
                                <div class="card-body text-dark" id="${post.id}">
                                    <h6 class="post-title mb-2 d-flex justify-content-end text-danger">${post.id}</h6>
                                    <h5 class="post-title mb-4 my-post-title" >${post.title}</h5>
                                    <p class="post-body my-post-body" >${post.body}</p>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-danger rounded">Delete</button>
                                    </div>                                  
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                postLayout.innerHTML = html;
            })
    })

}

const updatePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: 'food',
            body: 'I am really hungry right now',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let myPostTitle = document.querySelectorAll('.my-post-title');
            let myPostBody = document.querySelectorAll('.my-post-body')

            myPostTitle.forEach((title, index) => {
                if(index + 1 === id){
                    title.textContent = data.title;
                }
            });

            myPostBody.forEach((body, index) => {
                if(index + 1 === id){
                    body.textContent = data.body;
                }
            });

        })
        .catch(err => console.log(err));
}



goto.addEventListener('click', (e) => {
    let userPosts = JSON.parse(localStorage.getItem('userPosts'));
    console.log(userPosts);
    let index = e.target.parentNode.id - 1;
    let post = {
        id: userPosts[index].id,
        title: userPosts[index].title,
        body: userPosts[index].body
    };
    
    localStorage.setItem('post', JSON.stringify(post));
});

















