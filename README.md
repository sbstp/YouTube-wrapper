YouTube-wrapper
===============

A wrapper around the YouTube iframe API. Easily embed and control youtube players.

### Youtube

To create a youtube player, simply use the `Youtube(params)` function.

**params**

* `el`: ID of the element where the youtube player will be embeded. (Required)
* `videoId`: A youtube video ID. (Optional),
* `width`: The player's width. (Optional),
* `height`: The player's height (Optional),
* `playerVars`: The Youtube player's variables. ([More](https://developers.google.com/youtube/player_parameters)) (Optional)
* `on`: An object with events attached to. (Optional)
    * `ready(player)` function called when the player is ready. (Optional)
    * `stateChange(player)` function called when the player's state changed. ([More](https://developers.google.com/youtube/iframe_api_reference#onStateChange)) (Optional)
    * `playing(player)` function called when the player starts playing. (Optional)
    * `paused(player)` function called when the player is paused. (Optional)
    * `ended(player)` function called when the video ended. (Optional)
    * `buffering(player)` function called when the player is buffering. (Optional)
    * `cued(player)`

**Example:**
```javascript
Youtube({
    el: 'player',
    playerVars: {
        cc_load_policy: 0,
        color: 'red',
        fs: 0,
        iv_load_policy: 3,
        loop: 0,
        origin: 'http://example.com',
        rel: 0,
        showinfo: 0,
        suggestedQuality: 'hd720',
        theme: 'light'
    },
    on: {
        ready: function (player) {
            console.log('ready');
        },
        playing: function (player) {
            console.log('playing');
        },
        paused: function () {
            console.log('paused');
        },
        ended: function () {
            console.log('ended');
        }
    }
});
```

### Playlist

Playlist is a class to easily manage playlist: next, previous, seek, shuffle, loop, ...

**new Playlist(boolean loop, array items)**
Create a new playlist.
```
var p = new Playlist(true);
```

**Playlist.add(mixed ...)**
Add an item to the playlist.  
You may pass as many arguments as you wish.
```
p.add('a', 'b', 'c');
```

**Playlist.next()**
Get the next item in the playlist.
```
p.next();
// -> a
```

**Playlist.prev()**
Get the prrevious item in the playlist.
```
p.prev();
// -> c
```

**Playlist.pos()**
Get the current position in the playlist.
```
p.pos();
// -> 2
```

**Playlist.seek(int pos)**
Seek to the position in the playlist.
```
p.seek(1);
```