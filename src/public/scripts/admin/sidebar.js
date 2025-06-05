function activate_sidebar() {
    let sidebar_open = document.getElementById('sidebar-open');
    let sidebar_close = document.getElementById('sidebar-close');
    let sidebar = document.getElementById('sidebar');

    sidebar_open.addEventListener('click', () => {
        sidebar_open.classList.add('hidden');
        sidebar.classList.remove('hidden');
    });

    sidebar_close.addEventListener('click', () => {
        sidebar_open.classList.remove('hidden');
        sidebar.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const current_menu = window.location.pathname.split('/')[2];

    if(!current_menu){
        document.querySelector('[id="menu-dashboard"]').classList.add('rounded', 'bg-blue-500');
        document.querySelector('[id="menu-dashboard"] svg').classList.add('stroke-white');
        document.querySelector('[id="menu-dashboard"] p').classList.add('text-white', 'font-bold');
    }
    else{
        document.querySelector(`[id="menu-${current_menu}"]`).classList.add('rounded', 'bg-blue-500');
        document.querySelector(`[id="menu-${current_menu}"] svg`).classList.add('stroke-white');
        document.querySelector(`[id="menu-${current_menu}"] p`).classList.add('text-white', 'font-bold');
    }

    if(document.getElementById('sidebar')){
        activate_sidebar();
    }
});