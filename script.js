class Game {
    constructor() {
        this.cookies = 0;
        this.click_power = 1;
        this.cookies_per_second = 0;
        this.click_upgrade_cost = 15;
        this.grandma_cost = 150;
        this.grandma_count = 0;
        this.goudmijn_cost = 500;
        this.goudmijn_count = 0;
    
        
        this.setupEventListeners();
        this.startGameLoop();
        this.updateUI();
        this.saveGame();
    }

    startGameLoop() {
        // Grandma production
        setInterval(() => {
            if (this.grandma_count > 0) {
                this.cookies += this.grandma_count * 0.1; // 0.1 cookies per grandma every 100ms
                this.updateUI();
            }
            
            // Goudmijn production
            if (this.goudmijn_count > 0) {
                this.cookies += this.goudmijn_count * 0.4; // 0.4 cookies per goudmijn every 100ms
                this.updateUI();
            }
        }, 100);
    }   

    setupEventListeners() {
        // Cookie click event
        document.getElementById('cookie').addEventListener('click', () => this.click_cookie());
        
        // Upgrade click power button
        const upgradeBtn = document.getElementById('upgrade-click-btn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.upgrade_click_power());
        }

        // Buy grandma button
        const grandmaBtn = document.getElementById('buy-grandma');
        if (grandmaBtn) {
            grandmaBtn.addEventListener('click', () => this.buyGrandma());
        }

        const goudmijnBtn = document.getElementById('buy-goudmijn');
        if (goudmijnBtn) {
            goudmijnBtn.addEventListener('click', () => this.buyGoudmijn());
        }
    }

    click_cookie() {
        this.cookies += this.click_power;
        this.updateUI();
    }

    upgrade_click_power() {
        if (this.cookies >= this.click_upgrade_cost) {
            this.cookies -= this.click_upgrade_cost;
            this.click_power *= 1.5;
            this.click_upgrade_cost = Math.floor(this.click_upgrade_cost * 2);
            this.updateUI();
        }
    }

    buyGrandma() {
        if (this.cookies >= this.grandma_cost) {
            this.cookies -= this.grandma_cost;
            this.grandma_count++;
            this.grandma_cost = Math.floor(this.grandma_cost * 1.5);
            this.cookies_per_second = this.grandma_count;
            this.updateUI();
        }
    }

    buyGoudmijn() {
        if (this.cookies >= this.goudmijn_cost) {
            this.cookies -= this.goudmijn_cost;
            this.goudmijn_count++;
            this.goudmijn_cost = Math.floor(this.goudmijn_cost * 2);
            this.cookies_per_second = this.goudmijn_count;
            this.updateUI();
        }
    }

    updateUI() {
        // Update cookie counter
        document.getElementById("counter").textContent = Math.floor(this.cookies);
        
        // Update click power display
        document.getElementById("click_power").textContent = this.click_power;
        
        // Update upgrade button cost
        const upgradeBtn = document.getElementById('upgrade-click-btn');
        if (upgradeBtn) {
            const costElement = upgradeBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.click_upgrade_cost;
            }
            upgradeBtn.disabled = this.cookies < this.click_upgrade_cost;
        }

        // Update grandma button and count
        const grandmaBtn = document.getElementById('buy-grandma');
        const grandmaCount = document.getElementById('grandma-count');
        if (grandmaBtn && grandmaCount) {
            const costElement = grandmaBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.grandma_cost;
            }
            grandmaBtn.disabled = this.cookies < this.grandma_cost;
            grandmaCount.textContent = this.grandma_count;
        }

        // Update goudmijn button and count
        const goudmijnBtn = document.getElementById('buy-goudmijn');
        const goudmijnCount = document.getElementById('goudmijn-count');
        if (goudmijnBtn && goudmijnCount) {
            const costElement = goudmijnBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.goudmijn_cost;
            }
            goudmijnBtn.disabled = this.cookies < this.goudmijn_cost;
            goudmijnCount.textContent = this.goudmijn_count;
        }
    }


}



// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});