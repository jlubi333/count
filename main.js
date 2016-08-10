(function() {
    var KEYMAP = {
        8: decrement, // Backspace
        40: decrement, // Down
        32: increment, // Spacebar
        38: increment, // Up
        88: restart // X
    }

    var PREVENT_DEFAULT_KEYS = [8];

    var counters, count;

    function storeCount() {
        window.localStorage.setItem("count", count);
    }

    function retrieveCount() {
        return parseInt(window.localStorage.getItem("count")) || 0;
    }

    function updateCounters() {
        for (var i = 0; i < counters.length; i++) {
            counters[i].innerHTML = count;
        }
        storeCount();
    }

    function decrement() {
        if (count > 0) {
            count -= 1;
            updateCounters();
        }
    }

    function increment() {
        count += 1;
        updateCounters();
    }

    function restart() {
        count = 0;
        updateCounters();
    }

    function handleKeyCode(keyCode) {
        if (KEYMAP.hasOwnProperty(keyCode)) {
            KEYMAP[keyCode]();
        }
    }

    window.addEventListener("load", function(loadEvent) {
        counters = document.getElementsByClassName("counter");
        count = retrieveCount();
        updateCounters();

        window.addEventListener("keydown", function(event) {
            if (PREVENT_DEFAULT_KEYS.indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }
            handleKeyCode(event.keyCode);
        });

        var body = document.getElementsByTagName("body")[0];
        var updateHash = function() {
            if (window.location.hash.length === 7) {
                body.style.color = window.location.hash;
            } else {
                body.style.color = "";
            }
        };
        window.addEventListener("hashchange", function(event) {
            updateHash();
        });
        updateHash();
    });
})();
