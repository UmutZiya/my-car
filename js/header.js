
// Mobile Sidebar Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    // Open sidebar
    mobileMenuBtn.addEventListener('click', function() {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebarFunc() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeSidebar.addEventListener('click', closeSidebarFunc);
    sidebarOverlay.addEventListener('click', closeSidebarFunc);

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });
});