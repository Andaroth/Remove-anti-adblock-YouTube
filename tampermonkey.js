// ==UserScript==
// @name         Youtube Anti-Adblock Killer
// @namespace    https://anda.ninja/
// @version      1.0.4
// @description  Remove the anti-adblocker popup on Youtube
// @author       Axel Andaroth
// @match        https://www.youtube.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC1JREFUWEft0EERAAAAAUH6lxbDZxU4s815PffjAAECBAgQIECAAAECBAgQIDAaPwAh6O5R/QAAAABJRU5ErkJggg==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('Youtube Anti-Adblock Killer by Axel Andaroth')
    let video = document.querySelector('video') // find the video player in page
    let overlay, closeBtn, noRenderer, playerContainerOuter = null // DOM
    let skipBtn = null;

    const forcePlay = () => {
        if (!video) video = document.querySelector('video') // find the video player in page
        video.play() // force play
    }

    const forceSkipAdScreen = () => {
        if (!skipBtn) skipBtn = document.querySelector('button.ytp-ad-skip-button-modern');
        if (skipBtn) skipBtn.click() // auto skip temp ad screen
    }

    const domAlertTester = (dom) => (
        !! dom.innerHTML.toLowerCase().includes("bloqueur de publicité")
        || !!dom.innerHTML.toLowerCase().includes("autoriser youtube ads")
        || !!dom.innerHTML.toLowerCase().includes("blockers are not allowed")
        || !!dom.innerHTML.toLowerCase().includes("blockers violate")
        || !!dom.innerHTML.toLowerCase().includes("allow youtube ads")
    )

    const deleteNoRenderer = () => {
        if (!playerContainerOuter) playerContainerOuter = document.querySelector('div#player-container-outer') // find outer player
        else playerContainerOuter.style.visibility = "initial" // force visible player

        if (!noRenderer) {
            const noRenderers = document.querySelectorAll('yt-playability-error-supported-renderers') // find player warning
            if (Array.from(noRenderers).length) console.log('noRenderers opened:',noRenderers)
            noRenderer = Array.from(noRenderers).find((nr) => domAlertTester(nr)) // find matching error
            if (!!noRenderer) {
                noRenderer.style.display = "none" // hide player warning
                noRenderer.remove() // kill (^:
                forcePlay() // play after kill
            }
        }
    }

    const deleteOldDialog = () => {
        const dialogs = document.querySelectorAll('tp-yt-paper-dialog') || [] // find all dialogs
        if (Array.from(dialogs).length) console.log('dialogs opened:',dialogs)
        // find the anti-adblock one, use the expression you like:
        const antiAdBlockDialog = Array.from(dialogs).find((dialog) => domAlertTester(dialog)) // endof find
        if (!!antiAdBlockDialog) { // there is an anti-adblock dialog
            antiAdBlockDialog.style.display = "none" // hide the popup
            if (!overlay) overlay = document.querySelector('tp-yt-iron-overlay-backdrop') // get overlay
            else overlay.style.display = "none" // hide overlay
            forcePlay()
            if (!closeBtn) closeBtn = antiAdBlockDialog.querySelector('div.yt-spec-touch-feedback-shape__fill') // find close button
            else {
                closeBtn.click() // press the close button to prevent popup come back
                antiAdBlockDialog.remove()
                forcePlay()
            }
        } // endof adblock dialog
    }

    const interval = setInterval(() => { // init a lazy repeat (^:
        forceSkipAdScreen()
        deleteNoRenderer()
        deleteOldDialog()
    },1000) // endof interval

})();

/* COMMUNICATION
We don't want to pay a Premium because
we will still see sponsored contents because
YT doesn't compensate their creators sufficiently
THANK YOU */
