let timelinePost = document.getElementById('timeline-post');
let postTemplate = document.getElementById('post-template');
let commentTemplate = document.querySelector('#comment-template');
let forms = document.querySelectorAll('form');
let action = document.querySelectorAll('.posts');
let postCount = 0;
let activePost;
function update(post) {
    let reactSection = post.getElementsByClassName('action-btn')[0];
    let btn = reactSection.querySelectorAll('button');
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(){
            if (i == 0) {
                if (btn[0].style.color != 'blue') {
                    btn[0].style.color = "blue";
                } else {
                    btn[0].style.color = "#65676b";
                }
            }
            if (i == 1) {
                showHideModal('modal-com')
                displayAllComment(post.id);
                activePost = post.id;
            }
            if (i == 2) {
                alert('You just shared the post!')
                displayPost('share', post.id)
            }
        })
    }
    // to view all comments
    let view = post.querySelector('.view-com');
    view.addEventListener('click', function(){
        showHideModal('modal-com')
        displayAllComment(post.id);
    })

    let commentInput = post.querySelector('.com-form');
    commentInput.addEventListener('submit', function(event) {
        postComment('post', post.id);
        event.preventDefault()
    })

    let hidebtn = post.querySelector('p.x-btn');
    hidebtn.addEventListener('click', function() {
        post.style.display = 'none';
    })
}

let comOnModal = document.querySelector('#modal-com-form');
comOnModal.addEventListener('submit', function(){
    postComment('modal', activePost);
    displayAllComment(activePost);
})

function displayAllComment(id) {
    let post = document.getElementById(id);
    let comField = document.querySelector('.com-post');
    comField.innerHTML = post.innerHTML;
    comField.setAttribute('id','com-' + id);
    comField.querySelector('.view-com').style.display = 'none';

    // remove comment form
    let comSect = comField.querySelector('#com-sect');
    let comForm = comField.querySelector('.com-form');
    comSect.removeChild(comForm);

    countComments('show', id)
}

function postComment(element, id) {
    let commentOnPost = document.querySelector('#'+ id + ' .com-input');
    let commentOnModal = document.querySelector('#modal-com .com-input');

    let comField = document.querySelector('#' + id + ' .all-com');
    let newCom = document.createElement('div');
    newCom.className = 'com-list flex'
    newCom.innerHTML = commentTemplate.innerHTML;
    comField.appendChild(newCom);
    let displayCom = newCom.querySelector('.com-txt');
    if(element == 'modal'){
        displayCom.innerHTML = commentOnModal.value;
        commentOnModal.value = ''
    }
    
    else if(element == 'post'){
        displayCom.innerHTML = commentOnPost.value;
        commentOnPost.value = ''
    }
    countComments('hide', id)
}

function countComments(showHide, id){
    let comment = document.querySelectorAll('#' + id + ' .com-list');
    if(comment.length > 3) {
        for(let i = 0; i < comment.length; i++) {
            if (showHide == 'hide' && i >= 3) {
                comment[i-3].style.display = 'none'
            }
            if(showHide == 'show'){
                let commentOnModal = document.getElementById('com-'+id);
                comment = commentOnModal.querySelectorAll('.com-list');
                comment[i].style.display = 'flex'
            }
        }
        let view = document.querySelector('#' + id + ' .view-com');
        view.style.display = 'block';
    }
}

function displayPost(postOrShare, id){
    let postHolder = document.createElement('div');
    postHolder.className = 'cont-body posts';
    postHolder.setAttribute('id', 'post'+(postCount+1));
    postHolder.innerHTML = postTemplate.innerHTML;
    timelinePost.insertBefore(postHolder, timelinePost.firstChild);
    if(postOrShare == 'post') {
        let textArea = document.getElementById('post-content');
        let textContent = textArea.value;
        postHolder.querySelector('.post-display-content').innerHTML = textContent;
    
        let imgPreview = postHolder.querySelector('.img-preview');
        let mediaContent = document.getElementById('media');
        let file = mediaContent.files[0];
        if (file) {
            imgPreview.src =  URL.createObjectURL(file);
        }
    
        clearFileInput();
        textArea.value = '';
        showHideModal('media-div');
        showHideModal('modal-post');
    }
    if(postOrShare == 'share') {
        let post = document.getElementById(id);
        let sharedPost = post.querySelector('.share');

        let shared = postHolder.querySelector('.display-post');
        shared.classList.add('shared')
        let link = document.createElement('a');
        link.href = '#' + id;
        shared.appendChild(link)
        link.innerHTML = sharedPost.innerHTML;
    }
    update(postHolder)
    postCount++;
}



function clearFileInput(){
    document.getElementById('media').value = '';
}

forms.forEach(element => {
    element.addEventListener('submit', function(event) {
        event.preventDefault();
    })
});

function showHideModal(id) {
    let body = document.querySelector('body');
    let state = document.getElementById(id).style;
    if (state.display == 'none') {
        state.display = 'flex';
        body.style.overflow = 'hidden';
    } else {
        state.display = 'none';
        body.style.overflow = 'auto';
    }
}

update(document.getElementById('post'+0));