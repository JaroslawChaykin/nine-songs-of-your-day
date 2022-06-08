import FetchService from "./API/fetchService.js";
import songBlock from "./template/songBlock.js";
import getDay from './utils/getDay.js'
import getRandomNum from './utils/getRandomNum.js'
import localization from './localization/localization.js'

let btn = document.querySelector('.button')
let welcomeWrapper = document.querySelector('.welcome')
let rootSongs = document.querySelector('.songs')
let mainText = document.querySelector('.welcome__text')
let mainTitle = document.querySelector('.title')
let selectLocalization = document.querySelector('#localization')
const songsFrom = JSON.parse(localStorage.getItem('songs'))

localizationPage()

selectLocalization.addEventListener('change', (e) => {
  localStorage.setItem('local', e.target.value)
  localizationPage()
});

function localizationPage() {
  const curentLocal = localStorage.getItem('local') || 'ru'
  mainTitle.innerText = localization[curentLocal].title
  selectLocalization.value = curentLocal
  if(getDay(Date.now()) <= getDay(songsFrom?.date)) {
    btn.remove()
    mainText.innerText = localization[curentLocal].subtitleFormed
  } else {
    mainText.innerText = localization[curentLocal].subtitle
  }

  btn.innerText = localization[curentLocal].button
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