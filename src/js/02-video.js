
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const THROTTLE_DELAY = 1000;

const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, THROTTLE_DELAY);

const getSavedTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  return savedTime ? parseFloat(savedTime) : 0;
};

player.setCurrentTime(getSavedTime());

player.on('timeupdate', ({ seconds }) => {
  saveCurrentTime(seconds);
});
