function showSection(section){
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    document.getElementById(section).classList.add("active");
}