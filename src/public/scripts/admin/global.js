const modals = document.querySelectorAll('[data-type="modal"]');
const close_modals = document.querySelectorAll('[data-close-modal]');
const open_modals = document.querySelectorAll('[data-open-modal]');
/* const toasts = document.querySelectorAll('[data-type="toast"]');
const close_toasts = document.querySelectorAll('[data-close-toast]'); */
const auto_hides = document.querySelectorAll('[data-auto-hide]');

for (const el of modals) {
    el.addEventListener('mousedown', (e) => {
        if (e.target == el || e.target == el.firstElementChild) {
            el.classList.add('hidden');
        }
    });
}

for (const el of open_modals) {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        let modal = document.getElementById(el.getAttribute('data-open-modal'));

        modal.classList.remove('hidden');
    });
}

for (const el of close_modals) {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        let modal = document.getElementById(el.getAttribute('data-close-modal'));

        modal.classList.add('hidden');
    });
}

for (const el of auto_hides) {
    let delay = el.getAttribute('data-auto-hide');
    setInterval(() => {
        el.classList.add('hidden');
    }, delay);
}

function input_text_to_number_only(selector) {
    const el = document.querySelector(selector);

    el.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    });

    el.addEventListener('paste', function (event) {
        event.preventDefault();
        const pastedData = (event.clipboardData || window.clipboardData).getData('text');
        event.target.value = pastedData.replace(/[^0-9]/g, '');
    });
}

function on_click(selector, func, params = []) {
    document.querySelector(selector).addEventListener('click', (e) => {        
        func(e, ...params);
    });
}