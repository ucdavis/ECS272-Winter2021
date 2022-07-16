import './App.css';

import StreamGraph from './components/stream-graph/StreamGraph';

function App() {
  return (
    <div className='App'>
      <h3>What Kinds of Animes People Like to Watch?</h3>
      <div id='container'>
        <StreamGraph />
      </div>
    </div>
  );
}

export default App;
