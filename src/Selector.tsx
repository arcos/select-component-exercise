import { useEffect, useState } from 'react';
import Select from 'react-select';

export type SelectOption = {
  label: string;
  value: string;
};

const subLabel = (subLabel: string) => ({
  ':after': {
    color: 'rgba(0,0,0,0.5)',
    content: '"' + subLabel + '"',
    fontFamily: 'Lato, sans-serif',
    fontSize: '16px',
    paddingTop: '4px',
    display: 'block',
    height: '20px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
});

export const Selector = ({
  id,
  selectorLabel = 'Select an option',
  placeholder,
  fetchOptions,
  prefetchedOptions
}: {
  id?: string;
  selectorLabel?: string;
  placeholder?: string;
  fetchOptions?: () => Promise<SelectOption[]>;
  prefetchedOptions?: SelectOption[];
}) => {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>(
    prefetchedOptions || []
  );
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);

  useEffect(() => {
    const getSelectOptions = async () => {
      if (fetchOptions && !prefetchedOptions) {
        setIsFetchingOptions(true);
        const fetchedOptions = await fetchOptions();
        setSelectOptions(fetchedOptions);
        setIsFetchingOptions(false);
      }
    };

    getSelectOptions();
  }, [prefetchedOptions, fetchOptions]);
  return (
    <div id={id} data-testid="selector-test">
      <label
        style={{
          textAlign: 'left',
          marginLeft: '8px',
          fontSize: '16px',
          fontFamily: 'Lato, sans-serif'
        }}
        htmlFor={`${id}-input`}
      >
        {selectorLabel}
      </label>
      {isFetchingOptions && <div>Loading...</div>}
      <Select
        styles={{
          input: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '20px'
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? '#B7FAAC' : 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: '16px',
            boxShadow: 'none',
            marginTop: '8px'
          }),
          menuList: (baseStyles, state) => ({
            ...baseStyles,
            color: 'black'
          }),
          indicatorSeparator: () => ({
            display: 'none'
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            ...subLabel(state.data.value),
            backgroundColor: state.isFocused ? '#B7FAAC' : 'white',
            color: 'black'
          })
        }}
        aria-label={selectorLabel}
        placeholder={placeholder}
        isLoading={isFetchingOptions}
        options={selectOptions}
        inputId={`${id}-input`}
      ></Select>
    </div>
  );
};
