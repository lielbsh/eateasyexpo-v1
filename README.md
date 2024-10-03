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

Check out our beautiful photo gallery showcasing delicious recipes and grocery management tips! The gallery features a horizontal swipe functionality, allowing you to view 3-4 photos at a time. 

### Gallery Features

- **Swipe Through Images**: Easily navigate through the images by swiping left or right.
- **Dynamic Image Display**: The gallery displays 3-4 images simultaneously, providing an engaging visual experience.

### Example Code

Here's how you can implement the photo gallery in your app:

```html
<div class="gallery-container">
  <div class="gallery">
    <div class="gallery-item">
      <a href="link-to-photo1">
        <img src="path-to-photo1" alt="Description of photo 1" />
      </a>
    </div>
    <div class="gallery-item">
      <a href="link-to-photo2">
        <img src="path-to-photo2" alt="Description of photo 2" />
      </a>
    </div>
    <div class="gallery-item">
      <a href="link-to-photo3">
        <img src="path-to-photo3" alt="Description of photo 3" />
      </a>
    </div>
    <div class="gallery-item">
      <a href="link-to-photo4">
        <img src="path-to-photo4" alt="Description of photo 4" />
      </a>
    </div>
    <div class="gallery-item">
      <a href="link-to-photo5">
        <img src="path-to-photo5" alt="Description of photo 5" />
      </a>
    </div>
  </div>
  <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
  <button class="next" onclick="moveSlide(1)">&#10095;</button>
</div>

<style>
.gallery-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.gallery {
  display: flex;
  transition: transform 0.5s ease;
}

.gallery-item {
  min-width: 33.33%; /* Adjust this value for how many items to show */
  box-sizing: border-box;
}

.gallery-item img {
  width: 100%;
  border-radius: 10px; /* Optional: to add rounded corners */
}

button.prev, button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
}

button.prev {
  left: 10px;
}

button.next {
  right: 10px;
}
</style>

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

