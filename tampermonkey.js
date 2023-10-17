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
    const interval = setInterval(() => { // lazy repeat (^:
        const dialogs = document.querySelectorAll('tp-yt-paper-dialog') // find all dialogs
        const antiAdBlockDialog = dialogs.find((d) => ( // find the anti-adblock one, use the expression you like:
            !!d.innerHTML.toLowerCase().includes('block')
            || !!d.innerHTML.toLowerCase().includes('bloqu')
            || !!d.innerHTML.toLowerCase().includes('publ')
        )) // endof find()
        if (!!antiAdBlockDialog) {
            const close = antiAdBlockDialog.querySelector('div.yt-spec-touch-feedback-shape__fill') // find close button
            if (close) {
                console.log('try close popup', close)
                close.click() // press the close button
            } // endof close
        } // endof antiAdBlockDialog
    },1000) // endof interval
})();
