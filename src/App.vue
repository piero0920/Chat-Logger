<template>
  <router-view/>
</template>
<style>
@font-face {
  font-family: 'chatFont';
  src: url('./assets/font.woff2') format('woff2');
}
html, body{
  font-family: chatFont;
  font-size:1.4rem;
  line-height: 2rem;
  color: whitesmoke;
  background-color: #121212;
  overflow-x: hidden;
}
.a {
  text-decoration: none;
}
.simplebar-scroll-content{
  width: 100%;
    
}
.message-container{
  padding-top: 5px; 
  padding-bottom: 5px; 
}
.message-container:hover{
  background-color: #212121;
}
.chat-line__message--badges{
  
  display: inline-flex;
}
.chat-line__username{
  font-weight: 600;
}
.badges{
  margin: 0px 0.3rem 0.2rem 0;
}
.badges img {
  vertical-align: middle;
}
.github{
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 40px;
}
.github img {
  width: 100%;
}
.totalMessages{
  position: fixed;
  top: 1em;
  right: 1em;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #212121; 
}
::-webkit-scrollbar-thumb {
  background: #121212;
}
::-webkit-scrollbar-thumb:hover {
  background: #616161; 
}

@media screen and (min-width: 1024px) {
  .chat-line__timestamp{
    font-weight: 600;
    font-size: 1rem;
    color: gray;
    font-variant-numeric: tabular-nums;
    vertical-align: middle

  }
  .chat-line__username , .colon, .message{
    vertical-align: middle;
  }
}

@media screen and (min-width: 950px) {
  .chat-line__timestamp{
    font-weight: 600;
    font-size: 1rem;
    color: gray;
    font-variant-numeric: tabular-nums;
    vertical-align: middle
  }
  .chat-line__username , .colon, .message{
    vertical-align: middle;
  }
}

@media screen and (max-width: 950px) {
  .chat-line__timestamp{
    font-weight: 600;
    font-size: 0.6em;
    color: gray;
    font-variant-numeric: tabular-nums;
    vertical-align: middle
  }
  .chat-line__username , .colon, .message{
    vertical-align: middle;
    font-size: 0.8em;
  }
  .badges img {
    width: 30px;
  }
}
@media screen and (max-width: 650px) { 
  .chat-line__timestamp{
    font-weight: 600;
    font-size: 0.5em;
    color: gray;
    font-variant-numeric: tabular-nums;
    vertical-align: middle
  }
  .chat-line__username , .colon, .message{
    vertical-align: middle;
    font-size: 0.6em;
  }
  .badges img {
    width: 30px;
  }
}
@media screen and (max-width: 450px) {
  .chat-line__timestamp{
    font-weight: 600;
    font-size: 0.4em;
    color: gray;
    font-variant-numeric: tabular-nums;
    vertical-align: middle
  }
  .chat-line__username , .colon, .message{
    vertical-align: middle;
    font-size: 0.5em;
  }
  .badges img {
    width: 25px;
  }
}
</style>