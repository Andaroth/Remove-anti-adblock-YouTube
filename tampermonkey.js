// ==UserScript==
// @name         Youtube Anti-Adblock Killer
// @namespace    https://anda.ninja/
// @version      0.1
// @description  Remove the anti-adblocker popup on Youtube
// @author       Axel Andaroth
// @match        https://www.youtube.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('Youtube Anti-Adblock Killer by Axel Andaroth')
    const video = document.querySelector('video') // find the video player in page
    let kill, click = false
    const interval = setInterval(() => { // lazy repeat (^:
        if (kill) return console.log('master my work here is done');
        const dialogs = document.querySelectorAll('tp-yt-paper-dialog') || [] // find all dialogs
        console.log('dialogs', dialogs)
        // find the anti-adblock one, use the expression you like:
        const antiAdBlockDialog = Array.from(dialogs).find((d) => (!!d.innerHTML.toLowerCase().match(/allow youtube ads|autoriser youtube ads/g)))
        if (!!antiAdBlockDialog) {
            console.log('antiAdBlockDialog', antiAdBlockDialog)
            antiAdBlockDialog.style.display = "none" // hide the popup
            if (!!video && video.paused) video.play() // auto play if was paused
            const closeBtn = antiAdBlockDialog.querySelector('div.yt-spec-touch-feedback-shape__fill') // find close button
            if (closeBtn) {
                console.log('try close popup', closeBtn)
                closeBtn.click() // press the close button
                click = true
            } // endof close
        } else if (click) kill = true; // if no dialog + closeBtn clicked, then its killed
    },1000) // endof interval
})();
