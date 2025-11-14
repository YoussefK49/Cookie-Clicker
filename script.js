class Game {
    constructor() {
        const savedGame = this.loadGame();
        
        if (savedGame) {
            this.cookies = savedGame.cookies || 0;
            this.click_power = savedGame.click_power || 1;
            this.cookies_per_second = savedGame.cookies_per_second || 0;
            this.click_upgrade_cost = savedGame.click_upgrade_cost || 15;
            this.power_click_count = savedGame.power_click_count || 0;
            this.power_click_cost = savedGame.power_click_cost || 100;
            this.super_click_count = savedGame.super_click_count || 0;
            this.super_click_cost = savedGame.super_click_cost || 1000;
            this.mega_click_count = savedGame.mega_click_count || 0;
            this.mega_click_cost = savedGame.mega_click_cost || 5000;
            this.ultra_click_count = savedGame.ultra_click_count || 0;
            this.ultra_click_cost = savedGame.ultra_click_cost || 25000;
            this.grandma_cost = savedGame.grandma_cost || 150;
            this.grandma_count = savedGame.grandma_count || 0;
            this.goudmijn_cost = savedGame.goudmijn_cost || 500;
            this.goudmijn_count = savedGame.goudmijn_count || 0;
            this.farm_cost = savedGame.farm_cost || 1000;
            this.farm_count = savedGame.farm_count || 0;
            this.fabriek_cost = savedGame.fabriek_cost || 3000;
            this.fabriek_count = savedGame.fabriek_count || 0;
            this.temple_cost = savedGame.temple_cost || 5000;
            this.temple_count = savedGame.temple_count || 0;
            this.bank_cost = savedGame.bank_cost || 10000;
            this.bank_count = savedGame.bank_count || 0;
            this.ship_cost = savedGame.ship_cost || 100000;
            this.ship_count = savedGame.ship_count || 0;
            this.portal_cost = savedGame.portal_cost || 1000000;
            this.portal_count = savedGame.portal_count || 0;
            this.currentTheme = savedGame.currentTheme || 'default';
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
            this.temple_cost = 5000;
            this.temple_count = 0;  
            this.bank_cost = 10000;
            this.bank_count = 0;
            this.ship_cost = 100000;
            this.ship_count = 0;
            this.portal_cost = 1000000;
            this.portal_count = 0;
            this.currentTheme = 'default';
        }
        
        // Apply saved theme
        this.setTheme(this.currentTheme);
        
        this.setupEventListeners();
        this.startGameLoop();
        this.updateUI();
        this.saveGame();
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
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
            if (this.temple_count > 0) {
                this.cookies += this.temple_count * 2.0; 
                this.updateUI();
            }
            if (this.bank_count > 0) {
                this.cookies += this.bank_count * 4.0; 
                this.updateUI();
            }
                if (this.ship_count > 0) {
                this.cookies += this.ship_count * 8.0; 
                this.updateUI();
            }
            if (this.portal_count > 0) {
                this.cookies += this.portal_count * 16.0; 
                this.updateUI();
            }

        }, 100);
    }   

    setupEventListeners() {
        const cookieBtn = document.getElementById('cookie');
        if (cookieBtn) {
            cookieBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.click_cookie();
            });
        }
        
        const upgradeBtn = document.getElementById('upgrade-click-btn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.upgrade_click_power());
        }

        // New click upgrade buttons
        const powerClickBtn = document.getElementById('buy-power-click');
        if (powerClickBtn) {
            powerClickBtn.addEventListener('click', () => this.buyPowerClick());
        }

        const superClickBtn = document.getElementById('buy-super-click');
        if (superClickBtn) {
            superClickBtn.addEventListener('click', () => this.buySuperClick());
        }

        const megaClickBtn = document.getElementById('buy-mega-click');
        if (megaClickBtn) {
            megaClickBtn.addEventListener('click', () => this.buyMegaClick());
        }

        const ultraClickBtn = document.getElementById('buy-ultra-click');
        if (ultraClickBtn) {
            ultraClickBtn.addEventListener('click', () => this.buyUltraClick());
        }

        // Theme switcher
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.getAttribute('data-theme');
                this.setTheme(theme);
                
                // Update active state
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Set initial active theme
        const currentTheme = this.currentTheme || 'default';
        const activeBtn = document.querySelector(`.theme-btn[data-theme="${currentTheme}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
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
        const templeBtn = document.getElementById('buy-temple');
        if (templeBtn) {
            templeBtn.addEventListener('click', () => this.buyTemple())
        }
        const bankBtn = document.getElementById('buy-bank');
        if (bankBtn) {
            bankBtn.addEventListener('click', () => this.buyBank())
        }

        const shipBtn = document.getElementById('buy-ship');
        if (shipBtn) {
            shipBtn.addEventListener('click', () => this.buyShip())
        }

        const portalBtn = document.getElementById('buy-portal');
        if (portalBtn) {
            portalBtn.addEventListener('click', () => this.buyPortal())
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
            this.power_click_count = 0;
            this.power_click_cost = 100;
            this.super_click_count = 0;
            this.super_click_cost = 1000;
            this.mega_click_count = 0;
            this.mega_click_cost = 5000;
            this.ultra_click_count = 0;
            this.ultra_click_cost = 25000;
            this.grandma_cost = 150;
            this.grandma_count = 0;
            this.goudmijn_cost = 500;
            this.goudmijn_count = 0;
            this.farm_cost = 1000;
            this.farm_count = 0;
            this.fabriek_cost = 3000;
            this.fabriek_count = 0;
            this.temple_cost = 5000;
            this.temple_count = 0;
            this.bank_cost = 10000;
            this.bank_count = 0;
            this.ship_cost = 100000;
            this.ship_count = 0;
            this.portal_cost = 1000000;
            this.portal_count = 0;
            
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

    // Basis Klik upgrade (10% increase per purchase)
    upgrade_click_power() {
        if (this.cookies >= this.click_upgrade_cost) {
            this.cookies -= this.click_upgrade_cost;
            this.click_power = Math.floor(this.click_power * 1.10 * 10) / 10; // 10% increase, rounded to 1 decimal
            this.click_upgrade_cost = Math.floor(this.click_upgrade_cost * 1.15); // 15% cost increase
            this.updateUI();
            this.saveGame();
        }
    }

    // Kracht Klik upgrade (2x multiplier)
    buyPowerClick() {
        if (this.cookies >= this.power_click_cost) {
            this.cookies -= this.power_click_cost;
            this.power_click_count++;
            this.click_power += 2;
            this.power_click_cost = Math.floor(this.power_click_cost * 2.5);
            this.updateUI();
            this.saveGame();
        }
    }

    // Super Klik upgrade (5x multiplier)
    buySuperClick() {
        if (this.cookies >= this.super_click_cost) {
            this.cookies -= this.super_click_cost;
            this.super_click_count++;
            this.click_power += 5;
            this.super_click_cost = Math.floor(this.super_click_cost * 3);
            this.updateUI();
            this.saveGame();
        }
    }

    // Mega Klik upgrade (10x multiplier)
    buyMegaClick() {
        if (this.cookies >= this.mega_click_cost) {
            this.cookies -= this.mega_click_cost;
            this.mega_click_count++;
            this.click_power += 10;
            this.mega_click_cost = Math.floor(this.mega_click_cost * 3.5);
            this.updateUI();
            this.saveGame();
        }
    }

    // Ultra Klik upgrade (20x multiplier)
    buyUltraClick() {
        if (this.cookies >= this.ultra_click_cost) {
            this.cookies -= this.ultra_click_cost;
            this.ultra_click_count++;
            this.click_power += 20;
            this.ultra_click_cost = Math.floor(this.ultra_click_cost * 4);
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
    buyTemple() {
          if (this.cookies >= this.temple_cost) {
            this.cookies -= this.temple_cost;
            this.temple_count++; 
            this.temple_cost = Math.floor(this.temple_cost * 5);
            this.cookies_per_second = this.grandma_count * 0.1 + this.goudmijn_count * 0.4 + this.farm_count * 0.6 + this.fabriek_count * 1.0 + this.temple_count * 2.0;
            this.updateUI();
            this.saveGame();
        } 
    }     
    buyBank() {
          if (this.cookies >= this.bank_cost) {
            this.cookies -= this.bank_cost;
            this.bank_count++;
            this.bank_cost = Math.floor(this.bank_cost * 6);
            this.cookies_per_second = this.grandma_count * 0.1 + this.goudmijn_count * 0.4 + this.farm_count * 0.6 + this.fabriek_count * 1.0 + this.temple_count * 2.0 + this.bank_count * 4.0;
            this.updateUI();
            this.saveGame();
        }  
    }
    buyShip() {
          if (this.cookies >= this.ship_cost) {
            this.cookies -= this.ship_cost;
            this.ship_count++;
            this.ship_cost = Math.floor(this.ship_cost * 7);
            this.cookies_per_second = this.grandma_count * 0.1 + this.goudmijn_count * 0.4 + this.farm_count * 0.6 + this.fabriek_count * 1.0 + this.temple_count * 2.0 + this.bank_count * 4.0 + this.ship_count * 8.0;
            this.updateUI();
            this.saveGame();
        }  
    }
    buyPortal() {
          if (this.cookies >= this.portal_cost) {
            this.cookies -= this.portal_cost;
            this.portal_count++;
            this.portal_cost = Math.floor(this.portal_cost * 8);
            this.cookies_per_second = this.grandma_count * 0.1 + this.goudmijn_count * 0.4 + this.farm_count * 0.6 + this.fabriek_count * 1.0 + this.temple_count * 2.0 + this.bank_count * 4.0 + this.ship_count * 8.0 + this.portal_count * 16.0;
            this.updateUI();
            this.saveGame();
        }  
    }

    saveGame() {
        const gameData = {
            cookies: this.cookies,
            click_power: this.click_power,
            cookies_per_second: this.cookies_per_second,
            click_upgrade_cost: this.click_upgrade_cost,
            power_click_count: this.power_click_count,
            power_click_cost: this.power_click_cost,
            super_click_count: this.super_click_count,
            super_click_cost: this.super_click_cost,
            mega_click_count: this.mega_click_count,
            mega_click_cost: this.mega_click_cost,
            ultra_click_count: this.ultra_click_count,
            ultra_click_cost: this.ultra_click_cost,
            grandma_cost: this.grandma_cost,
            grandma_count: this.grandma_count,
            goudmijn_cost: this.goudmijn_cost,
            goudmijn_count: this.goudmijn_count,
            farm_cost: this.farm_cost,
            farm_count: this.farm_count,
            fabriek_cost: this.fabriek_cost,
            fabriek_count: this.fabriek_count,
            temple_cost: this.temple_cost,
            temple_count: this.temple_count,
            bank_cost: this.bank_cost,
            bank_count: this.bank_count,
            ship_cost: this.ship_cost,
            ship_count: this.ship_count,
            portal_cost: this.portal_cost,
            portal_count: this.portal_count,
            currentTheme: this.currentTheme,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('cookieClickerSave', JSON.stringify(gameData));
    }

    loadGame() {
        const savedGame = localStorage.getItem('cookieClickerSave');
        const gameData = savedGame ? JSON.parse(savedGame) : null;
        if (gameData) {
            this.cookies = gameData.cookies;
            this.click_power = gameData.click_power;
            this.cookies_per_second = gameData.cookies_per_second;
            this.click_upgrade_cost = gameData.click_upgrade_cost;
            this.grandma_cost = gameData.grandma_cost;
            this.grandma_count = gameData.grandma_count;
            this.goudmijn_cost = gameData.goudmijn_cost;
            this.goudmijn_count = gameData.goudmijn_count;
            this.farm_cost = gameData.farm_cost;
            this.farm_count = gameData.farm_count;
            this.fabriek_cost = gameData.fabriek_cost;
            this.fabriek_count = gameData.fabriek_count;
            this.temple_cost = gameData.temple_cost;
            this.temple_count = gameData.temple_count;
            this.bank_cost = gameData.bank_cost;
            this.bank_count = gameData.bank_count;
            this.ship_cost = gameData.ship_cost;
            this.ship_count = gameData.ship_count;
            this.portal_cost = gameData.portal_cost;
            this.portal_count = gameData.portal_count;
            this.currentTheme = gameData.currentTheme;
            this.setTheme(this.currentTheme);
        }
        return gameData;
    }

    updateUI() {
        // Update cookie counter
        const counter = document.getElementById('counter');
        if (counter) {
            counter.textContent = Math.floor(this.cookies).toLocaleString();
        }

        // Update click power display
        const clickPower = document.getElementById('click_power');
        if (clickPower) {
            clickPower.textContent = Math.floor(this.click_power);
        }

        // Update upgrade button states and costs
        const updateButton = (buttonId, cost, countElementId = null, count = null) => {
            const button = document.getElementById(buttonId);
            if (button) {
                const costElement = button.querySelector('.cost');
                if (costElement) {
                    costElement.textContent = cost.toLocaleString();
                }
                button.disabled = this.cookies < cost;
                
                // Update count if element ID and count are provided
                if (countElementId && count !== null) {
                    const countElement = document.getElementById(countElementId);
                    if (countElement) {
                        countElement.textContent = count;
                    }
                }
            }
        };

        // Update click upgrade buttons
        updateButton('upgrade-click-btn', this.click_upgrade_cost, 'click_power', Math.floor(this.click_power));
        updateButton('buy-power-click', this.power_click_cost, 'power_click', this.power_click_count);
        updateButton('buy-super-click', this.super_click_cost, 'super_click', this.super_click_count);
        updateButton('buy-mega-click', this.mega_click_cost, 'mega_click', this.mega_click_count);
        updateButton('buy-ultra-click', this.ultra_click_cost, 'ultra_click', this.ultra_click_count);

        // Update auto-clicker buttons
        updateButton('buy-grandma', this.grandma_cost, 'grandma-count', this.grandma_count);
        updateButton('buy-goudmijn', this.goudmijn_cost, 'goudmijn-count', this.goudmijn_count);
        updateButton('buy-farm', this.farm_cost, 'farm-count', this.farm_count);
        updateButton('buy-fabriek', this.fabriek_cost, 'fabriek-count', this.fabriek_count);
        updateButton('buy-temple', this.temple_cost, 'temple-count', this.temple_count);
        updateButton('buy-bank', this.bank_cost, 'bank-count', this.bank_count);
        updateButton('buy-ship', this.ship_cost, 'ship-count', this.ship_count);
        updateButton('buy-portal', this.portal_cost, 'portal-count', this.portal_count);

        // Update cookies per second display
        const cpsDisplay = document.getElementById('cps');
        if (cpsDisplay) {
            cpsDisplay.textContent = this.cookies_per_second.toFixed(1);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});
