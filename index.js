const videoArea = document.getElementById('videos');
let output = '';

fetch(
  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&playlistId=UU3KBxlxgiGamyfXQAYW0rWA&key=AIzaSyDxPtjG8DZZf_NEKvHB8W1wR1H24YC0-sg'
)
  .then(res => res.json())
  .then(data => {
    const videos = data.items;
    output += '<div class="card-deck">';
    videos.forEach(video => {
      const title = video.snippet.title;
      const thumbnail = video.snippet.thumbnails.high.url;
      const description = video.snippet.description;
      const id = video.snippet.resourceId.videoId;
      output += `
      <iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/watch?v=${id}" frameborder="0"
    allowfullscreen>
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${thumbnail}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${truncateText(description, 100)}....</p>
            <a href="#" class="btn btn-primary btn-block">View More</a>
            <a href="https://www.youtube.com/watch?v=${id}" target='_blank' class="btn btn-block btn-dark">Watch</a>
          </div>
        </div>
`;
    });
    output += '</div>';
    videoArea.innerHTML = output;
  });

//Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);

  if (shortened === -1) {
    return text;
  }

  return text.substring(0, shortened);
}
