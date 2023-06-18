//@ts-nocheck
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Selector } from './Selector';
import { fetchBreeds } from './App';
import { breeds } from './breeds';

describe('Selector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders Selector component', () => {
    render(
      <Selector
        id="breed-selector"
        selectorLabel="Hunderase"
        placeholder="Velg hunderase"
      />
    );
    const breedSelector = screen.getAllByText(/Hunderase/i);
    expect(breedSelector[0]).toBeInTheDocument();
    expect(breedSelector[1]).toBeInTheDocument();
  });

  it('should have a list of options if provided as prop', async () => {
    render(
      <Selector
        id="breed-selector"
        placeholder="Velg hunderase"
        selectorLabel="Hunderase"
        prefetchedOptions={[
          { label: 'Affenpinscher', value: 1 },
          { label: 'Afghan Hound', value: 2 }
        ]}
      />
    );
    const selectorForm = screen.getByTestId('selector-test');
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = selectorForm.firstChild?.nextSibling;
    fireEvent.keyDown(selectInput, { keyCode: 40 });
    const option = await screen.findByText('Affenpinscher');
    expect(option).toBeInTheDocument();
  });

  it('should fetch options if no selectOptions provided', async () => {
    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(breeds)
      })
    ) as jest.Mock;

    global.fetch = mockedFetch;
    render(
      <Selector
        id="breed-selector"
        placeholder="Velg hunderase"
        selectorLabel="Hunderase"
        fetchOptions={fetchBreeds}
      />
    );
    const loadingIndicator = screen.getByText(/Loading.../i);
    await waitFor(() => expect(loadingIndicator).not.toBeInTheDocument());
    const selectorForm = screen.getByTestId('selector-test');
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = selectorForm.firstChild?.nextSibling;
    fireEvent.keyDown(selectInput, { keyCode: 40 });
    const option = await screen.findByText('Affenpinscher');
    expect(option).toBeInTheDocument();
  });
});
