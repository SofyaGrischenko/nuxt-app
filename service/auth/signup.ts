import { useApolloClient, useMutation, provideApolloClient } from '@vue/apollo-composable'
import { SIGN_UP } from '@/graphql/users/users.mutations.gql'
import type { AuthInput } from '~/types/user.types'

export const handleSignup = async (auth: AuthInput) => {
  const { client } = useApolloClient()
  provideApolloClient(client)

  const { mutate } = useMutation(SIGN_UP)
  const result = await mutate({ auth })

  return result?.data?.signup ?? null
}