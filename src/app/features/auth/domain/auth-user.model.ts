export interface AuthUser {
  readonly id: number
  readonly userName: string
  readonly email: string
  readonly fullName: string
  readonly role: string
  readonly projectName: string
  readonly createdDate: Date
}
