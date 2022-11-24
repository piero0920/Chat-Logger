<template>
  <div id="aaa">
    <div class="simplebar-scroll-content">
      <InfiniteLoading @infinite="load" :top="true" :no-more="false"/>
      <div class="totalMessages" title="Total Messages">{{abbrNum(chatMessages.length)}}/{{ abbrNum(total) }}</div>   
        <div class="message-container" v-for="chat in chatMessages" :key="chat._id">
          <div class="chat-line__message">
            <span class="chat-line__timestamp">{{ dateConvert(chat.createdAt) }}&nbsp;</span>
            <span class="chat-line__message--badges" v-for="badge in chat.badges">
              <div class="badges" v-if="badge && globalFind(badge)">
               <img :src="globalFind(badge)" alt="">
              </div>
              <div class="badges" v-if="badge.subscriber">
               <img :src="subBadge(badge)" alt="">
              </div>
              <div class="badges" v-if="badge.bits">
               <img :src="bitBadge(badge)" alt="">
              </div>
              <div class="badges" v-if="badge && globalFind2(badge)">
               <img :src="globalFind2(badge)" alt="">
              </div>
            </span>
            <router-link class="a" target="_blank" :to="{ name: 'user', params: { channel: $route.params.channel, user: chat.name } }">
            <span class="chat-line__username" :style="'color:' + chat.color + ';'">
                <span class="chat-author__display-name">{{ chat.name }}</span>
              </span>
            </router-link>
            <span class="colon">&nbsp;:&nbsp;</span>
            <span class="message">
              <span class="text-fragment" v-html="msgCovert(chat.message, chat.emotes)"></span>
            </span>
          </div>
        </div>
           
    </div>
    <Github />
  </div>
  </template>
  <script>
    import Github from '../components/Github.vue'
    import InfiniteLoading from "v3-infinite-loading";
    import "v3-infinite-loading/lib/style.css";
    import { parse } from 'simple-tmi-emotes'
    import * as linkify from "linkifyjs";
    import linkifyHtml from "linkify-html";

    import { fetchChatMessages, fetchChannelBadges, fetchGlobalBadges } from '../components/methods'
    export default {
      components: { Github, InfiniteLoading },
      title () {
        return `${this.$route.params.channel}`
      },
      data() {
        return {
          chatMessages: [],
          channelBadges: [],
          globalBadges: [],
          page: 1,
          total: 0,
        }
      },
    methods: {
      async load($state){
        console.log("loading...");

        try {
        const response = await fetch(
            "https://api.kala-vods.com/chat/"+ this.$route.params.channel +"?page=" + this.page
        );
        const json = await response.json();
          this.total = json.total
        if (json.data.length < 100) {
          this.chatMessages.unshift(...json.data)
          $state.complete()
        }
        else {
          if(json.data.length >= 0){
            this.chatMessages.unshift(...json.data);
            this.chatMessages.sort(function(a, b) {
              var keyA = new Date(a.createdAt),
                keyB = new Date(b.createdAt);
              // Compare the 2 dates
              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
              return 0;
            })
            $state.loaded();
          }
            
        }
        this.page++;
        } catch (error) {
          $state.error();
        }
      },
      msgCovert(msg, emotes){
        if(emotes){
          var optionsEmotes = {
            format: 'default',
            themeMode: 'dark',
            scale: '2.0'
          };
          const html = parse(msg, emotes[0], optionsEmotes)
          var optionsLink = {
            target: '_blank',
          }
          return linkifyHtml(html, optionsLink)
        }
        var optionsLink = {
          target: '_blank',
        }
        return linkifyHtml(msg, optionsLink)
      },
      dateConvert(date) {
        var time = new Date(date);
        return time.toISOString().substring(0, 19)
      },
      abbrNum(number) {
        var decPlaces = 2;
        var abbrev = [ "k", "m", "b", "t" ];

        for (var i=abbrev.length-1; i>=0; i--) {
          var size = Math.pow(10,(i+1)*3);

          if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if((number == 1000) && (i < abbrev.length - 1)) {
              number = 1;
              i++;
            }
            number += abbrev[i];
            break;
          }
        }
        return number;
      },
      subBadge(ids) {
        const ChannelBadge = new Object(this.channelBadges[1])
        const ChannelBadge_url = ChannelBadge.versions || [];
        const subBadge = ChannelBadge_url.find(item => item.id == ids.subscriber);
        if (subBadge) {
          return subBadge.image_url_2x || []
        }
        return
      },
      bitBadge(ids) {
        const ChannelBadge = new Object(this.channelBadges[0])
        const ChannelBadge_url = ChannelBadge.versions || [];
        const bitsBadge = ChannelBadge_url.find(item => item.id == ids.bits);
        if (bitsBadge) {
          return bitsBadge.image_url_2x || []
        }
        return
      },
      cleanBadges(ids) {
        const removeBits = Object.keys(ids).filter(key => key !== 'bits').reduce((obj, key) => {
          obj[key] = ids[key];
          return obj;
        }, {});
        const removeSub = Object.keys(removeBits).filter(key => key !== 'subscriber').reduce((obj, key) => {
          obj[key] = ids[key];
          return obj;
        }, {});
        return Object.keys(removeSub)
      },
      globalFind(ids) {
        const found = this.cleanBadges(ids);
        const gf = new Object(this.globalBadges.find(obj => { return obj.set_id == found[0] }))
        const gf1 = new Object(gf.versions)
        const gf2 = new Object(gf1[0])
        return gf2.image_url_2x;
      },
      globalFind2(ids) {
        const found = this.cleanBadges(ids);
        const gf = new Object(this.globalBadges.find(obj => { return obj.set_id == found[1] }))
        const gf1 = new Object(gf.versions)
        const gf2 = new Object(gf1[0])
        return gf2.image_url_2x;
      }
    },
    watch: {
      chatMessages(newchats, oldchats) {
        if(newchats) {
          
        }
      }
    },
    async mounted() {
      //this.chatMessages = await fetchChatMessages('piero_fn')
      this.channelBadges = await fetchChannelBadges(this.$route.params.channel);
      this.globalBadges = await fetchGlobalBadges()
      //this.api()
    },
  }
</script>