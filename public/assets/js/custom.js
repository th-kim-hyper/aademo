document.addEventListener('DOMContentLoaded', function () {
    const navbarDropdown = document.getElementById('navbarDropdown');
    const dropdownItems = document.querySelectorAll('#navbarDropdown + .dropdown-menu .dropdown-item');
    const triggerIcon = navbarDropdown.querySelector('i');
    const body = document.body;

    const themes = {
        light: { icon: 'bi-sun-fill' },
        dark: { icon: 'bi-moon-fill' },
        auto: { icon: 'bi-circle-half' }
    };

    function applyTheme(theme) {
        body.classList.remove('dark-theme', 'auto-theme');
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else if (theme === 'auto') {
            body.classList.add('auto-theme');
        }

        // Update active class
        dropdownItems.forEach(item => {
            if (item.textContent.trim().toLowerCase() === theme) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update trigger icon
        if (themes[theme]) {
            triggerIcon.className = 'bi ' + themes[theme].icon;
        }
        
        // Save preference
        localStorage.setItem('theme', theme);
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedTheme = event.currentTarget.textContent.trim().toLowerCase();
            applyTheme(selectedTheme);
        });
    });

    class FontChanger {
        constructor() {
            this.fontDropdownTrigger = document.getElementById('fontDropdown');
            if (!this.fontDropdownTrigger) return;
    
            this.dropdownMenu = this.fontDropdownTrigger.nextElementSibling;
            if (!this.dropdownMenu || !this.dropdownMenu.classList.contains('dropdown-menu')) {
                this.dropdownMenu = document.createElement('ul');
                this.dropdownMenu.className = 'dropdown-menu';
                this.dropdownMenu.setAttribute('aria-labelledby', 'fontDropdown');
                this.fontDropdownTrigger.parentElement.appendChild(this.dropdownMenu);
            }
            
            this.body = document.body;
            this.fonts = {
                'Pretendard': "'Pretendard', sans-serif",
                'Nanum Square Neo': "'Nanum Square Neo', sans-serif",
                'BM JUA': "'BM JUA', sans-serif",
                'Gmarket Sans': "'Gmarket Sans', sans-serif",
            };
    
            this.init();
        }

        populateDropdown() {
            this.dropdownMenu.innerHTML = ''; // Clear existing items
            for (const fontName in this.fonts) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.dataset.font = fontName;
                a.textContent = fontName;
                li.appendChild(a);
                this.dropdownMenu.appendChild(li);
            }
        }
    
        init() {
            this.populateDropdown();
            this.dropdownItems = this.dropdownMenu.querySelectorAll('.dropdown-item'); // Now get the items
    
            this.dropdownItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    const fontName = event.currentTarget.dataset.font;
                    this.applyFont(fontName);
                });
            });
    
            const savedFont = localStorage.getItem('font') || 'Pretendard';
            this.applyFont(savedFont);
        }
    
        applyFont(fontName) {
            if (this.fonts[fontName]) {
                this.body.style.fontFamily = this.fonts[fontName];
    
                this.dropdownItems.forEach(item => {
                    if (item.dataset.font === fontName) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
    
                localStorage.setItem('font', fontName);
            }
        }
    }

    new FontChanger();
});
