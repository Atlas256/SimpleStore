
export type TType = {
    _id: string
    title: string
    slug: string
}

export type TTag = {
    _id: string
    title: string
    slug: string
    typeID: string
}

export type TCategoryData = {
    _id: string
    title: string
    slug: string
}


export type TSidebarData = {
    type: TType
    tags: TTag[]
}

export type TPropduct = {
    _id: string,
    tagsID: string[],
    title: string,
    price: number,
    discount: number,
    image: string,
    slug: string,
    description: string,
    createdDate: string,
    updatedDate: string,
}

