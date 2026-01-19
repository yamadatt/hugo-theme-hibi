document.addEventListener('DOMContentLoaded', () => {
    const searchToggleButtons = document.querySelectorAll('.js-search-toggle');
    const legacySearchToggle = document.getElementById('search-toggle');
    const searchToggles = searchToggleButtons.length ? Array.from(searchToggleButtons) : (legacySearchToggle ? [legacySearchToggle] : []);
    const searchClose = document.getElementById('search-close');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let searchIndex = null;

    if (searchToggles.length && searchModal && searchClose) {
        const openSearch = () => {
            searchModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                searchModal.classList.remove('opacity-0');
                if (searchInput) {
                    searchInput.focus();
                    loadSearchIndex();
                }
            }, 10);
        };

        searchToggles.forEach((toggle) => {
            toggle.addEventListener('click', openSearch);
        });

        const closeSearch = () => {
            searchModal.classList.add('opacity-0');
            setTimeout(() => {
                searchModal.classList.add('hidden');
            }, 300);
        };

        searchClose.addEventListener('click', closeSearch);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
                closeSearch();
            }
        });
    }

    function getBaseUrl() {
        const raw = document.body && document.body.dataset ? document.body.dataset.baseurl : '';
        if (!raw) return '/';
        return raw.endsWith('/') ? raw : `${raw}/`;
    }

    async function loadSearchIndex() {
        if (searchIndex) return;
        try {
            const response = await fetch(`${getBaseUrl()}index.json`);
            const data = await response.json();
            searchIndex = data.posts;
        } catch (e) {
            console.error('Failed to load search index', e);
        }
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (!query) {
                searchResults.innerHTML = '<p class="text-center text-gray-500 mt-8">記事を検索できます。</p>';
                return;
            }
            if (!searchIndex) return;

            const results = searchIndex.filter(post => {
                const title = post.title ? post.title.toLowerCase() : '';
                const summary = post.summary ? post.summary.toLowerCase() : '';
                const content = post.content ? post.content.toLowerCase() : '';
                const tags = post.tags ? post.tags.join(' ').toLowerCase() : '';
                
                return title.includes(query) || summary.includes(query) || content.includes(query) || tags.includes(query);
            });

            displayResults(results);
        });
    }

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-center text-gray-500 mt-8">見つかりませんでした。</p>';
            return;
        }

        const html = results.map(post => `
            <a href="${post.url}" class="block p-4 mb-4 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-1">${post.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${post.summary || (post.content ? post.content.substring(0, 100) : '')}...</p>
                <div class="flex gap-2 mt-2">
                    ${post.tags ? post.tags.map(tag => `<span class="text-xs bg-gray-200 dark:bg-white/10 px-2 py-1 rounded text-gray-600 dark:text-gray-400">#${tag}</span>`).join('') : ''}
                </div>
            </a>
        `).join('');

        searchResults.innerHTML = html;
    }
});
