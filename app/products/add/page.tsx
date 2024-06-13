'use client'

import ProductForm, { ProductData } from "@/app/components/productForm"
import { useAddProductMutation } from "@/lib/features/products/productsApiSlice"
import { FormikHelpers } from "formik"
import { useRouter } from "next/navigation"

const initialValues = { price: 0, title: '' }

export default function AddProduct() {
    const router = useRouter()
    const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

    const onSubmit = async (
        values: ProductData,
        { setSubmitting }: FormikHelpers<ProductData>
    ) => {
        await addProduct(values)
        setSubmitting(false);
        alert('Product added successfully!');
        router.push('/products')
    }

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error: {(error as Error).message}</p>;


    return <ProductForm initialValues={initialValues} onSubmit={onSubmit} />

}