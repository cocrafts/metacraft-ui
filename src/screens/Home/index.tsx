import { FC } from 'react'
import { Text, View } from 'react-native'

export const HomeScreen: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Metacraft UI</Text>
      <Text>Still too early to have something to show.. but this going to be fun!</Text>
    </View>
  )
}

export default HomeScreen
