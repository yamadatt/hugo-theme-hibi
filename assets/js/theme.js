class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;
        
        this.setTheme(currentTheme);

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        const isDark = this.html.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    }

    setTheme(theme) {
        if (theme === 'dark') {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});