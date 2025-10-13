class Game{
    //Hoeveel cookies we hebben
    cookies = 0;
    //Hoe krachtig de klik is
    click_power = 1;
    //Hoeveel cookies krijgen we automatisch per seconden
    cookies_per_second = 0;

    click_cookie(){
        this.cookies = this.cookies + this.click_power;
        document.getElementById("counter").innerText = Math.floor(this.cookies);
    }

}

let game = new Game();

// Add click event to the cookie element
document.getElementById('cookie').addEventListener('click', function() {
    game.click_cookie();
});