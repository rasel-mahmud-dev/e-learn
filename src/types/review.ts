
export type Review = {
    id: string,
    title: string,
    summary: string,
    courserId: string,
    userId: string,
    rate: number

    avatar?: string
    username?: string
    createdAt?: string
    images?: string[]
}