<template>
    <div class="simplebar-scroll-content">
          <div class="simplebar-content" v-if="chat.length">
              <div class="message-container" v-for="message in chat" :key="message._id">
                  <div class="chat-line__message">
                      <span class="chat-line__timestamp">{{ dateConvert(message.date) }}&nbsp;</span>
                      <span class="chat-line__message--badges" v-for="badge in message.badges">
                        <div class="badges" v-if="badge && globalFind(badge)">
                          <span class="badge"><img :src="globalFind(badge)" alt=""></span>
                        </div>
                        <div class="badges" v-if="badge.subscriber && subBadge(badge.subscriber)">
                          <span class="badge"><img :src="subBadge(badge.subscriber)" alt=""></span>
                        </div>
                        <div class="badges" v-if="badge.bits && bitBadge(badge.bits)">
                          <span class="badge"><img :src="bitBadge(badge.bits)" alt=""></span>
                        </div>
                        <div class="badges" v-if="badge && globalFind2(badge)">
                          <span class="badge"><img :src="globalFind2(badge)" alt=""></span>
                        </div>
                      </span>
                      <span class="chat-line__username" :style="'color:'+ message.color + ';'">
                          <span class="chat-author__display-name">{{ message.name}}</span>
                      </span>
                      <span >&nbsp;:&nbsp;</span>
                      <span class="message">
                          <span class="text-fragment">{{ message.message }}</span>
                      </span>
                  </div>  
              </div><div id="bottom"></div>          
          </div>
          <div v-else>
            Loading...
          </div>
      </div>
      <a class="github" href="https://github.com" target="_blank"><img src="https://i.imgur.com/uwMrD5Z.png" alt=""></a>
  </template>
  
  <script>
  export default {
    data(){
      return{
        chat: [],
        emotes: [],
        global: [],
        global_2: [],
        global_emotes: [],
      }
    },
    methods:{
      fetchChat(){      
        fetch('https://api.kala-vods.com/chat/Endnatsu')
        .then(res => res.json())
        .then((data) => {
          const dataChats = [];
          for(var key in data){
            dataChats.push({
              id: data[key]._id,
              name: data[key].name,
              color: data[key].color,
              badges: data[key].badges,
              emotes: data[key].emotes,
              message: data[key].message,
              date: data[key].createdAt,
            })
          }
          this.chat = [... this.chat, ... dataChats]
          this.global_2 = [... this.global_2, ... dataChats]
        })
      },
      fetchGlobal(){
        let fetchGlobal = 'https://api.twitch.tv/helix/chat/badges/global';
        
        fetch(fetchGlobal, {
          method: 'get',
          headers: new Headers({
            'Authorization': '<your-oauth-token>',
            'Client-ID': 'your-client-id'
          })
        })
        .then(res => res.json())
        .then((data) => {
          
          this.global = data.data;
        })
      },
      fetchEmotes(){
        let fetchEmotes = 'https://api.twitch.tv/helix/chat/badges?broadcaster_id=78550124';
        
        fetch(fetchEmotes, {
          method: 'get',
          headers: new Headers({
            'Authorization': '<your-oauth-token>',
            'Client-ID': 'your-client-id'
          })
        })
        .then(res => res.json())
        .then((data) => {
          
          this.emotes = data.data;
        })
      },
      fetchGlobalEmotes(){
        let fetchGlobalEmotes = 'https://api.twitch.tv/helix/chat/emotes/global';
        
        fetch(fetchGlobalEmotes, {
          method: 'get',
          headers: new Headers({
            'Authorization': '<your-oauth-token>',
            'Client-ID': 'your-client-id'
          })
        })
        .then(res => res.json())
        .then((data) => {
          this.global_emotes = data.data;
        })
      },
      dateConvert(date){
        var time = new Date(date);
        return time.toISOString().substring(0,19)
  
      },
      subBadge(ids){
        const findBadge = this.emotes[1].versions.find(obj => {return obj.id == ids})
        return findBadge.image_url_2x;
      },
      bitBadge(ids){
        const findBadge = this.emotes[0].versions.find(obj => {return obj.id == ids})
        return findBadge.image_url_2x;
      },
      globalFind(ids){
        const new_ids0 = Object.keys(ids).filter(key =>
            key !== 'bits').reduce((obj, key) =>
            {
                obj[key] = ids[key];
                return obj;
            }, {}
        );
  
        const new_ids1 = Object.keys(new_ids0).filter(key =>
            key !== 'subscriber').reduce((obj, key) =>
            {
                obj[key] = ids[key];
                return obj;
            }, {}
        );
        const global = Object.keys(new_ids1)
        const found = global;
        const gf = new Object(this.global.find(obj => {return obj.set_id == found[0]}))
        const gf1 = new Object(gf.versions)
        const gf2 = new Object(gf1[0])
        return gf2.image_url_2x;
      },
      globalFind2(ids){
        const new_ids0 = Object.keys(ids).filter(key =>
            key !== 'bits').reduce((obj, key) =>
            {
                obj[key] = ids[key];
                return obj;
            }, {}
        );
  
        const new_ids1 = Object.keys(new_ids0).filter(key =>
            key !== 'subscriber').reduce((obj, key) =>
            {
                obj[key] = ids[key];
                return obj;
            }, {}
        );
        const global = Object.keys(new_ids1)
        const found = global;
        const gf = new Object(this.global.find(obj => {return obj.set_id == found[1]}))
        const gf1 = new Object(gf.versions)
        const gf2 = new Object(gf1[0])
        return gf2.image_url_2x;
      },
      scrollToBottom () {
        this.$nextTick(() => {
          this.$scrollTo('#bottom')
        })
    },
    },
    watch:{
      chat(newchats, oldchats){
        if(newchats){
          this.scrollToBottom()
        }
      }
    },
    mounted(){
      this.fetchChat()
      this.fetchEmotes()
      this.fetchGlobal()
      this.fetchGlobalEmotes()
  
    },
    
  }
  </script>
  <style>
  @font-face {
    font-family: 'chatFont';
    src: url('../assets/font.woff2') format('woff2');
  }
  html, body{
      font-family: chatFont;
      font-size:1.4rem;
      line-height: 2rem;
      color: whitesmoke;
      background-color: #121212;
  }
  .simplebar-scroll-content{
      padding-right: 17px; 
      margin-bottom: -34px;
  }
  .simplebar-content{
      padding-bottom: 17px; 
      margin-right: -17px;
  }
  .chat-line__timestamp{
    font-weight: 600;
      font-size: 1rem;
      color: gray;
      font-variant-numeric: tabular-nums;
  
  }
  .message-container{
    padding-top: 5px; 
    padding-bottom: 5px; 
  }
  .message-container:hover{
    background-color: #212121;
  }
  .chat-line__username{
    font-weight: 600;
  }
  .badges{
    display: inherit;
  }
  .badge{
    margin: 0px 0.3rem 0.2rem 0;
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
  </style>