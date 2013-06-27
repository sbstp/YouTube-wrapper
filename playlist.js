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
     *      the index is out of bounds, an exception will be thrown.
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
     *      will return if looping or not.
     * @returns {mixed} If the loop argument is supplied, nothing.
     *      If it's not supplied, if the playlist is looping.
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
        this.forEach(function (item) {
            newlist.add(item);
        });
        newlist._loop = this.loop();
        newlist._pos = this.pos();
        return newlist;
    }
    
    // expose
    window.Playlist = Playlist;
})();