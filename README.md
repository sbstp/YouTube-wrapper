YouTube-wrapper
===============

A wrapper around the YouTube iframe API. Easily embed and control youtube players.  
Flash is probably required for most browsers. I am not sure if the iframe api supports HTML 5.

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

**new Playlist(boolean loop[, array items])**  
Create a new playlist.
```
var p = new Playlist(true);
```

**Playlist.add(arguments)**  
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

**Playlist.forEach(function callback[, object scope])**
Loop through the items in the array  
```
p.forEach(function (item, position) {
    console.log(position + ' -> ' + item);
});
```

**Playlist.loop([boolean loop])**  
If no argument is passed, return if the playlist is looping or not.  
If an argument is passed, changed wether or not the playlist is looping.
```
p.loop(false);
p.loop();
// -> false
```

**Playlist.shuffle()**  
Shuffle the elements in the list.
```
p.shuffle();
```

**Playlist.copy()**  
```
p.copy();
// -> Playlist object
```

### License
```
The MIT License (MIT)

Copyright (c) <2013> <Simon Bernier St-Pierre <sbernierstpierre@gmail.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```