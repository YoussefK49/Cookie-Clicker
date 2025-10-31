class Game {
    constructor() {
        const savedGame = this.loadGame();
        
        if (savedGame) {
            this.cookies = savedGame.cookies || 0;
            this.click_power = savedGame.click_power || 1;
            this.cookies_per_second = savedGame.cookies_per_second || 0;
            this.click_upgrade_cost = savedGame.click_upgrade_cost || 15;
            this.grandma_cost = savedGame.grandma_cost || 150;
            this.grandma_count = savedGame.grandma_count || 0;
            this.goudmijn_cost = savedGame.goudmijn_cost || 500;
            this.goudmijn_count = savedGame.goudmijn_count || 0;
            this.farm_cost = savedGame.farm_cost || 1000;
            this.farm_count = savedGame.farm_count || 0;
            this.fabriek_cost = savedGame.fabriek_cost || 3000;
            this.fabriek_count = savedGame.fabriek_count || 0;
        } else {
            this.cookies = 0;
            this.click_power = 1;
            this.cookies_per_second = 0;
            this.click_upgrade_cost = 15;
            this.grandma_cost = 150;
            this.grandma_count = 0;
            this.goudmijn_cost = 500;
            this.goudmijn_count = 0;
            this.farm_cost = 1000;
            this.farm_count = 0;
            this.fabriek_cost = 3000;
            this.fabriek_count = 0;
        }
        
        this.setupEventListeners();
        this.startGameLoop();
        this.updateUI();
        this.saveGame();
    }

    startGameLoop() {
        setInterval(() => {
            if (this.grandma_count > 0) {
                this.cookies += this.grandma_count * 0.1;
                this.updateUI();
            }
            
            if (this.goudmijn_count > 0) {
                this.cookies += this.goudmijn_count * 0.4;
            }

            if (this.farm_count > 0) {
                this.cookies += this.farm_count * 0.6; 
                this.updateUI();
            }
            if (this.fabriek_count > 0) {
                this.cookies += this.fabriek_count * 1.0; 
                this.updateUI();
            }

        }, 100);
    }   

    setupEventListeners() {
        document.getElementById('cookie').addEventListener('click', () => this.click_cookie());
        
        const upgradeBtn = document.getElementById('upgrade-click-btn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.upgrade_click_power());
        }

        const grandmaBtn = document.getElementById('buy-grandma');
        if (grandmaBtn) {
            grandmaBtn.addEventListener('click', () => this.buyGrandma());
        }

        const goudmijnBtn = document.getElementById('buy-goudmijn');
        if (goudmijnBtn) {
            goudmijnBtn.addEventListener('click', () => this.buyGoudmijn());
        }

        const farmBtn = document.getElementById('buy-farm');
        if (farmBtn) {
            farmBtn.addEventListener('click', () => this.buyFarm())
        }
        const fabrieKBtn = document.getElementById('buy-fabriek');
        if (fabrieKBtn) {
            fabrieKBtn.addEventListener('click', () => this.buyFabriek())
        }

        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGame());
        }
    }

    resetGame() {
        if (confirm('Weet je zeker dat je het spel wilt resetten? Alle voortgang gaat verloren!')) {
            this.cookies = 0;
            this.click_power = 1;
            this.cookies_per_second = 0;
            this.click_upgrade_cost = 15;
            this.grandma_cost = 150;
            this.grandma_count = 0;
            this.goudmijn_cost = 500;
            this.goudmijn_count = 0;
            this.farm_cost = 1000;
            this.farm_count = 0;
            this.fabriek_cost = 3000;
            this.fabriek_count = 0;
            
            localStorage.removeItem('cookieClickerSave');
            
            this.updateUI();
            
            alert('Spel is gereset!');
        }
    }

    click_cookie() {
        this.cookies += this.click_power;
        this.updateUI();
        this.saveGame();
    }

    upgrade_click_power() {
        if (this.cookies >= this.click_upgrade_cost) {
            this.cookies -= this.click_upgrade_cost;
            this.click_power *= 1.5;
            this.click_upgrade_cost = Math.floor(this.click_upgrade_cost * 2);
            this.updateUI();
            this.saveGame();
        }
    }

    buyGrandma() {
        if (this.cookies >= this.grandma_cost) {
            this.cookies -= this.grandma_cost;
            this.grandma_count++;
            this.grandma_cost = Math.floor(this.grandma_cost * 1.5);
            this.cookies_per_second = this.grandma_count;
            this.updateUI();
            this.saveGame();
        }
    }

    buyGoudmijn() {
        if (this.cookies >= this.goudmijn_cost) {
            this.cookies -= this.goudmijn_cost;
            this.goudmijn_count++;
            this.goudmijn_cost = Math.floor(this.goudmijn_cost * 2);
            this.cookies_per_second = this.goudmijn_count;
            this.updateUI();
            this.saveGame();
        }
    }

    buyFarm() {
          if (this.cookies >= this.farm_cost) {
            this.cookies -= this.farm_cost;
            this.farm_count++;
            this.farm_cost = Math.floor(this.farm_cost * 3);
            this.cookies_per_second = this.farm_count;
            this.updateUI();
            this.saveGame();
        }
    }
    buyFabriek() {
          if (this.cookies >= this.fabriek_cost) {
            this.cookies -= this.fabriek_cost;
            this.fabriek_count++;
            this.fabriek_cost = Math.floor(this.fabriek_cost * 4);
            this.cookies_per_second = this.grandma_count * 0.1 + this.goudmijn_count * 0.4 + this.farm_count * 0.6 + this.fabriek_count * 1.0;
            this.updateUI();
            this.saveGame();
        }
    }

    saveGame() {
        const gameState = {
            cookies: this.cookies,
            click_power: this.click_power,
            cookies_per_second: this.cookies_per_second,
            click_upgrade_cost: this.click_upgrade_cost,
            grandma_cost: this.grandma_cost,
            grandma_count: this.grandma_count,
            goudmijn_cost: this.goudmijn_cost,
            goudmijn_count: this.goudmijn_count,
            farm_cost: this.farm_cost,
            farm_count: this.farm_count,
            fabriek_cost: this.fabriek_cost,
            fabriek_count: this.fabriek_count,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('cookieClickerSave', JSON.stringify(gameState));
    }

    loadGame() {
        const savedGame = localStorage.getItem('cookieClickerSave');
        return savedGame ? JSON.parse(savedGame) : null;
    }

    updateUI() {
        document.getElementById("counter").textContent = Math.floor(this.cookies);
        
        document.getElementById("click_power").textContent = this.click_power;
        
        const upgradeBtn = document.getElementById('upgrade-click-btn');
        if (upgradeBtn) {
            const costElement = upgradeBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.click_upgrade_cost;
            }
            upgradeBtn.disabled = this.cookies < this.click_upgrade_cost;
        }

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

        
        const farmBtn = document.getElementById('buy-farm');
        const farmCount = document.getElementById('farm-count');
        if (farmBtn && farmCount) {
            const costElement = farmBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.farm_cost;
            }
           farmBtn.disabled = this.cookies < this.farm_cost;
            farmCount.textContent = this.farm_count;
        }

        const fabriekBtn = document.getElementById('buy-fabriek');
        const fabriekCount = document.getElementById('fabriek-count');
        if (fabriekBtn && fabriekCount) {
            const costElement = fabriekBtn.querySelector('.cost');
            if (costElement) {
                costElement.textContent = this.fabriek_cost;
            }
           fabriekBtn.disabled = this.cookies < this.fabriek_cost;
            fabriekCount.textContent = this.fabriek_count;
        }
    }
    


}




document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});