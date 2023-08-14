import { Box } from '@mui/material'
import RuleItem from './RuleItem'
import { gameRulesArray } from './constants'
import './GameRules.css'

const GameRules = () => {
  return (
    <Box className="game-rules" component="ul">
      {gameRulesArray.map(item => (
        <RuleItem item={item} key={item.id} />
      ))}
    </Box>
  )
}
export default GameRules
