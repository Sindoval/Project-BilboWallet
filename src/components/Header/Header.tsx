import { useSelector } from 'react-redux';
import './Header.css';
import { useEffect, useState } from 'react';
import { ReduxState } from '../../types';

type RootState = {
  user: {
    email: string,
  }
};

function Header() {
  const [expensesSum, setExpensesSum] = useState(0);
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: ReduxState) => state.wallet.expenses);

  useEffect(() => {
    const sumExpenses = () => {
      const valueExpenses = expenses.map(({ value, currency, exchangeRates }) => {
        const rate = parseFloat(exchangeRates[currency].ask);
        return Number(value) * rate;
      });
      const totalExpense = valueExpenses.reduce((acc, current) => acc + current, 0);
      setExpensesSum(Number(totalExpense.toFixed(2)));
    };

    sumExpenses();
  }, [expenses]);

  return (
    <header className="header">
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">{ expensesSum }</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
