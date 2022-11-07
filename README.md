# chat

## Documentation

#### https://chat.kala-vods.com/KalathrasLolweapon
>All chat history

#### https://chat.kala-vods.com/KalathrasLolweapon/ `<username>`
>Chat of specific user


## Project setup
```
npm install
```
Get your own Twitch [OAuth token](https://dev.twitch.tv/docs/api/get-started) and [Client ID](https://dev.twitch.tv/console).
Edit every documentes in [/src/views](https://github.com/piero0920/Chat-Logger/tree/main/src/views)
```
fetchTwitchData(){
    fetch('https://api.twitch.tv/helix/', {
         method: 'get',
         headers: new Headers({
            'Authorization': '<your-oauth-token>',
            'Client-ID': 'your-client-id'
         })
        })
        .then(res => res.json())
        .then((data) => {
          this.TwitchData = data.data;
        })
      }
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
