// Sabela Gas — shared script used by index.html, gallery.html, prices.html

// Call buttons — copy number to clipboard, let tel: still open the phone app on mobile
document.querySelectorAll('.call-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const number = btn.dataset.phone || '';
    const showToast = () => {
      let toast = btn.querySelector('.copy-toast');
      if (!toast) {
        toast = document.createElement('span');
        toast.className = 'copy-toast';
        toast.textContent = 'Number copied!';
        btn.appendChild(toast);
      }
      toast.classList.add('show');
      clearTimeout(btn._toastTimer);
      btn._toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number).then(showToast).catch(showToast);
    } else {
      // Fallback for older browsers
      const temp = document.createElement('textarea');
      temp.value = number;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(temp);
      showToast();
    }
    // No preventDefault — the tel: link still fires, opening the phone app on mobile
  });
});

// Gallery filter (only runs on pages that have gallery tabs, e.g. gallery.html)
const tabs = document.querySelectorAll('.tab-btn');
const items = document.querySelectorAll('.gallery-item');
if (tabs.length && items.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'flex' : 'none';
      });
    });
  });
}
