import {FormikValues} from "formik";
import * as Yup from "yup";
import {ObjectShape} from "yup/lib/object";
import {Constructor} from "../types";
import {Config, FormikOnSubmit} from "../services/form";

export const useFormConfig = <V extends FormikValues>(
  form: Constructor<V>,
  onSubmit: FormikOnSubmit<V>
) => {
  const xxx: Config<V> = Reflect.getMetadata("config", form.prototype);

  const generateInitialValue = () => {
    let result: Partial<V> = {};
    for (let field in xxx) {
      result[field] = xxx[field].value || "";
    }
    return result as V;
  };

  const generateValidationSchema = () => {
    let shape: ObjectShape = {};
    for (let field in xxx) {
      if (xxx[field]?.validation) shape[field] = xxx[field].validation!;
    }
    return Yup.object(shape);
  };

  return {
    initialValues: generateInitialValue(),
    validationSchema: generateValidationSchema(),
    onSubmit,
  };
};
