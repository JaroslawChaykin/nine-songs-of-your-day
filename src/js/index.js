import FetchService from "./API/fetchService.js";
import songBlock from "./template/songBlock.js";
import getDay from './utils/getDay.js'
import getRandomNum from './utils/getRandomNum.js'

let btn = document.querySelector('.button')
let welcomeWrapper = document.querySelector('.welcome')
let rootSongs = document.querySelector('.songs')
let mainText = document.querySelector('.welcome__text')
const songsFrom = JSON.parse(localStorage.getItem('songs'))

if(getDay(Date.now()) <= getDay(songsFrom?.date)) {
  btn.remove()
  mainText.innerText = 'Твой плейлист на этот день уже сформирован'
} else {
  mainText.innerText = `Каждый день тебя будет ждать 9 песен, которые ты возможно уже слышал, а может и нет, но каждый раз это будут максимально разные песни. Определят ли они твоё настроение на день?`
}

let objectToLocalStorage = {
  date: Date.now(),
  songs: []
}

btn.addEventListener('click', () => {
  new Promise((res, rej) => {
    welcomeWrapper.classList.add('removing')
    setTimeout(() => {
      rootSongs.style.paddingBottom = '50px'
      welcomeWrapper.remove()
      getManySongs()
    }, 1000)
  })
})

async function getSong(id) {
  const {response} = await FetchService.getSong(id)
  objectToLocalStorage.songs.push(response)
  localStorage.setItem('songs', JSON.stringify(objectToLocalStorage))
  rootSongs.insertAdjacentHTML('afterbegin', songBlock(response))
}

function getManySongs() {
  for(let i = 0; i < 9; i++) {
    getSong(getRandomNum(100000))
  }
}