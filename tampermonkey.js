// ==UserScript==
// @name         Youtube Anti-Adblock Killer
// @namespace    https://anda.ninja/
// @version      1.0.1
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
  let overlay = document.querySelector('tp-yt-iron-overlay-backdrop'); // get overlay
  let closeBtn = null // DOM

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const dialogs = mutation.target.querySelectorAll('tp-yt-paper-dialog'); // find all dialogs
        dialogs.forEach((dialog) => {
          const content = dialog.innerHTML.toLowerCase();
          const antiAdBlockPhrases = /bloqueur de publicité|autoriser youtube ads|blockers are not allowed|blockers violate|allow youtube ads/;
          if (antiAdBlockPhrases.test(content)) { // there is an anti-adblock dialog
            dialog.style.display = "none"; // hide the popup
            if (overlay) overlay.style.display = "none"; // hide overlay
            if (video) video.play(); // force play
            if (!closeBtn) closeBtn = dialog.querySelector('div.yt-spec-touch-feedback-shape__fill'); // find close button
            else {
              closeBtn.click(); // press the close button to prevent popup come back
              dialog.remove();
            }
          } // endof adblock dialog
        });
      }
    });
  });

  const dialogParent = document.querySelector('body'); // assuming dialogs are direct children of body
  observer.observe(dialogParent, { childList: true, subtree: true });
})();


/* COMMUNICATION
We don't want to pay a Premium because
we will still see sponsored contents because
YT doesn't compensate their creators sufficiently
THANK YOU */
