export default function songBlock({song}) {
    console.log(song);
    return `
    <div class="song">
        <div class="song__header">
            <div class="song__album">
            ${song.album ? `<img src=${song.album.cover_art_url} alt=""></img>` : '<img src="./src/images/non-cover.jpg" alt=""></img>'}
            </div>
            <div class="song__vinil">
                <img src="${song.header_image_thumbnail_url}" alt="">
            </div>
        </div>
        <div class="song-about">
            <div class="song-about__song-name">${song.title}</div>
            <div class="song-about__artist-name">${song.artist_names}</div>    
        </div>
    </div>
    `
}