import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <InputBase
      onChange={onChange}
      placeholder={placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
};
