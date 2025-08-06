// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.greedy-nav__toggle');
  const hiddenLinks = document.querySelector('.hidden-links');
  
  if (toggle && hiddenLinks) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle de hidden class
      hiddenLinks.classList.toggle('hidden');
      toggle.classList.toggle('close');
      
      // Update aria-expanded voor accessibility
      const isExpanded = !hiddenLinks.classList.contains('hidden');
      toggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Sluit menu bij klik buiten het menu
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !hiddenLinks.contains(e.target)) {
        hiddenLinks.classList.add('hidden');
        toggle.classList.remove('close');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Sluit menu bij venster resize (om bugs te voorkomen)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hiddenLinks.classList.add('hidden');
        toggle.classList.remove('close');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});