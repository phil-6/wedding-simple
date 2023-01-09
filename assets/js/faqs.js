const fontButton = document.querySelector('#fontButton');
fontButton.addEventListener('click', function() {
    console.log("test")
    document.querySelector('body').classList.toggle('simple-font');
});
