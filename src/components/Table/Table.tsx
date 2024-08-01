import { useDispatch, useSelector } from 'react-redux';
import './Table.css';
import { ReduxState } from '../../types';
import { deleteExpense, editExpense } from '../../redux/actions';

function Table() {
  const rootState = useSelector((state: ReduxState) => state.wallet.expenses);
  const dispatch = useDispatch();

  const buttonDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const buttonName = target.name;
    console.log(buttonName);

    const filterState = rootState.filter((expense) => (
      expense.id !== Number(buttonName)
    ));
    dispatch(deleteExpense(filterState));
  };

  const buttonEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const buttonName = Number(target.name);
    dispatch(editExpense(buttonName));
  };

  return (
    <div className="div-table">
      <table>
        <thead>
          <tr className="table">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {rootState.map((expense) => {
            const { name, ask } = expense.exchangeRates[expense.currency];
            const convTotal = (Number(expense.value) * Number(ask)).toFixed(2);
            return (
              <tr className="table" key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ name }</td>
                <td>{ Number(ask).toFixed(2) }</td>
                <td>{ convTotal }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    name={ String(expense.id) }
                    onClick={ buttonEdit }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    name={ String(expense.id) }
                    onClick={ buttonDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default Table;
