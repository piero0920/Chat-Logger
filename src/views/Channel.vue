<template>
  <div class="simplebar-scroll-content">
    <div class="simplebar-content" v-if="chatMessages.length">
      <div class="totalMessages" title="Total Messages">{{chatMessages.length}}</div>
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
          <span class="chat-line__username" :style="'color:' + chat.color + ';'">
            <span class="chat-author__display-name">{{ chat.name }}</span>
          </span>
          <span class="colon">&nbsp;:&nbsp;</span>
          <span class="message">
            <span class="text-fragment">{{ chat.message }}</span>
          </span>
        </div>
      </div>
      <div id="bottom"></div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
  <Github />
</template>
<script>
  import Github from '../components/Github.vue'
  import { fetchChatMessages, fetchChannelBadges, fetchGlobalBadges } from '../components/methods'
  export default {
    components: { Github },
    title () {
      return `${this.$route.params.channel}`
    },
    data() {
      return {
        chatMessages: [],
        channelBadges: [],
        globalBadges: [],
      }
    },
  methods: {
    dateConvert(date) {
      var time = new Date(date);
      return time.toISOString().substring(0, 19)
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
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$scrollTo('#bottom')
      })
    },
  },
  watch: {
    chatMessages(newchats, oldchats) {
      if(newchats) {
        this.$nextTick(() => {
          this.$scrollTo('#bottom')
        })
      }
    }
  },
  async mounted() {
    this.chatMessages = await fetchChatMessages(this.$route.params.channel)
    this.channelBadges = await fetchChannelBadges(this.$route.params.channel);
    this.globalBadges = await fetchGlobalBadges()
  },
}
</script>