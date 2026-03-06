export type Roles = {
    admin: boolean
    business: boolean
    manager: boolean
    warehouse_staff: boolean
}

export type UserData = {
    fullname: string
    email: string
    avatar: string
    contact_number: number
    roles: Roles
}

export type Product = {
    id: number
    name: string
    sku: string
    description: string
    unit_of_measure: string
    barcode: string
    cost_price: string
    selling_price: string
    image: string
    stock: number
    created_at: string
    updated_at: string
    category: string
    owner: number
    status: string
}

export type Category = {
    id: number
    name: string
    description: string
}

export type Warehouse = {
    id: number
    name: string
    company: number
    created_at: string
}

export type Section = {
    id: number
    name: string
    warehouse: string
    created_at: string
}

export type Staff = {
    id: number
    name: string
    company: number
    warehouse: number
    sections: number
    is_confirmed: boolean
    user: UserData
}
