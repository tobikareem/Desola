const storedTheme = localStorage.getItem('theme');

const getPreferredTheme = () => storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme);
};

setTheme(getPreferredTheme());

window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.theme-icon-active');
    if (el) {
        const showActiveTheme = theme => {
            const activeThemeIcon = document.querySelector('.theme-icon-active use');
            const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
            const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use').getAttribute('href');

            document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
                element.classList.remove('active');
            });

            btnToActive.classList.add('active');
            activeThemeIcon.setAttribute('href', svgOfActiveBtn);
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (storedTheme !== 'light' && storedTheme !== 'dark') {
                setTheme(getPreferredTheme());
            }
        });

        showActiveTheme(getPreferredTheme());

        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
            toggle.addEventListener('click', event => {
                const theme = event.currentTarget.getAttribute('data-bs-theme-value');
                localStorage.setItem('theme', theme);
                setTheme(theme);
                showActiveTheme(theme);
            });
        });
    }
});