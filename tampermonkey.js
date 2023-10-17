// ==UserScript==
// @name         Youtube Anti-Adblock Killer
// @namespace    https://anda.ninja/
// @version      0.1
// @description  Remove the anti-adblocker popup on Youtube
// @author       Axel Andaroth
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('Youtube Anti-Adblock Killer by Axel Andaroth')

    const interval = setInterval(() => {
        const popup = document.querySelector('ytd-popup-container') // find modal
        if (popup) {

            const dialog = document.querySelector('tp-yt-paper-dialog') // find dialog
            const isAntiAdBlockDialog = (dialog && !!dialog.innerHTML.toLowerCase().includes('blockers')) || false
            if (isAntiAdBlockDialog) {
                const close = document.querySelector('div.yt-spec-touch-feedback-shape__fill') // find close button
                if (close) {
                    console.log('close popup', close)
                    close.click() // press the close button
                }

            }
        }
    },1000)
})();
