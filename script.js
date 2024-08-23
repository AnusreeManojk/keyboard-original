document.addEventListener('DOMContentLoaded', () => {
    let keys = document.querySelectorAll('.key'); 
    const mouseClick = document.querySelector('.click');
    const inputs = document.querySelectorAll('.to-input, .subject, .textarea');
    const rows = document.querySelectorAll('.keys');

    let lastIndex = 0;
    let intervalId = null;
    let isCapsLockOn = false;
    let currentKeyContent = "";
    let isIterating = false;
    let pressTimeout;
    let currentInputIndex = 0;
    let currentRow = 0;

    function displayKeys(key) {
        const currentFocus = inputs[currentInputIndex];

        if (key === "Backspace") {
            currentFocus.value = currentFocus.value.slice(0, -1);
        } else if (key === "Space") {
            currentFocus.value += ' ';
        } else if (key === "CapsLk") {
            isCapsLockOn = !isCapsLockOn;
        } else if (key === "Tab") {
            currentFocus.value += '\t';
        } else if (key === "Enter") {
            currentFocus.value += '\n';
        } else if (key === "Change Field") {
            switchField();
        } else if (key === "Send") {
            setTimeout(() => {
                alert('Email sent successfully!');
            }, 1000);
            inputs.forEach(input => {
                input.value = '';
            });
        } else if (key === "@") {
            currentFocus.value += '@gmail.com';
        } else {
            currentFocus.value += isCapsLockOn ? key.toUpperCase() : key.toLowerCase();
        }
    }

    function switchField() {
        currentInputIndex++;
        if (currentInputIndex >= inputs.length) {
            currentInputIndex = 0;
        }
        inputs[currentInputIndex].focus();
    }

    function iterateKeys() {
        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            if (keys.length > 0) {
                if (lastIndex > 0) {
                    keys[lastIndex - 1].style.backgroundColor = '';
                    keys[lastIndex - 1].style.color = 'black';
                } else if (lastIndex === 0 && keys.length > 0) {
                    keys[keys.length - 1].style.backgroundColor = '';
                }
                keys[lastIndex].style.backgroundColor = '#86969b';
                keys[lastIndex].style.color = '';

                currentKeyContent = keys[lastIndex].textContent;

                lastIndex++;
                if (lastIndex >= keys.length) {
                    lastIndex = 0;
                }
            }
        }, 1000);

        isIterating = true;
    }

    mouseClick.addEventListener('click', () => {
        if (!isIterating) {
            iterateKeys();
        }
    });

    mouseClick.addEventListener('dblclick', () => {
        if (isIterating) {
            if (currentKeyContent) {
                if (currentKeyContent === "Change Field") {
                    switchField();
                } else {
                    displayKeys(currentKeyContent);
                }

                clearInterval(intervalId);
                isIterating = false;

                setTimeout(() => {
                    iterateKeys();
                }, 5000);
            }
        }
    });

    mouseClick.addEventListener('mousedown', () => {
        pressTimeout = setTimeout(() => {
            keys.forEach(key => {
                key.style.backgroundColor = '';
                key.style.color = 'black';
            });

            currentRow = (currentRow + 1) % rows.length;
            keys = rows[currentRow].querySelectorAll('.key'); 

            if (isIterating) {
                clearInterval(intervalId);
                iterateKeys();
            }
        }, 1000);
    });

    mouseClick.addEventListener('mouseup', () => {
        clearTimeout(pressTimeout);
    });
});
