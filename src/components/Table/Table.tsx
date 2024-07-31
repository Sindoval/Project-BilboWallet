import { useSelector } from 'react-redux';
import './Table.css';
import { ReduxState } from '../../types';

function Table() {
  const rootState = useSelector((state: ReduxState) => state.wallet.expenses);

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
                <td>botão</td>
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
