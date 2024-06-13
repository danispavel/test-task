"use client";
import { Product, useDeleteProductMutation, useGetProductsQuery } from "@/lib/features/products/productsApiSlice";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button, ButtonGroup, FormControl, FormLabel, Select, Stack, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination, { PRODUCTS_PER_PAGE } from "../components/pagintaion";

const columnHelper = createColumnHelper<Product>()

export default function Products() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("title");
    const [order, setOrder] = useState("asc");

    const [deleteProduct] = useDeleteProductMutation();
    const { data, isError, isLoading, isSuccess } =
        useGetProductsQuery({
            skip: currentPage * PRODUCTS_PER_PAGE,
            limit: PRODUCTS_PER_PAGE,
            select: "title,price",
            order,
            sortBy
        })
    const columns = useMemo(() => [
        columnHelper.accessor('title', {
            header: () => 'Title',
            cell: (props) => props.getValue()
        }),
        columnHelper.accessor('price', {
            header: () => 'Price',
            cell: (props) => props.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row }) => (
                <ButtonGroup spacing={4}>
                    <Button colorScheme="teal" onClick={() => router.push(`products/edit/${row.original.id}`)}>Edit</Button>
                    <Button colorScheme="red" onClick={async () => {
                        await deleteProduct(row.original.id)
                        alert(`Product deleted`)
                    }}>Delete</Button>
                </ButtonGroup>
            ),
        })
    ], [])


    const table = useReactTable({
        data: data?.products || [],
        columns,
        getCoreRowModel: getCoreRowModel()
    })



    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    if (isSuccess) {
        return (<Stack spacing={4}>
            <Link href="products/add"> <Button>Add Product</Button></Link>
            <Stack direction="row" spacing={4} align="center">
                <FormControl>
                    <FormLabel>Sort By:</FormLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="price">Price</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Order:</FormLabel>
                    <Select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </FormControl>
            </Stack>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => <Tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <Th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </Th>)}
                    </Tr>)}
                </Thead>
                <Tbody>
                    {table.getCoreRowModel().rows.map(row => <Tr key={row.id}>
                        {row.getVisibleCells().map(cell => <Th key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Th>)}
                    </Tr>)}
                </Tbody>
            </Table >
            <Pagination current={currentPage} total={Math.floor(data.total / PRODUCTS_PER_PAGE)} loadProducts={setCurrentPage} />
        </Stack>
        );
    }

    return null;
};


