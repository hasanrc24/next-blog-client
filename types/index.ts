export interface Category{
    id: number,
    attributes: {
        title: string,
        slug: string
    }
}

export interface CategoryMeta{
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

export interface CollectionTypes<T>{
    data: T,
    meta: CategoryMeta
}