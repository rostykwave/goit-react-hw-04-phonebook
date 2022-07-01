import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import {
  ErrorText,
  StyledInput,
  StyledForm,
  FormField,
  FormLabel,
  SubmitBtn,
} from './ContactForm.styled';
import * as yup from 'yup';

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(6).max(13).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    // console.log(actions);
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <StyledForm autoComplete="off">
        <FormField>
          <FormLabel>Name</FormLabel>
          <StyledInput
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яієїґА-ЯҐЄІЇ]+(([' -][a-zA-Zа-яієїґА-ЯҐЄІЇ ])?[a-zA-Zа-яієїґА-ЯҐЄІЇ]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            // required
          />
          <FormError name="name" />
        </FormField>

        <FormField>
          <FormLabel>Number</FormLabel>
          <StyledInput
            type="tel"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            // required
          />
          <FormError name="number" />
        </FormField>
        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </StyledForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
