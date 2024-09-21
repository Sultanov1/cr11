import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import Header from './components/Header/Header.tsx';
import ItemsPage from './features/items/itemPage.tsx';
import ItemPage from './features/items/itemPage.tsx';

const App = () => {
    return (
      <>
        <CssBaseline />
        <header>
          <Header />
        </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<ItemsPage />} />
              <Route path="/items/:id" element={<ItemPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Container>
        </main>
      </>
    );
};

export default App;