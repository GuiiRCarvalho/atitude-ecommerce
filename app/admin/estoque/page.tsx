import ProdutoTable from '../../../components/admin/ProdutoTable';
import ProdutoForm from '../../../components/admin/ProdutoForm';

export default function EstoquePage() {
  return (
    <div>
      <h2>Gestão de Estoque</h2>
      <ProdutoForm />
      <ProdutoTable />
    </div>
  );
}
