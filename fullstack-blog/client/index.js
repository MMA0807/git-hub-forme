
const card = post => {
    return `
    <div class="card z-depth-4">
        <div class="card-content">
            <span class="card-title">${post.title}</span>
            <p style="white-space: pre-line;">${post.text}</p>
            <small>${new Date(post.date).toLocaleDateString()}</small>
        </div>
        <div class="card-action">
            <button data-target="updateForm" class="btn modal-trigger btn-small blue js-update" 
            data-id="${post._id}" data-title="${post.title}" data-text="${post.text}">
                <i class="material-icons">create</i>
            </button>
            <button class="btn btn-small red js-remove" data-id="${post._id}">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>
    `
  }
  
  
  let posts = []
  let modal, elems
  const BASE_URL = '/api/post'
  
  
  class PostApi {
    static fetch() {
      return fetch(BASE_URL, {method: 'get'}).then(res => res.json())
    }
  
    static create(post) {
      return fetch(BASE_URL, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    }
    
    static update(id, post) {
      return fetch(`${BASE_URL}/${id}`, {
        method: 'put',
        body: JSON.stringify(post),
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
      }).then(res => res.json())
    }

    static remove(id) {
      return fetch(`${BASE_URL}/${id}`, {
        method: 'delete'
      }).then(res => res.json())
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
      posts = backendPosts.concat()
      renderPosts(posts)
    })
    
    elems = M.Modal.init(document.querySelector('#updateForm'))
    modal = M.Modal.init(document.querySelector('#createForm'))
    document.querySelector('#createPost').addEventListener('click', onCreatePost) 
    document.querySelector('#updatePost').addEventListener('click', onUpdatePost)
    document.querySelector('#posts').addEventListener('click', onEditePost)
    document.querySelector('#posts').addEventListener('click', onDeletePost)
  })
  
  function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts')
  
    if (_posts.length > 0) {
      $posts.innerHTML = _posts.map(post => card(post)).join(' ')
    } else {
      $posts.innerHTML = `<div class="center">Постов пока нет</div>`
    }
  }
  
  
  function onCreatePost() {
    const $title = document.querySelector('#title')
    const $text = document.querySelector('#text')
  
    if ($title.value && $text.value) {
      const newPost = {
        title: $title.value,
        text: $text.value
      }
      PostApi.create(newPost).then(post => {
        posts.push(post)
        renderPosts(posts)
      })
      modal.close()
      $title.value = ''
      $text.value = ''
      M.updateTextFields()
    }
  }
  
  function onDeletePost(event) {
    if (event.target.classList.contains('js-remove') || event.target.parentNode.classList.contains('js-remove')) {
      const decision = confirm('Вы уверены, что хотите удалить пост?')
  
      if (decision) {
        const id = event.target.getAttribute('data-id') || event.target.parentNode.getAttribute('data-id')
  
         PostApi.remove(id).then(() => {
           const postIndex = posts.findIndex(post => post._id === id)
           posts.splice(postIndex, 1)
           renderPosts(posts)
         })
      }
    } 
  }

function onEditePost(event) {
    if (event.target.classList.contains('js-update') || event.target.parentNode.classList.contains('js-update')) {
      
      const title = document.querySelector('#title1') 
      const text = document.querySelector('#text1') 
      const id = event.target.getAttribute('data-id') || event.target.parentNode.getAttribute('data-id')

        const titles = event.target.getAttribute('data-title') || event.target.parentNode.getAttribute('data-title');
        const texts = event.target.getAttribute('data-text') || event.target.parentNode.getAttribute('data-text');

        title.value = titles
        text.value = texts
      console.log(id)
      console.log('ururu')
      return(id)
  }
}

    function onUpdatePost() {
        console.log('obnov')
        const $title1 = document.querySelector('#title1') 
        const $text1 = document.querySelector('#text1')
        const id = '5c6ee0349ccec207b0d8630b';
        
        if ($title1.value && $text1.value) {
          const newPost = {
            title: $title1.value,
            text: $text1.value
          }
          PostApi.update(id, newPost).then(post => {
            // const postIndex = posts.findIndex(post => post._id === id)
            post = newPost
            renderPosts(posts)
           
          })
          modal.close()
          $title1.value = ''
          $text1.value = ''
          M.updateTextFields()
         
    }
  }
