import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import Table from '../../components/Table/Table';
import './Wallet.css';

function Wallet() {
  return (
    <div className="wallet">
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}

export default Wallet;
