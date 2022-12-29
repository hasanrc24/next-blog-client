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
    comments: CommentType
}

export interface CommentType{
    id: number;
    attributes:{
        comment : string,
        commenter: string,
        avatar: string | null
        createdAt: string
    }
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

export interface Avatar{
    data:{
        attributes:{
                avatar: string
        }
    }
}

export interface Pagination{
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

export interface Article{
    id: number,
    attributes: {
        title: string,
        body: string,
        slug: string,
        createdAt: string,
        image: Image
        author:{
            data:{
                attributes:{
                    createdAt: string,
                    email: string,
                    firstName: string,
                    lastName: string,
                    username: string,
                    avatar: string | null
                }
            }
        }
    }
}