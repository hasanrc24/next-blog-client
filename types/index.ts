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

export interface Image{
    data:{
        id: number,
        attributes: {
            url: string,
            formats:{
                small: {
                    url: string
                }
            }
        }
    }
}

export interface Article{
    id: number,
    attributes: {
        title: string,
        body: string,
        slug: string,
        createdAt: string,
        image: Image
    }
}