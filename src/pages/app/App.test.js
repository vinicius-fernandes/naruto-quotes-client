import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

const response = { content: 'testing' ,author:'testing'};

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test('renders the app,with a button and a quote',()=>{
  render(<App/>);
  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');
  const textEl = screen.getByText(/Loading quote/);

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();
  expect(textEl).toBeInTheDocument();

});


test('calls api on button click and update its text', async ()=>{
render(<App/>);

const buttonEl = screen.getByRole('button');
fireEvent.click(buttonEl);

const quoteEl = await screen.findByText(response.content);
expect(quoteEl).toBeInTheDocument();
})



test('class api on startup and redns it response',async ()=>{
render(<App/>);
const quoteEl = await screen.findByText(response.content);
expect(quoteEl).toBeInTheDocument();

})