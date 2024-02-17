export interface Title {
    id: string | null
    primaryImage: PrimaryImage | null
    titleText: string | null
}

export interface PrimaryImage {
    id: string
    url: string
    width: number
    height: number
}