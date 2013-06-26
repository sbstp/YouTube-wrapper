YouTube-wrapper
===============

A wrapper around the YouTube iframe API. Easily embed and control youtube players.

### Youtube

To create a youtube player, simply use the `Youtube(params)` function.
##params##  
* _el_: ID of the element where the youtube player will be embeded. (Required)
* _videoId_: A youtube video ID. (Optional),
* _width_: The player's width. (Optional),
* _height_: The player's height (Optional),
* _playerVars_: The Youtube player's [variables](https://developers.google.com/youtube/player_parameters). (Optional)
* _on_: An object with events attached to. (Optional)
    * _ready_ function called when the player is ready.