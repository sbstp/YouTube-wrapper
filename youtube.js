/*
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
*/

(function () {
    "use strict";
    //==========================================================================
    // Youtube
    //==========================================================================
    var scriptIncluded = false,
        apiReady = false,
        apiReadyFn = [];
    
    /**
     * @param {object} params Player parameters.
     *	el {string} required. ID of the element containing the player.
     *	videoId {string} optional,
     *	width {number} optional,
     *	height {number} optional,
     *	playerVars {object} optional (https://developers.google.com/youtube/player_parameters),
     *	on {object} optoinal,
     *		ready {function} optional,
     *		stateChange {function} optional,
     *		playing {function} optional,
     *		paused {function} optional,
     *		ended {function} optinal,
     *		buffering {function} optional,
     *		cued: {function} optional
     *	@return {void} Returns nothing. If you want the player handle, get it from the on.ready function.
     */
    var Youtube = function (params) {
        if (!scriptIncluded) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            scriptIncluded = true;
        }
        
        var player;
        params.on = params.on || {};
        
        function apiReadyCallback () {
            player = new YT.Player(params.el, {
                videoId: params.videoId,
                width: params.width,
                height: params.height,
                playerVars: params.playerVars,
                events: {
                    onReady: function () {
                        if (params.on === undefined) return;
                        if (params.on.ready) params.on.ready(player);
                    },
                    onStateChange: function (e) {
                        if (params.on === undefined) return;
                        if (params.on.stateChange) params.on.stateChange(player, e.data);
                        switch (e.data) {
                            case YT.PlayerState.PLAYING:
                                if (params.on.playing) params.on.playing(player);
                                break;
                            case YT.PlayerState.PAUSED:
                                if (params.on.paused) params.on.paused(player);
                                break;
                            case YT.PlayerState.ENDED:
                                if (params.on.ended) params.on.ended(player);
                                break;
                            case YT.PlayerState.BUFFERING:
                                if (params.on.buffering) params.on.buffering(player);
                                break;
                            case YT.PlayerState.CUED:
                                if (params.on.cued) params.on.cued(player);
                                break;
                        }
                    }
                }
            });
        };
        
        if (!apiReady) {
            apiReadyFn.push(apiReadyCallback);
        } else {
            apiReadyCallback();
        }
    };
    
    // when youtube script is done loading
    window.onYouTubeIframeAPIReady = function () {
        apiReady = true;
        for (var i = 0; i < apiReadyFn.length; i++) {
            if (apiReadyFn[i]) apiReadyFn[i]();
        }
    };
    
    // expose
    window.Youtube = Youtube;
    
    // mhm
})();
