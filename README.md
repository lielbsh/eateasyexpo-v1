# 🍽️ EatEasy - Recipe Finder and Grocery Tracker- Frontend (2024)

Welcome to **EatEasy**, a full-stack application designed to help users discover new recipes while efficiently managing their groceries at home and creating a shopping list! This project showcases a seamless user experience powered by **React Native Expo** for the front end and **Node.js** for the back end, featuring secure sign-in/sign-up functionalities with bcrypt and web scraping using Puppeteer.

---

## 🚀 Features

- 🍲 **Recipe Discovery**: Explore a wide variety of delicious recipes.
- 🛒 **Grocery Management**: Keep track of your groceries at home and manage your shopping list effortlessly.
- 🔒 **User Authentication**: Enjoy secure sign-in and sign-up processes using bcrypt for password hashing.
- 🕸️ **Web Scraping**: Utilize Puppeteer to fetch the latest recipes from various sources, ensuring a rich database of culinary ideas.

---

## ⚙️ Technologies Used (Frontend)

&emsp;
<a href="https://reactnative.dev/" target="_blank">
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-%2320232a.svg?style=for-the-badge&logo=reactnative&logoColor=61DAFB">
</a>
&emsp;
<a href="https://docs.expo.dev/" target="_blank">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-1B1F29.svg?style=for-the-badge&logo=expo&logoColor=white">
</a>

---
## ⚙️ Technologies Used (Backend)

&emsp;
<a href="https://nodejs.org/" target="_blank">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white">
</a>
&emsp;
<a href="https://www.npmjs.com/package/bcrypt" target="_blank">
  <img alt="bcrypt" src="https://img.shields.io/badge/bcrypt-%23333333.svg?style=for-the-badge&logo=security&logoColor=white">
</a>
&emsp;
<a href="https://pptr.dev/" target="_blank">
  <img alt="Puppeteer" src="https://img.shields.io/badge/Puppeteer-%23333.svg?style=for-the-badge&logo=puppeteer&logoColor=white">
</a>

---

## 🌐 Live Demo

Check out the live demo of EatEasy [**here**](https://your-demo-link-here.com).

---

## 🙋‍♂️ Let's Connect

<p align="center">
  <a href="mailto:your-email@example.com">
    <img src="https://img.icons8.com/bubbles/50/000000/gmail.png" alt="Gmail"/>
  </a>
  <a href="https://github.com/your-github-username">
    <img src="https://img.icons8.com/bubbles/50/000000/github.png" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/your-linkedin-username/">
    <img src="https://img.icons8.com/bubbles/50/000000/linkedin.png" alt="LinkedIn"/>
  </a>
</p>

<hr/> 


## 🖼️ Photo Gallery

Check out our beautiful photo gallery showcasing delicious recipes and grocery management tips! 


<div class="gallery-container" style="position: relative; width: 100%; overflow: hidden;">
  <div class="gallery" style="display: flex; transition: transform 0.5s ease;">
    <div class="gallery-item" style="min-width: 33.33%; box-sizing: border-box;">
      <a href="link-to-photo1">
        <img src="https://via.placeholder.com/300x200?text=Recipe+1" alt="Delicious Recipe 1" style="width: 100%; border-radius: 10px;" />
      </a>
    </div>
    <div class="gallery-item" style="min-width: 33.33%; box-sizing: border-box;">
      <a href="link-to-photo2">
        <img src="https://via.placeholder.com/300x200?text=Recipe+2" alt="Delicious Recipe 2" style="width: 100%; border-radius: 10px;" />
      </a>
    </div>
    <div class="gallery-item" style="min-width: 33.33%; box-sizing: border-box;">
      <a href="link-to-photo3">
        <img src="https://via.placeholder.com/300x200?text=Recipe+3" alt="Delicious Recipe 3" style="width: 100%; border-radius: 10px;" />
      </a>
    </div>
    <div class="gallery-item" style="min-width: 33.33%; box-sizing: border-box;">
      <a href="link-to-photo4">
        <img src="https://via.placeholder.com/300x200?text=Recipe+4" alt="Delicious Recipe 4" style="width: 100%; border-radius: 10px;" />
      </a>
    </div>
    <div class="gallery-item" style="min-width: 33.33%; box-sizing: border-box;">
      <a href="link-to-photo5">
        <img src="https://via.placeholder.com/300x200?text=Recipe+5" alt="Delicious Recipe 5" style="width: 100%; border-radius: 10px;" />
      </a>
    </div>
  </div>
  <button class="prev" onclick="moveSlide(-1)" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background-color: rgba(255, 255, 255, 0.7); border: none; cursor: pointer; padding: 10px; border-radius: 5px;">&#10094;</button>
  <button class="next" onclick="moveSlide(1)" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background-color: rgba(255, 255, 255, 0.7); border: none; cursor: pointer; padding: 10px; border-radius: 5px;">&#10095;</button>
</div>

<script>
let currentIndex = 0;

function moveSlide(direction) {
  const gallery = document.querySelector('.gallery');
  const totalItems = document.querySelectorAll('.gallery-item').length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1; // Loop to the last item
  } else if (currentIndex >= totalItems) {
    currentIndex = 0; // Loop to the first item
  }

  const itemWidth = document.querySelector('.gallery-item').clientWidth;
  gallery.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
}
</script>

