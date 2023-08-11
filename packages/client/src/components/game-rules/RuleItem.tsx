import { Box, Paper, Typography } from '@mui/material'
import './GameRules.css'

type RuleItemType = {
  image: string
  alt: string
  title: string
  id: string
}

type RuleItemProps = {
  item: RuleItemType
}
const RuleItem = ({ item }: RuleItemProps) => {
  return (
    <Box className="row" component="li">
      <Paper className="paper">
        <Box
          component="img"
          className="poster"
          alt={item.alt}
          src={item.image}
        />
      </Paper>
      <Typography gutterBottom>{item.title}</Typography>
    </Box>
  )
}
export default RuleItem
