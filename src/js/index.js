import FetchService from "./API/fetchService.js";
import songBlock from "./template/songBlock.js";
import getDay from './utils/getDay.js'
import getRandomNum from './utils/getRandomNum.js'
import localization from './localization/localization.js'
import resetDay from './utils/resetDay.js'

const btn = document.querySelector('.button')
const welcomeWrapper = document.querySelector('.welcome')
const rootSongs = document.querySelector('.songs')
const mainText = document.querySelector('.welcome__text')
const mainTitle = document.querySelector('.title')
const listSongs = document.querySelector('.welcome__playlist')
const selectLocalization = document.querySelector('#localization')
const faqInformation = document.querySelector('.faq__information')
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
  btn.innerText = localization[curentLocal].button
  faqInformation.innerText = localization[curentLocal].faqInformation
  if(getDay(resetDay(Date.now())) <= getDay(songsFrom?.date)) {
    btn.remove()
    mainText.innerText = localization[curentLocal].subtitleFormed

    if(!listSongs.innerHTML) {
      songsFrom.songs.forEach((song) => {
        if(!song) return
        listSongs.insertAdjacentHTML('afterbegin', songBlock(song))
      })
    }

  } else {
    mainText.innerText = localization[curentLocal].subtitle
  }
}

let objectToLocalStorage = {
  date: Date.now(),
  songs: []
}

btn.addEventListener('click', () => {
  welcomeWrapper.classList.add('removing')
    setTimeout(() => {
      rootSongs.style.paddingBottom = '50px'
      welcomeWrapper.remove()
      getManySongs()
    }, 1000)
})

async function getSong(id) {
  try {
    const {response} = await FetchService.getSong(id)
    objectToLocalStorage.songs.push(response)
    localStorage.setItem('songs', JSON.stringify(objectToLocalStorage))
    rootSongs.insertAdjacentHTML('afterbegin', songBlock(response))
  } catch(e) {
      console.log(e);
  }
}

function getManySongs() {
  for(let i = 0; i < 9; i++) {
    getSong(getRandomNum(100000))
  }
}