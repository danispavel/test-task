import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    id: number;
    title: string;
    price: number;
}

interface ProductsApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}


interface PaginationParams {
    skip?: number;
    limit?: number;
    select?: string;
    sortBy?: string;
    order?: string;
}
export const productsApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
    reducerPath: "productsApi",
    tagTypes: ["Products"],

    endpoints: (build) => ({
        getProductById: build.query<Product, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        getProducts: build.query<ProductsApiResponse, PaginationParams>({
            query: ({ skip = 0, limit = 10, select = "title,price", sortBy = "title", order = "asc" }) =>
                `?skip=${skip}&limit=${limit}&select=${select}&sortBy=${sortBy}&order=${order}`,
            providesTags: (result, error, id) =>
                result
                    ? [...result.products.map(({ id }) => ({ type: "Products", id } as const)), { type: "Products", id: "LIST" }]
                    : [{ type: "Products", id: "LIST" }],
        }),
        addProduct: build.mutation({
            query: (newProduct) => ({
                url: 'add',
                method: 'POST',
                body: newProduct,
            })
        }),
        updateProduct: build.mutation<Product, Partial<Product> & Pick<Product, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: patch,
            }),

            invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
        }),
        deleteProduct: build.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }],
        })
    }),
});


export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useGetProductByIdQuery, useDeleteProductMutation } = productsApiSlice;
