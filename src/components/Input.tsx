import {TextField, TextFieldProps} from "@mui/material";
import {FieldHookConfig, useField} from "formik";

type InputProps<V = any> = FieldHookConfig<V> & TextFieldProps;

export const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const {touched, error} = meta;

  return (
    <TextField
      variant='outlined'
      size='small'
      type='text'
      margin='dense'
      fullWidth
      {...props}
      {...field}
      error={touched && Boolean(error)}
      helperText={touched && error}
    >
      {props.children}
    </TextField>
  );
};
