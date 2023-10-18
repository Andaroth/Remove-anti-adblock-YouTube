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
    let overlay = null // DOM
    let closeBtnClicked = false
    const interval = setInterval(() => { // lazy repeat (^:
        const dialogs = document.querySelectorAll('tp-yt-paper-dialog') || [] // find all dialogs
        if (Array.from(dialogs).length) console.log('dialogs opened:',dialogs)
        // find the anti-adblock one, use the expression you like:
        const antiAdBlockDialog = Array.from(dialogs).find((d) => (!!d.innerHTML.toLowerCase().includes("bloqueur de publicité")))
        if (!!antiAdBlockDialog) { // there is an anti-adblock dialog
            console.log('antiAdBlockDialog', antiAdBlockDialog)
            antiAdBlockDialog.style.display = "none" // hide the popup
            if (!overlay) overlay = document.querySelector('tp-yt-iron-overlay-backdrop') // get overlay
            else overlay.style.display = "none" // hide overlay
            if (!!video && video.paused) video.play() // auto play if was paused
            const closeBtn = antiAdBlockDialog.querySelector('div.yt-spec-touch-feedback-shape__fill') // find close button
            if (closeBtn) {
                console.log('try close popup with btn:', closeBtn)
                closeBtn.click() // press the close button
                closeBtnClicked = true
            } // endof close
        } else if (closeBtnClicked) console.log('MASTER, I AM HERE TO SERVE YOU') // if no dialog + closeBtnClicked, then its killed
    },1000) // endof interval
})();
