const videoArea = document.getElementById('videos');
let output = '';

fetch(
  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&playlistId=UU3KBxlxgiGamyfXQAYW0rWA&maxResults=25&key=AIzaSyDxPtjG8DZZf_NEKvHB8W1wR1H24YC0-sg'
)
  .then(res => res.json())
  .then(data => {
    const videos = data.items;
    output += '<div class="row">';
    videos.forEach(video => {
      const title = video.snippet.title;
      const thumbnail = video.snippet.thumbnails.high.url;
      const description = video.snippet.description;
      const id = video.snippet.resourceId.videoId;
      output += `
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
          <div class="video-thumb">
              <img class="card-img-top" src="${thumbnail}" alt="Card image cap">
            <div class="overlay" data-id="${id}">
              <div class="play-icon"><i class="far fa-play-circle fa-7x"></i></div>
            </div>
          </div>
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${truncateText(description, 100)}....</p>
            </div>
          </div>
        </div>
`;
    });
    output += '</div>';
    videoArea.innerHTML = output;
  })
  .then(data => {
    const watchBtns = document.querySelectorAll('.overlay');
    watchBtns.forEach(btn =>
      btn.addEventListener('click', e => {
        let overlay = '';
        if (e.target.tagName === 'path') {
          overlay = e.target.parentElement.parentElement.parentElement;
        } else if (e.target.tagName === 'svg') {
          overlay = e.target.parentElement.parentElement;
        } else if (e.target.tagName === 'DIV') {
          overlay = e.target;
        }

        const id = overlay.dataset.id;
        player.loadVideoById(id, 0, 'large');
        e.preventDefault();
      })
    );
  });

//Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);

  if (shortened === -1) {
    return text;
  }

  return text.substring(0, shortened);
}

{
  /* <iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/watch?v=${id}" frameborder="0" */
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'pddRsFlyCfU',
    autoplay: false,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  player.stopVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
  }
}
function stopVideo() {
  player.stopVideo();
}
