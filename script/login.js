'use strict';

const show = document.getElementById('register');
const hide = document.getElementById('back');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
console.log('start');

show.addEventListener('click', function (e) {
  console.log('hello');
  e.preventDefault();
  overlay.classList.toggle('hidden');
  modal.classList.toggle('hidden');
});

hide.addEventListener('click', function (e) {
  e.preventDefault();
  overlay.classList.toggle('hidden');
  modal.classList.toggle('hidden');
});
