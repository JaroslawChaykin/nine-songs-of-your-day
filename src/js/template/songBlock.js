export default function songBlock({song}) {
    return `
    <div class="song">
        <div class="song__header">
            <div class="song__album">
            ${song.album ? `<img src=${song.album.cover_art_url} alt=""></img>` : '<img src="./src/images/non-cover.jpg" alt=""></img>'}
            </div>
            <div class="song__vinil">
                <img src="${song.primary_artist.image_url}" alt="">
            </div>
        </div>
        <div class="song-about">
            <div class="song-about__song-name">${song.title}</div>
            <div class="song-about__artist-name">${song.artist_names}</div>    
        </div>
    </div>
    `
}