import { Product } from "@/lib/features/products/productsApiSlice"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react"
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikValues } from "formik"

import * as Yup from 'yup'

export type ProductData = Partial<Pick<Product, Exclude<keyof Product, "id">>>

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(100, 'Title limit is 100 characters'),
    price: Yup.number().required('Price is required').min(0.01, 'Price should be more than 0')
})

interface ProductFormI {
    onSubmit: (values: ProductData, formikHelpers: FormikHelpers<ProductData>) => void;
    initialValues: ProductData,
}

const ProductForm: React.FC<ProductFormI> = ({ onSubmit, initialValues }) => (<Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}>
    {({ isSubmitting, errors, isValid }) => (
        <Form style={{ width: '70%' }}>
            <Stack>
                <Field name="title" >
                    {({ field }: FieldProps<FormikValues['title']>) =>
                    (<FormControl isInvalid={!!errors?.title}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input id="title"{...field} placeholder="title" />
                        <FormErrorMessage>{errors?.title}</FormErrorMessage>
                    </FormControl>)}
                </Field>
                <Field name="price" >
                    {({ field }: FieldProps<FormikValues['price']>) =>
                    (<FormControl isInvalid={!!errors?.price}>
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <Input type="number" id="price" {...field} placeholder="price" />
                        <FormErrorMessage>{errors?.price}</FormErrorMessage>
                    </FormControl>)
                    }
                </Field>
                <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid}>Submit</Button>
            </Stack>
        </Form>)}

</Formik>)


export default ProductForm
