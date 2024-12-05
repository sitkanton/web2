class FinancialCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <style>
                label {
                    display: block;
                    margin-bottom: 5px;
                }
                input {
                    margin-bottom: 10px;
                    width: 100%;
                }
                .result {
                    margin-top: 20px;
                }
            </style>
            <label for="loanAmount">Сумма кредита:</label>
            <input type="number" id="loanAmount" required>
            
            <label for="interestRate">Процентная ставка:</label>
            <input type="number" id="interestRate" required>
            
            <label for="term">Срок кредита (в месяцах):</label>
            <input type="number" id="term" required>
            
            <div class="result">
                <p id="monthlyPayment">Ежемесячный платеж: 0</p>
                <p id="totalPayment">Общая сумма: 0</p>
                <p id="totalInterest">Общий процент: 0</p>
            </div>
        `;
        
        this.loanAmountInput = this.shadowRoot.querySelector('#loanAmount');
        this.interestRateInput = this.shadowRoot.querySelector('#interestRate');
        this.termInput = this.shadowRoot.querySelector('#term');

        this.loanAmountInput.addEventListener('input', () => this.calculate());
        this.interestRateInput.addEventListener('input', () => this.calculate());
        this.termInput.addEventListener('input', () => this.calculate());
    }

    connectedCallback() {
        console.log('Компонент создан');
    }

    disconnectedCallback() {
        console.log('Компонент удален');
    }

    calculate() {
        const loanAmount = parseFloat(this.loanAmountInput.value);
        const interestRate = parseFloat(this.interestRateInput.value) / 100 / 12;
        const term = parseFloat(this.termInput.value);
        
        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(term) || term <= 0) {
            this.displayResults(0, 0, 0);
            return;
        }

        const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -term));
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - loanAmount;
        
        this.displayResults(monthlyPayment.toFixed(2), totalPayment.toFixed(2), totalInterest.toFixed(2));
        
        console.log('Данные обновлены');
    }

    displayResults(monthly, total, interest) {
        this.shadowRoot.querySelector('#monthlyPayment').textContent = `Ежемесячный платеж: ${monthly}`;
        this.shadowRoot.querySelector('#totalPayment').textContent = `Общая сумма: ${total}`;
        this.shadowRoot.querySelector('#totalInterest').textContent = `Общий процент: ${interest}`;
    }
}

customElements.define('financial-calculator', FinancialCalculator);
