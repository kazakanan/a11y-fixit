export function setupTabs() {
	const tabList = document.getElementById('tablist');
	const tabs = Array.from(tabList.getElementsByClassName('tab-btn'));
	const tabPanels = Array.from(document.getElementsByClassName('tab-content'));

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			tabs.forEach((t, i) => {
				const isSelected = t === tab;
				t.setAttribute('aria-selected', isSelected);
				t.classList.toggle('selected', isSelected);
				tabPanels[i].classList.toggle('is-hidden', !isSelected);
			});
		});

		tab.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				e.preventDefault();
				const nextIndex = (index + 1) % tabs.length;
				tabs[nextIndex].focus();
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				e.preventDefault();
				const prevIndex = (index - 1 + tabs.length) % tabs.length;
				tabs[prevIndex].focus();
			}
		});
	});
};
