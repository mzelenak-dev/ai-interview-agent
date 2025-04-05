import React from 'react'
import {
  FormControl,
  // FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  required: boolean;
  type?: 'text' | 'email' | 'password' | 'file';
}

const FormField = ({ control, name, label, required, placeholder, type='text' }: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    // required={required}
    render={({ field}) => (
      <FormItem>
        <FormLabel>{ label }</FormLabel>
        <FormControl>
          <Input
            {...field}
            type={type}
            className='input'
            placeholder={ placeholder }
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  ></Controller>
)

export default FormField