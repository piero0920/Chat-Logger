async function fetchChatMessages(channel) {
    return fetch('https://api.kala-vods.com/chat/'+channel)
    .then(res => res.json())
    .then((data) => {
      return data;
    })
    
}
async function fetchUserMessages(channel, user) {
    return fetch('https://api.kala-vods.com/chat/'+channel+'/'+user)
    .then(res => res.json())
    .then((data) => {
     return data
    })
    
}

async function fetchChannelBadges(channel){
    let b_id = '184325380';
    if(channel.toLowerCase() == 'kalathraslolweapon'){b_id = '184325380';}
    if(channel.toLowerCase() == 'endnatsu'){b_id = '78550124';}
    if(channel.toLowerCase() == 'piero_fn'){b_id = '229919501';}
    return fetch('https://api.twitch.tv/helix/chat/badges?broadcaster_id='+b_id, {
      method: 'get',
      headers: new Headers({
        'Authorization': process.env.VUE_APP_OAUTH,
        'Client-ID': process.env.VUE_APP_CLIENTID
      })
    })
    .then(res => res.json())
    .then((data) => {
      return data.data
    })
    
}
async function fetchGlobalBadges() {
    return fetch('https://api.twitch.tv/helix/chat/badges/global', {
      method: 'get',
      headers: new Headers({
        'Authorization': process.env.VUE_APP_OAUTH,
        'Client-ID': process.env.VUE_APP_CLIENTID
      })
    })
    .then(res => res.json())
    .then((data) => {
        return data.data
    })
    
}

export { fetchChatMessages, fetchUserMessages, fetchChannelBadges, fetchGlobalBadges }
