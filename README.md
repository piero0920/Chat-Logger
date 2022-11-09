## Documentation

#### https://chat.kala-vods.com/KalathrasLolweapon
>All chat history (Since November 7, 2022)

#### https://chat.kala-vods.com/KalathrasLolweapon/user/ `<username>`
>Chat of specific user


## Project setup
```
npm install
```
Get your own Twitch [OAuth token](https://dev.twitch.tv/docs/api/get-started) and [Client ID](https://dev.twitch.tv/console).

Edit [methods.js](https://github.com/piero0920/Chat-Logger/tree/main/src/components/methods.js)

```javascript
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
        return data.data;
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
