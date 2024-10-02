import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEdit, fetchCoins, sendExpense } from '../../redux/actions';
import { Dispatch, ReduxState, ExpensesTypeForm } from '../../types';
import fetchAllCoins from '../../utils';
import './WalletForm.css';

function WalletForm() {
  const [expense, setExpense] = useState<ExpensesTypeForm>({
    id: 0,
    value: '0',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  });
  const [idControl, setIdControl] = useState(1);
  const dispatch: Dispatch = useDispatch();
  const rootState = useSelector((state: ReduxState) => state); // Estado global

  useEffect(() => { // Responsável por carregar o select de moedas
    const initialFetch = async () => {
      dispatch(fetchCoins());
    };
    initialFetch();
  }, []);

  useEffect(() => { // Responsável pelo edit
    const { wallet: { expenseEdit } } = rootState;

    if (expenseEdit) {
      setExpense({
        id: expenseEdit.id,
        value: expenseEdit.value,
        description: expenseEdit.description,
        currency: expenseEdit.currency,
        method: expenseEdit.method,
        tag: expenseEdit.tag,
        exchangeRates: expenseEdit.exchangeRates,
      });
    } else {
      setExpense({
        id: rootState.wallet.expenses.length,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      });
    }
  }, [rootState.wallet.editor]);

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target: { value, name } } = event;
    setExpense({ ...expense, [name]: value });
  };

  const buttonAdd = async () => {
    const data = await fetchAllCoins();
    dispatch(sendExpense({ ...expense, exchangeRates: data }));
    setExpense({ ...expense, id: idControl, value: '', description: '' });
    setIdControl(idControl + 1);
  };

  const buttonEdit = () => {
    dispatch(sendExpense(expense));
    dispatch(confirmEdit());
  };

  return (
    <div className="wallet-form">
      <label htmlFor="value">Valor: </label>
      <input
        type="number"
        name="value"
        id="value"
        value={ expense.value }
        data-testid="value-input"
        onChange={ handleChange }
      />

      <label htmlFor="currency">Moeda: </label>
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        value={ expense.currency }
        onChange={ handleChange }
      >
        {
          rootState.wallet.currencies.map((coin) => (
            <option key={ coin } value={ coin }>{ coin }</option>
          ))
        }
      </select>

      <label htmlFor="method">Método de pagamento</label>
      <select
        name="method"
        id="method"
        data-testid="method-input"
        value={ expense.method }
        onChange={ handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>

      <label htmlFor="tag">Categoria</label>
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        value={ expense.tag }
        onChange={ handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>

      <label htmlFor="description">Descrição</label>
      <input
        type="text"
        id="description"
        name="description"
        data-testid="description-input"
        value={ expense.description }
        onChange={ handleChange }
      />
      { rootState.wallet.editor ? (
        <button
          onClick={ buttonEdit }
          className="btn btn-warning"
        >
          Editar despesa
        </button>
      ) : (
        <button
          onClick={ buttonAdd }
          className="btn btn-primary"
        >
          Adicionar despesa
        </button>
      )}
    </div>
  );
}

export default WalletForm;
