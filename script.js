"use strict";
let inputVal = document.querySelector(".input");
let xato = document.querySelector(".xato");
let renderFunc = function (data) {
  let html = ` <div class="repo">
<div class="name__repo">
<a class="reposi" target="_blank" href="${data.html_url}">
${data.name} </a></div>
<div class="buttons">
  <div class="button repo__button">Starts: ${data.stargazers_count}</div>
  <div class="button repo__button">Watcher: ${data.watchers}</div>
  <div class="button repo__button">Forks: ${data.forks}</div>
</div>
</div>`;
  document
    .querySelector(".repolar__uchun")
    .insertAdjacentHTML("afterbegin", html);
};

let inputQiymat = function () {
  if (inputVal.value) {
    fetch(`https://api.github.com/users/${inputVal.value}`)
      .then(
        function (response) {
          if (!response.ok) {
            throw new Error("Foydalanuvchi topilmadi");
          }
          return response.json();
        },
        function (error) {
          if (!response.ok && error) {
            throw new Error("Foydalanuvchi topilmadi");
          }
        }
      )
      .then(function (res) {
        document.querySelector(".magicGithub").style.display = "none";
        document.querySelector(".rezult").style.display = "block";
        document.querySelector(".user__img").src = `${res.avatar_url}`;
        document.querySelector(
          ".button1"
        ).textContent = `Public Repos: ${res.public_repos}`;
        document.querySelector(
          ".button2"
        ).textContent = `Public Gists: ${res.public_gists}`;
        document.querySelector(
          ".button3"
        ).textContent = `Followers: ${res.followers}`;
        document.querySelector(
          ".button4"
        ).textContent = `Following: ${res.following}`;
        document.querySelector(
          ".bosqich1"
        ).textContent = `Company: ${res.company}`;
        document.querySelector(
          ".bosqich2"
        ).textContent = `WebSite/Blog: ${res.blog}`;
        document.querySelector(
          ".bosqich3"
        ).textContent = `Location: ${res.location}`;
        document.querySelector(
          ".bosqich4"
        ).textContent = `Member Since: ${res.updated_at}`;
        document.querySelector(".profile").href = `${res.html_url}`;
        document.querySelector(".xato").style.display = "none";
        if (res.repos_url) {
          fetch(res.repos_url)
            .then(function (response1) {
              return response1.json();
            })
            .then(function (res1) {
              document.querySelector(".repolar__uchun").innerHTML = "";
              res1.forEach(function (val) {
                renderFunc(val);
              });
            });
        }
      })
      .catch(function (error) {
        if (error) {
          document.querySelector(".rezult").style.display = "none";
          document.querySelector(".xato").textContent = error;
          document.querySelector(".xato").style.display = "block";
        } else {
          document.querySelector(".rezult").style.display = "block";
          document.querySelector(".xato").style.display = "none";
        }
      });
  } else {
    document.querySelector(".xato").style.display = "none";
  }
};
