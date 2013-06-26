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
	
	// make public
	window.Youtube = Youtube;
	
	//==========================================================================
	// Playlist
	//==========================================================================
	/**
	 * Create a new Playlist object.
	 * @param {boolean} loop Optional. Loop items of the playlist or not.
	 * @param {type} items Optional. Initial items of the playlist.
	 */
	var Playlist = function (loop, items) {
		this._loop = loop || true;
		this._pos = -1;
		this._items = [];
		if (items !== undefined) {
			for (var i = 0; i < items.length; i++) {
				this._items.push(items[i]);
			}
		}
	};
	
	/**
	 * Add an item to the playlist. You may supply as many arguments as you want.
	 */
	Playlist.prototype.add = function () {
		for (var i = 0; i < arguments.length; i++) {
			this._items.push(arguments[i]);
		}
	};
	
	/**
	 * Obtain the next element in the playlist. If looping is activated and that
	 * the end of the list is reached, it will return to the first element.
	 * @throws {string} If the playlist is empty, an exception will be thrown.
	 * @returns {mixed} Returns the next element of the list.
	 */
	Playlist.prototype.next = function () {
		if (this._items.length === 0) {
			throw "Playlist is empty.";
		} else if (this._pos < this._items.length - 1) {
			this._pos++;
			return this._items[this._pos];
		} else {
			if (this._loop) {
				this._pos = -1;
				return this.next();
			} else {
				return null;
			}
		}
	};
	
	/**
	 * Obtain the previous element in the playlist. If looping is activated and
	 * that the start of the list is reached, it will return to the last element.
	 * @throws {string} If the playlist is empty, an exception will be thrown.
	 * @returns {mixed} Returns the previous of element of the list.
	 */
	Playlist.prototype.prev = function () {
		if (this._items === 0) {
			throw "Playlist is empty.";
		} else if (this._pos > 0) {
			this._pos--;
			return this._items[this._pos];
		} else {
			if (this._loop) {
				this._pos = this._items.length;
				return this.prev();
			} else {
				return null;
			}
		}
	};
	
	/**
	 * Get the position in the list.
	 * @returns {int} Position.
	 */
	Playlist.prototype.pos = function (index) {
		return this._pos;
	};

	/**
	 * Seek to a precise position in the list and return the element at that index.
	 * @param {number} index Index of the element.
	 * @throws {string} If the playlist is empy, an exception will be thrown. If
	 *		the index is out of bounds, an exception will be thrown.
	 * @returns {mixed} Element at the given index.
	 */
	Playlist.prototype.seek = function (index) {
		if (this._items === 0) {
			throw "Playlist is empty.";
		} else if (index >= 0 && index < this._items.length) {
			this._pos = index;
			return this._items[this._pos];
		} else {
			throw "Index out of bounds.";
		}
	};
	
	/**
	 * Iterate through hte items in the playlist.
	 * @param {function} fn Callback function to be called. fn(element, index)
	 * @param {object} scope Optional. A scope/context which the function should be called with.
	 */
	Playlist.prototype.forEach = function (fn, scope) {
		for (var i = 0; i < this._items.length; i++) {
			if (scope !== undefined) {
				fn.call(scope, this._items[i], i);
			} else {
				fn(this._items[i], i);
			}
		}
	};
	
	/**
	 * Get or set looping on the playlist.
	 * @param {mixed} If supplied, will change the looping. If not,
	 *		will return if looping or not.
	 * @returns {mixed} If the loop argument is supplied, nothing.
	 *		If it's not supplied, if the playlist is looping.
	 */
	Playlist.prototype.loop = function (loop) {
		if (loop === undefined) {
			return this._loop;
		} else {
			this._loop = loop;
		}
	};

	/**
	 * Shuffle the elements of the Playlist.
	 */
	Playlist.prototype.shuffle = function () {
		var counter = this._items.length,
			temp, index;
		while (counter > 0) {
			index = Math.floor((Math.random() * counter--));
			temp = this._items[counter];
			this._items[counter] = this._items[index];
			this._items[index] = temp;
		}
	};

	/**
	 * Create an exact copy of this Playlist.
	 * @returns A new Playlist object which is an exact copy of this object.
	 */
	Playlist.prototype.copy = function () {
		var newlist = new Playlist();
		newlist.loop(this.loop());
		newlist.seek(this.pos());
		this.forEach(function (item) {
			newlist.add(item);
		});
		return newlist;
	}
	
	// make public
	window.Playlist = Playlist;
})();