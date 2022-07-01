import PropTypes from 'prop-types';
import { FilterField, FilterInput, FilterLabel } from './Filter.styled';

export const Filter = ({ value, onChange }) => (
  <FilterField>
    <FilterLabel>Find contacts by name</FilterLabel>
    <FilterInput type="text" value={value} onChange={onChange} />
  </FilterField>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
