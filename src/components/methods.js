async function fetchChatMessages(channel) {
    return fetch('https://api.kala-vods.com/v1/chat/'+channel)
    .then(res => res.json())
    .then((data) => {
      return data;
    })
    
}
async function fetchUserMessages(channel, user) {
    return fetch('https://api.kala-vods.com/v1/chat/'+channel+'/'+user)
    .then(res => res.json())
    .then((data) => {
     return data
    })
    
}

async function fetchChannelBadges(channel){
    return fetch('https://api.kala-vods.com/helix/channelbadges/'+channel)
    .then(res => res.json())
    .then((data) => {
      return data.data
    })
    
}
async function fetchGlobalBadges() {
    return fetch('https://api.kala-vods.com/helix/globalbadges')
    .then(res => res.json())
    .then((data) => {
        return data.data
    })
    
}

export { fetchChatMessages, fetchUserMessages, fetchChannelBadges, fetchGlobalBadges }
