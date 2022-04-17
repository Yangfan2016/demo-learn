import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Task } from './features/Task';
import { List } from './features/List';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // refetchOnMount: false
      // cacheTime: 60 * 1e3
    }
  }
});
// @ts-ignore
window.qc = queryClient;
function App() {
  const [key, setKey] = useState('1');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header"
        //  onClick={() => setKey(`1-${Math.random()}`)}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <Task key={key} />
          <List />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
