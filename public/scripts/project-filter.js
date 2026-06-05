document.addEventListener('DOMContentLoaded', () => {
    const filterDropdown = document.getElementById('tag-filter');
    const cards = document.querySelectorAll('.card');

    // Listen for changes on the dropdown menu
    filterDropdown.addEventListener('change', (e) => {
        // Get the value of the newly selected option
        const selectedTag = e.target.value;

        // Loop through all cards to show or hide them
        cards.forEach(card => {
            const cardTags = card.getAttribute('data-tags').split(',');
            
            if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    });
});
