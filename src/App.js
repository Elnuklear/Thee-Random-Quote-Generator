import './App.css';
import React from 'react';

const initialQuotes = [
  {
    author: 'Akinkunle Akinlua',
    quote: '"Find peace in work."',
    id: 0,
  }
  ,
  {
    author: 'Bruce Lee',
    quote: '"Art reaches its greatest peak when devoid of self-consciousness. Freedom discovers man the moment he loses concern over what impression he is making or about to make."',
    id: 1,
  },
  {
    author: 'Carl Sagan',
    quote: '"Knowing a great deal is not the same as being smart; intelligence is not information alone but also judgement, the manner in which information is collected and used."',
    id: 2,
  },
  {
    author: 'Xi Zhi',
    quote: '"Large skepticism leads to large understanding. Small skepticism leads to small understanding. No skepticism leads to no understanding."',
    id: 3,
  },
  {
    author: 'Dean Schlicter',
    quote: '"Go down deep enough into anything and you will find mathematics."',
    id: 4,
  },
  {
    author: 'Mary Curie',
    quote: '"Nothing in this world is to be feared... only understood"',
    id: 5,
  },
  {
    author: 'Henry David',
    quote: '"No way of thinking or doing, however ancient, can be trusted without proof."',
    id: 6,
  },
  {
    author: 'Marcus Aurelius',
    quote: '"It is all for the best."',
    id: 7,
  }
];

const quotesReducer = (state, action) => {
  switch (action.type) {
    case 'QUOTE_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
      case 'QUOTE_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
      case 'QUOTE_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
    throw new Error();
  }
};

const getAsyncQuotes = () =>
new Promise( (resolve) => 
  setTimeout(
    () => resolve({ data: { quotes: initialQuotes[Math.floor(Math.random()*initialQuotes.length)] } }),
    500
  )
);

function App() {
  const [quotes, dispatchQuote] = React.useReducer(quotesReducer, 
    { data: [], isLoading: false, isError: false }
  );
    
  console.log('here at the top of App');

  React.useEffect(() => {
    dispatchQuote({ type: 'QUOTE_FETCH_INIT' });

    getAsyncQuotes()
    .then(({data: { quotes }}) => {
      console.log('here @ getAsyncQuotes', quotes);
      dispatchQuote({
        type: 'QUOTE_FETCH_SUCCESS',
        payload: quotes
      });
    })
    .catch(() => 
      dispatchQuote({ type: 'QUOTE_FETCH_FAILURE' }));
  }, []);

  const QuoteGenerator = ({ quote }) => {
    const QuoteButton = () => (
    <div>
        <button
          id="new-quote"
          type="button"
        >
          <a href="placeapiaddress">New Quote</a>
        </button>
    </div>
    );

      return (
      <div>
        <form>
          <blockquote 
            id="text"
            value={quotes.data.quote}
            key={quotes.data.id}
          >
            {quote}
          </blockquote>
          <div 
            id='author'
            rel={quotes.data.author}
          >
            <p>{quotes.data.author}</p>
          </div>
          <QuoteButton />
          <div>
            <button
              type='submit'
            >
            <a 
            href="twitter.com/intent/tweet"
            id='tweet-quote' 
            target="_blank"          
            >Tweet</a>
            </button>
          </div>
          </form>
      </div>
  )};
  
  return (
    <div id="quote-box">
      <h1>Thee Random Quote Generator</h1>
      <hr />
      {quotes.isError && <p>Something went wrong</p>}

      {quotes.isLoading ? (
        <p>Loading...</p>
      ) : (
        <QuoteGenerator
          rel={quotes.data.author}
        quote={quotes.data.quote}
        >
        </ QuoteGenerator>
      )}      
    </div>
  );
};

export default App;
