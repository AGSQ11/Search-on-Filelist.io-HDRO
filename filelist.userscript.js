// ==UserScript==
// @name         Search HD-RO movies on Filelist by Selection
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a custom tooltip for searching selected text after selection is done
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let selectedText = '';

    // Create the tooltip element
    let tooltip = document.createElement('div');
    tooltip.innerText = '🔍 Search Selected Text';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.borderRadius = '4px';
    tooltip.style.padding = '7px 10px';
    tooltip.style.cursor = 'pointer';
    tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '10000';
    tooltip.style.fontFamily = 'Arial, sans-serif';
    tooltip.style.fontSize = '12px';
    tooltip.addEventListener('click', function() {
        if (selectedText) {
            window.open(`https://filelist.io/browse.php?search=${encodeURIComponent(selectedText)}&cat=19&searchin=1&sort=2`, '_blank');
        }
        hideTooltip();
    });
    document.body.appendChild(tooltip);

    // Function to show the tooltip
    function showTooltip(e) {
        if (window.getSelection().toString().trim() !== '') {
            selectedText = window.getSelection().toString().trim();
            console.log("Selected text:", selectedText);

            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // Adding a small offset below the selected text
            tooltip.style.display = 'block';
        }
    }

    // Function to hide the tooltip
    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    // Add event listener for mouseup to show tooltip after text selection
    document.addEventListener('mouseup', function(e) {
        // Delay the display to allow the selection to complete
        setTimeout(() => showTooltip(e), 0);
    });

    // Add event listener for clicking outside to hide the tooltip
    document.addEventListener('click', function(e) {
        if (!tooltip.contains(e.target)) {
            hideTooltip();
        }
    });

   //enable this to debug
  //console.log("Tampermonkey script setup complete.");
})();
