import './App.css';
import { Container } from 'react-bootstrap';
import AppRoutes from './routes';

function App() {
  return (
    <div>
      <Container>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
