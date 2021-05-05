/* Var */
const form = document.querySelector('.form')
const titlePost = document.querySelector("#titlePosts")



/* New Post-it */
function openClosePostit(){
    form.classList.toggle("active")
    let formItems = document.querySelectorAll('.formItems')
    formItems.forEach(e => {
        e.value = ''
    }) 
}

/* Integração Back-end */

document.addEventListener('DOMContentLoaded', () => {
    updatePost();
})

function updatePost(){

    fetch("http://192.168.0.113:3000/api/all").then(res => {
        return res.json();
    }).then(json => {
        
        let postElements = '';
        let posts = JSON.parse(json);

        posts.forEach((post) => {
            let postElement = `
            <div id=${post.id} class="card" draggable="true">
                <button class="trashbtn" onclick="trashbtn(this)"></button>
                <div class="card-header">
                    <h5 class="card-title">${post.title}</h5>
                </div>
                <div class="card-body">
                    <div class="card-text">${post.description}</div>
                </div>
            </div>
            `
            postElements += postElement;
        })

        document.getElementById('posts').innerHTML = postElements
    })

}

function newpost(){
    
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    let post = {title, description};

    const options = {
        method: "POST",
        headers: new Headers({'content-type':'application/json'}),
        body: JSON.stringify(post)
    }


    fetch("http://192.168.0.113:3000/api/new", options).then(res=>{
        console.log(res)
    })

    openClosePostit()
    updatePost()


}


function trashbtn(e){
    
    let pai = e.parentNode.id
    
    let del = {id: pai}
    const options = {
        method: "DELETE",
        headers: new Headers({'content-type':'application/json'}),
        body: JSON.stringify(del)
    }


    fetch("http://192.168.0.113:3000/api/del", options).then(res=>{
        console.log(res)
    })
    updatePost()

}