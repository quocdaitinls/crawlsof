import {FormikConfig, FormikValues} from "formik";
import "reflect-metadata";
import {AnySchema} from "yup";

export function Form<T extends {new (...args: any[]): {}}>(constructor: T) {
  const config = Reflect.getMetadata("config", constructor.prototype);
}

type FieldConfigExtra = {
  label?: string;
  required?: boolean;
};

type FieldConfig = {
  value: any;
  validation?: AnySchema;
  error?: string;
  touched?: boolean;
} & FieldConfigExtra;

export type Config<V extends FormikValues> = {
  [field in keyof V]: FieldConfig;
};

export function Field(fieldConfig: FieldConfig) {
  return <V extends FormikValues>(target: V, propertyKey: string) => {
    const config: Config<typeof target> =
      Reflect.getMetadata("config", target) || {};
    Reflect.defineMetadata(
      "config",
      {...config, [propertyKey]: fieldConfig},
      target
    );
  };
}

export type FormikOnSubmit<V> = FormikConfig<V>["onSubmit"];
