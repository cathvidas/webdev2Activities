let tweetList = [
    {
        id: "tweet1",
        class: 'tweet',
        name: "cat with confusing auras <i class='fas fa-check-circle'></i>", username: "@cat_auras",
        userImg: "https://pbs.twimg.com/profile_images/1575486829356122115/K9zDF6YG_400x400.jpg",
        tweetText: "cats crew",
        tweetImg: "<img src='https://pbs.twimg.com/media/Fv066R3WwAAj4ZK?format=jpg&name=small'>",
        timeTweeted: "12h",
        reactions: { reply: 234345, retweet: 53284, quote: 345, like: 500, view: 2735456 },
        reacted: { retweeted: false, liked: true, replied: null },
        replies: []

    },
    {
        id: "tweet2",
        class: 'tweet',
        name: "internet hall of fame",
        username: "@InternetH0F ",
        userImg: "https://pbs.twimg.com/profile_images/1638827572938022914/eqB5CGBN_400x400.jpg",
        tweetText: "real.",
        tweetImg: "<img src='https://pbs.twimg.com/media/Fvy9TKFWAAAEkEk?format=png&name=small'>",
        timeTweeted: "12h",
        reactions: { reply: 234, retweet: 6456, quote: 345, like: 23, view: 487545 },
        reacted: { retweeted: true, liked: false, replied: null },
        replies: []
    },
    {
        id: "tweet3",
        class: 'tweet',
        name: "Elon Musk <i class='fas fa-check-circle'></i>",
        username: "@elonmusk",
        userImg: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
        tweetText: "Excited to announce that I’ve hired a new CEO for X/Twitter. She will be starting in ~6 weeks! <br><br>My role will transition to being exec chair & CTO, overseeing product, software & sysops.",
        tweetImg: "",
        timeTweeted: "11h",
        reactions: { reply: 75676, retweet: 456456, quote: 345, like: 23455, view: 4563 },
        reacted: { retweeted: true, liked: true, replied: null },
        replies: []
    }
]

let countTweet = tweetList.length;

let forms = document.querySelectorAll('form');
forms.forEach(element => {
    element.onsubmit = event => {
        event.preventDefault();
    }
})

let tweetTemplate = document.querySelector('.tweet-post.template');
let tweetTimeline = document.querySelector('.twt-tmln');
let imgPreview = document.querySelector('.img-prvw-cntnr')
let inputPost = document.querySelector('.input-p');
let count = tweetTimeline.children.length;

function displayPreTweeted() {
    tweetTimeline.innerHTML = '';
    for (let i = 0; i < tweetList.length; i++) {
        let tweet = tweetTemplate.cloneNode(true);
        tweet.setAttribute('id', tweetList[i].id);
        tweet.classList.add(tweetList[i].class);
        tweet.style.display = 'block'
        tweet.querySelector('.usr span.name').innerHTML = tweetList[i].name;
        tweet.querySelector('.ad span.username').innerHTML = tweetList[i].username;
        tweet.querySelector('.user-img img').src = tweetList[i].userImg
        tweet.querySelector('.ad span.time').innerHTML = tweetList[i].timeTweeted;
        tweet.querySelector('.post-content').innerHTML = tweetList[i].tweetText;
        tweet.querySelector('.img-prvw').innerHTML = tweetList[i].tweetImg;
        if (tweetList[i].tweetImg) {
            tweet.querySelector('.img-prvw').style.display = 'block';
        } else {
            tweet.querySelector('.img-prvw').style.display = 'none';
        }
        // reactions
        let reactions = tweet.querySelectorAll('.rct');
        reactions[0].querySelector('span').innerHTML = countReact(tweetList[i].reactions.reply);

        // retweet
        reactions[1].querySelector('span').innerHTML = countReact(tweetList[i].reactions.retweet + tweetList[i].reactions.quote);
        reactions[1].style.color = tweetList[i].reacted.retweet;
        let rt = tweet.querySelectorAll('.rt-opt span')[0];
        if (tweetList[i].reacted.retweeted == false) {
            reactions[1].style.color = '#657786';
            rt.innerHTML = 'Retweet';
        } else {
            reactions[1].style.color = 'rgb(0, 186, 124)'
            rt.innerHTML = 'Undo Retweet';
        }

        // like
        let lk = reactions[2].querySelectorAll('i')[0];
        reactions[2].querySelector('span').innerHTML = countReact(tweetList[i].reactions.like);
        if (tweetList[i].reacted.liked == false) {
            reactions[2].style.color = '#657786';
            lk.className = 'fa-regular fa-heart';
        } else {
            reactions[2].style.color = 'rgb(249, 24, 128)';
            lk.className = 'fa-solid fa-heart';
        }

        reactions[3].querySelector('span').innerHTML = countReact(tweetList[i].reactions.view);
        tweetTimeline.insertBefore(tweet, tweetTimeline.firstChild);

        if (tweetList[i].class == 'reply-me') {
            let showThread = tweet.querySelector('.sh-thr')
            showThread.style.display = 'block';
        }
        if (tweetList[i].class == 'reply-other') {
            tweet.querySelector('.rp-to').style.display = 'block'
            let username = tweetList[i].reacted.replied.querySelector('span.username').innerHTML;
            tweet.querySelector('span.to-name').innerHTML = username;
        }

    }
    react()
}

function displayTweetThread(tweet) {
    let parTweet = document.querySelector('.thread-pa');
    parTweet.innerHTML = '';
    let threadTemplate = document.querySelector('.thread.template').cloneNode(true);
    threadTemplate.style.display = 'block';
    parTweet.appendChild(threadTemplate);
    // thread form textarea
    threadTemplate.querySelector('.thread-form .a-click').onclick = (event) => {
        document.querySelector('.thread-form .rp-to').style.display = 'block';
        threadTemplate.querySelector('.thread-form .rp-to .to-name').innerHTML = document.querySelector('.thread-tweet .username').innerHTML;
        threadTemplate.querySelector('.thread-form .other-opt').style.display = 'flex';
        threadTemplate.querySelector('#reply-textarea').focus();
        threadTemplate.querySelector('.twt-btn.twt').style.display = 'none';
        event.target.style.display = 'none'
    }
    clickedThreadTweet(tweet, parTweet)
    let index = tweetList.findIndex(t => t.id == tweet.id);
    for (let i = 0; i < tweetList[index].replies.length; i++) {
        let repId = tweetList[index].replies[i];
        let reply = document.querySelector('#' + repId);
        reply.querySelector('.rp-to').style.display = 'none';
        reply.querySelector('.sh-thr').style.display = 'none';
        parTweet.appendChild(reply.cloneNode(true));
    }
    if (tweet.classList.contains('reply-me') || tweet.classList.contains('reply-other')) {
        iterateRepliesInThread(tweet, parTweet);
    }
    react()

}

function iterateRepliesInThread(tweet, parent) {
    let reply = tweet;
    while (reply.classList.contains('reply-me') || reply.classList.contains('reply-other')) {
        let index = tweetList.findIndex(t => t.id == reply.id);
        let repliedElementClone = tweetList[index].reacted.replied.cloneNode(true);
        repliedElementClone.querySelector('.rp-to').style.display = 'none';
        repliedElementClone.querySelector('.v-line').style.display = 'block';
        repliedElementClone.style.borderBottom = 'none';
        parent.insertBefore(repliedElementClone, parent.firstChild);
        reply = tweetList[index].reacted.replied;
    }
}

function clickedThreadTweet(tweet) {
    let index = tweetList.findIndex(t => t.id == tweet.id);
    let thrcontainer = document.querySelector('.thread-tweet');
    thrcontainer.querySelector('.user-img img').src = tweetList[index].userImg;
    thrcontainer.querySelector('span.name').innerHTML = tweetList[index].name;
    thrcontainer.querySelector('span.username').innerHTML = tweetList[index].username;
    thrcontainer.querySelector('.post-content').innerHTML = tweetList[index].tweetText;
    thrcontainer.querySelector('.img-prvw').innerHTML = tweetList[index].tweetImg;
    thrcontainer.querySelector('.img-prvw').style.display = 'block';
    let reacts = thrcontainer.querySelectorAll('.react-cnt .rct');
    reacts[0].querySelector('span.ctn').innerHTML = countReact(tweetList[index].reactions.retweet);
    reacts[1].querySelector('span.ctn').innerHTML = countReact(tweetList[index].reactions.quote);
    reacts[2].querySelector('span.ctn').innerHTML = countReact(tweetList[index].reactions.like);
}


displayPreTweeted();

// enable to imput for tweet
let showAud = document.querySelector('.a-click');
showAud.onclick = (event) => {
    document.querySelector('.sel-aud').style.display = 'block';
    document.querySelector('.audience').style.display = 'block';
    inputPost.focus();
    event.target.style.display = 'none'
}


function tweet(form, className, replied) {
    // replied  = element being replied 
    let mform = document.querySelector(`${form}`);
    let tweetCon = mform.querySelector('textarea');
    console.log(tweetCon.value)
    let imgInput = document.querySelector('.img-prvw-cntnr').innerHTML;
    let tweet = {
        id: className + (countTweet + 1),
        class: className, name: "Cath",
        username: "@cathvidas25_",
        userImg: "https://i.pinimg.com/originals/5a/e5/98/5ae598ff624217b9a5c008beb8c512d0.jpg",
        tweetText: tweetCon.value,
        tweetImg: imgInput,
        timeTweeted: "Now",
        reactions: { reply: 0, retweet: 0, quote: 0, like: 0, view: 0 },
        reacted: { retweeted: false, liked: false, replied: replied },
        replies: []
    }
    if (replied != null) {
        for (let i = 0; i < tweetList.length; i++) {
            if (tweetList[i].id == replied.id) {
                tweetList[i].replies.push(tweet.id)
            }
        }
    }
    tweetList.push(tweet);
    displayPreTweeted();

    showAud.style.display = 'block'
    inputPost.value = '';
    clearFileInput();
    imgPreview.style.height = 'auto';
    imgPreview.style.display = 'flex';
    imgPreview.innerHTML = '';
    document.querySelector('.audience').style.display = 'none';
    document.querySelector('.sel-aud').style.display = 'none';
    mform.querySelector('.on-input-show').style.display = 'none';
    document.querySelector('.tweet-hide').style.display = 'block';
    document.querySelector('.ad-files .opt-hide').style.display = 'none';
    tweetCon.style.height = 'auto';
    tweetCon.value = ''
    countTweet++;
    imgUpdate
}

let tweetInThread = null;

function isElementVisible(element) {
    const elementRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    elementRect.top = 0;
    alert(elementRect.top)

    return elementRect.top >= 0 && elementRect.top <= windowHeight;
}

// react on tweet
function react() {
    let tweets = document.querySelectorAll('.tweet-post');
    tweets.forEach(element => {
        let index = tweetList.findIndex(t => t.id == element.id);
        element.onclick = event => {
            if (event.target.closest('.rct') || event.target.closest('.rt')) { return; }
            displayTweetThread(element);
            tweetInThread = element;
            document.querySelector('.main-thread').style.display = 'block';
            document.querySelector('.main-home').style.display = 'none';

            let backHome = document.querySelector('.back-home');
            backHome.onclick = () => {
                document.querySelector('.main-thread').style.display = 'none';
                document.querySelector('.main-home').style.display = 'block';
                displayPreTweeted()
            }
        }
        let reacBtn = element.querySelectorAll('.rct');
        reacBtn.forEach(btn => {
            btn.onclick = () => {
                if (btn.id == 'r-rep') {
                    hideShow('show', '#p');
                    commentOnTweet(element.id);
                    document.querySelector('#reply-f button.tweet').onclick = () => {
                        tweetList[index].reactions.reply += 1;
                        if (element.querySelector('span.name').innerHTML == 'Cath') {
                            tweet('#reply-f', 'reply-me', element);
                        } else {
                            tweet('#reply-f', 'reply-other', element)
                        }
                        document.querySelector('.m-form textarea').value = '';
                        displayPreTweeted();
                        hideShow('hide', '#p');
                    }
                } else if (btn.id == 'r-rtwt') {
                    let rtModal = element.querySelector('.rt-modal');
                    rtModal.style.display = 'block';
                    let rtBtn = element.querySelectorAll('.rt-opt');
                    rtBtn.forEach(rtbtn => {
                        rtbtn.onclick = () => {
                            if (rtbtn.id == 'rt-rtwt') {
                                if (tweetList[index].reacted.retweeted == false) {
                                    tweetList[index].reactions.retweet += 1;
                                    tweetList[index].reacted.retweeted = true;
                                } else {
                                    tweetList[index].reactions.retweet -= 1;
                                    tweetList[index].reacted.retweeted = false;
                                }
                                rtModal.style.display = 'none';
                            } else if (rtbtn.id == 'qt-rtwt') {
                                tweetList[index].reactions.quote += 1;
                                alert('on process')
                            }
                            displayPreTweeted();
                            displayTweetThread(tweetInThread);
                        }
                    })
                } else if (btn.id == 'r-like') {
                    if (tweetList[index].reacted.liked == false) {
                        tweetList[index].reactions.like += 1;
                        tweetList[index].reacted.liked = true;
                    } else {
                        tweetList[index].reactions.like -= 1;
                        tweetList[index].reacted.liked = false;
                    }
                    displayPreTweeted();
                    displayTweetThread(tweetInThread)
                } else if (btn.id == 'r-view') {
                    alert('view')
                }
            }
        })
    })
}



function countReact(int) {
    let whole = int
    let cExtra = 0;
    let v = '';
    if (int >= 1000) {
        if (int >= 1000 && int < 1000000) {
            whole = Math.floor(int / 1000);
            cExtra = int % 1000;
            v = 'K'
        } else if (int >= 1000000) {
            whole = Math.floor(int / 1000000);
            cExtra = int % 1000000;
            v = 'M'
        }
        return whole + '.' + cExtra.toString()[0] + v;
    } else {
        return whole;
    }
}

// replying on tweet
let modal = document.querySelector('.modals');
function commentOnTweet(id) {
    let mainImg = modal.querySelector('.user-img img');
    let mainInfo = modal.querySelector('.user-head');
    let mainTweet = modal.querySelector('.dis-p');

    let tweet = document.getElementById(id);
    let userImg = tweet.querySelector('.user-img img').src;
    let userInfo = tweet.querySelector('.user-head .usr');
    let userTweet = tweet.querySelector('p.post-content');
    mainImg.src = userImg;
    mainInfo.innerHTML = userInfo.innerHTML;
    mainTweet.innerHTML = userTweet.innerHTML;
    modal.querySelector('.rp-usr').innerHTML = userInfo.querySelector('.ad .username').innerHTML
}

// image preview
function imgUpdate() {
    const children = imgPreview.children;
    const childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (childCount > 0) {
            document.querySelector('.ad-files .opt-hide').style.display = 'none';
            document.querySelector('.on-input-show').style.display = 'flex';
            document.querySelector('.tweet-hide').style.display = 'none';
            if (childCount == 1) {
                imgPreview.style.borderRadius = '15px'
                children[i].style.width = '100%';
                children[i].style.padding = '0';
            }
            if (childCount == 2) {
                children[i].style.padding = '5px';
                children[i].style.width = '50%';
                children[i].style.height = '300px';
                document.querySelector('.ad-files .opt-hide').style.display = 'block';
            }
        }
        else {
            document.querySelector('.on-input-show').style.display = 'none';
        }
    }
}

// select audience
let selectAud = document.querySelector('.audience');
selectAud.onclick = () => {
    document.querySelector('.c-aud').style.display = 'block';
    let ch = document.querySelectorAll('.ch');
    ch.forEach(element => {
        let field = selectAud.querySelector('span');
        element.onclick = () => {
            let desc = document.querySelector('.sel-aud');
            if (element.id == 'aud-e') {
                field.innerHTML = 'Everyone';
                selectAud.style.color = '#1DA1F2'
                selectAud.style.borderColor = '#AAB8C2';
                document.querySelector('#aud-e span.chck').style.display = 'block';
                document.querySelector('#aud-t span.chck').style.display = 'none';
                desc.innerHTML = '<i class="fa fa-globe"></i> <span class="desc">Everyone can reply</span>';
            }
            if (element.id == 'aud-t') {
                field.innerHTML = 'Twitter Circle';
                selectAud.style.color = 'rgb(0, 186, 124)';
                selectAud.style.borderColor = 'rgb(0, 186, 124)';
                document.querySelector('#aud-e span.chck').style.display = 'none';
                document.querySelector('#aud-t span.chck').style.display = 'block';
                desc.innerHTML = '<i class="fas fa-lock"></i> <span class="desc">Only your Twitter Circle can reply</span><div class="des-hide"></div>';
            }
            hideShow('hide', '.c-aud');

        }
    })
}



// image preview (tweet)
document.querySelector('#fileInput').oninput = event => {
    const file = event.target.files[0];
    if (file) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        imgPreview.appendChild(img)
        imgUpdate()
        clearFileInput();
    }
}

// on input tweet
let tweetForm = document.querySelectorAll('.twt-f')
tweetForm.forEach(element => {
    let textarea = element.querySelector('textarea');
    let progress = element.querySelector(".progress-bar");
    textarea.oninput = () => {
        let h = element.querySelector('.on-input-show');
        let twtBtn = element.querySelector('.tweet-hide');
        const inputValue = textarea.value.trim();
        if (inputValue.length > 0) {
            h.style.display = 'flex'
            twtBtn.style.display = 'none';
        } else {
            h.style.display = 'none'
            twtBtn.style.display = 'block'
        }
        const inputLength = textarea.value.length;
        const progressDegrees = (inputLength / 280 * 100) + "%";
        progress.style.background = `radial-gradient(closest-side, rgb(255, 255, 255) 79%, transparent 80% 60%), conic-gradient(#1DA1F2 ${progressDegrees}, #E1E8ED 0)`;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
})


function clearFileInput() {
    document.getElementById('fileInput').value = '';
}

function hideShow(param, element) {
    const body = document.querySelector('body');
    let state = document.querySelector(`${element}`).style;
    if (param == 'show') {
        state.display = 'block';
        body.style.overflow = 'hidden';
    }
    else if (param = 'hide') {
        state.display = 'none';
        body.style.overflow = 'auto';
    }
}

document.querySelector('.nav-bar button.tweet').onclick = () => {
    hideShow('show', '#modal');
    document.querySelector('#modal .m-post').style.display = 'none';
    document.querySelector('#tweet-f').onsubmit = event => {
        event.preventDefault()
        tweet('#tweet-f', 'tweet', null);
        hideShow('hide', '#modal')
    }
}

document.querySelector('.add-twt-btn').onclick = () => {
    hideShow('show', '#modal');
    let modal = document.querySelector('#modal')
    let h = document.createElement('div');
    h.classList.add('tweet-hide')
    let userImg = 'https://i.pinimg.com/originals/5a/e5/98/5ae598ff624217b9a5c008beb8c512d0.jpg';
    modal.querySelector('.m-post .user-img img').src = userImg;
    let rgt = modal.querySelector('.m-post .rgt-sec');
    rgt.classList.add('flex-l')
    rgt.innerHTML = '<span>' + inputPost.value + '</span>';
    modal.querySelector('.m-post').appendChild(h)
    modal.querySelector('button').onclick = () => {
        tweet('#post-form', 'tweet', null);
        tweet('#tweet-f', 'tweet', null)
        hideShow('hide', '#modal')

    }
}

function showMessage() {
    let mesCon = document.querySelector('.mess-cont');
    if(mesCon.style.display == 'none') {
        mesCon.style.display = 'flex';
    } else {
        mesCon.style.display = 'none';
    }
}