

import { Button, ButtonGroup } from "@chakra-ui/react"

interface PaginationC {
    current: number,
    total: number,
    loadProducts: Function,
}

export const PRODUCTS_PER_PAGE = 10
const BUTTONS_MAX = 10

const Pagination: React.FC<PaginationC> = ({ current, total, loadProducts }) => {
    const buttons = []
    const startPage = Math.min(total - BUTTONS_MAX + 1, Math.max(1, current - Math.floor(BUTTONS_MAX / 2)));
    const endPage = Math.min(total, startPage + BUTTONS_MAX - 1);


    if (current > 1) {
        buttons.push(<Button key="prev" onClick={() => loadProducts(current - 1)}>Prev</Button>)
    }

    for (let i = startPage; i <= endPage; i++) {
        buttons.push(<Button colorScheme={i === current ? "teal" : "gray"} key={i} onClick={() => loadProducts(i)}>{i}</Button>)
    }

    if (current < total) {
        buttons.push(<Button key="next" onClick={() => loadProducts(current + 1)}>Next</Button>)
    }


    return <ButtonGroup>{buttons}</ButtonGroup>
}

export default Pagination

