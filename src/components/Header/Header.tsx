import { useSelector } from 'react-redux';
import './Header.css';
import { useEffect, useState } from 'react';
import { ReduxState } from '../../types';
import pngMoney from '../../images/money-management.png';

type RootState = {
  user: {
    email: string,
  }
};

function Header() {
  const [expensesSum, setExpensesSum] = useState<number | '0.00'>(0);
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: ReduxState) => state.wallet.expenses);

  useEffect(() => {
    const sumExpenses = () => {
      if (expenses.length === 0) {
        setExpensesSum('0.00');
      } else {
        const valueExpenses = expenses.map(({ value, currency, exchangeRates }) => {
          const rate = parseFloat(exchangeRates[currency].ask);
          return Number(value) * rate;
        });

        const totalExpense = valueExpenses.reduce((acc, current) => acc + current, 0);
        setExpensesSum(Number(totalExpense.toFixed(2)));
      }
    };

    sumExpenses();
  }, [expenses]);

  return (
    <header className="header">
      <div>
        <p><img src={ pngMoney }/>Bilbo<span className="wallet-word">Wallet</span></p>
      </div>
      <div className="details">
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">Despesa Total: { expensesSum }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

export default Header;
