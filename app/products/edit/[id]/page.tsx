'use client'

import ProductForm, { ProductData } from "@/app/components/productForm"
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/lib/features/products/productsApiSlice"
import { FormikHelpers } from "formik"
import { useRouter } from "next/navigation"

export default function EditProduct({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: product = {}, isLoading, isError, error } = useGetProductByIdQuery(Number(params.id));
    const [updateProduct, updateState] = useUpdateProductMutation();

    const onSubmit = async (
        values: ProductData,
        { setSubmitting }: FormikHelpers<ProductData>
    ) => {
        await updateProduct({ ...values, id: Number(params.id) })
        setSubmitting(false);
        alert('Product updated successfully!');
        router.push('/products')
    }

    if (isLoading || updateState.isLoading) return <p>Loading...</p>;

    if (isError || updateState.isError) return <p>Something went wrong</p>;


    return <ProductForm initialValues={product} onSubmit={onSubmit} />

}