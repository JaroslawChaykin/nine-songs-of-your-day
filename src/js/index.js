import FetchService from "./API/fetchService.js";
import songBlock from "./template/songBlock.js";

let btn = document.querySelector('.button')
let welcomeWrapper = document.querySelector('.welcome')

let rootSongs = document.querySelector('.songs')

btn.addEventListener('click', () => {
  new Promise((res, rej) => {
    welcomeWrapper.classList.add('removing')
    setTimeout(() => {
      welcomeWrapper.remove()
      getMoreSongs()
    }, 1000)
  })
})

async function getSong(id) {
  const {response} = await FetchService.getSongs(id)
  rootSongs.insertAdjacentHTML('afterbegin', songBlock(response))
}

function getMoreSongs() {
  for(let i = 0; i < 9; i++) {
    let random = Math.floor(Math.random() * 100000)
    getSong(random)
  }
}
