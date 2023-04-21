import * as yup from "yup";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export type FieldValidation = {
  validation: RequiredStringSchema<string | undefined, AnyObject>;
};

type FieldSchemaMap<T> = {
  [P in keyof T]: FieldValidation;
};

const createValidation = <T extends FieldSchemaMap<T>>(fieldSchemaMap: T) => {
  const schema = yup.object().shape(
    Object.entries(fieldSchemaMap).reduce((acc, [fieldName, fieldSchema]) => {
      const schema = fieldSchema as FieldValidation;

      return {
        ...acc,
        [fieldName]: schema.validation,
      };
    }, {} as { [key in keyof T]: yup.StringSchema<string> })
  );

  return <T,>(values: T) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return [undefined];
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return err.inner.reduce(
          (acc: { field: string; message: string }[], validationError) => {
            acc.push({
              field: validationError.path || "unknown",
              message: validationError.message || "유효하지 않은 값입니다.",
            });

            return acc;
          },
          []
        );
      }

      throw err;
    }
  };
};

export default createValidation;
