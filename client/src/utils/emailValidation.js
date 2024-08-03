export const emailValidatorRule = (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
      return 'Invalid email format';
    }
    return true;
  }