export interface CreatePostDto {
  title: string
  summary: string
  content: string
  image: string | File
  userId: string
}