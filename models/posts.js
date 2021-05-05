module.exports = {


    posts: [],

    getAll(){

        return this.posts

    },

    newPost(title, description){

        this.posts.push({id: generateID(), title, description})

    },

    deletePost(id){
        const post = this.posts
        for(let i = 0; i < post.length; i++){
            if(post[i].id == id){
                post.splice(i, 1)
            }
        }
            
    }


}



function generateID(){
    return Math.random().toString(36).substr(2, 9)
}

