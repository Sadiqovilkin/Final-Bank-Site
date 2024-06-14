import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  region: yup.string().required('Region is required'),
  phone: yup.string().required('Phone number is required'),
  dateofbirth: yup.date().required('Date of birth is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  image: yup.mixed().required('Image is required'),
  companyName: yup.string().required('Company name is required'),
  seniority: yup.string().required('Seniority is required'),
  gender: yup.string().required('Gender is required'),
});

export default userSchema;
