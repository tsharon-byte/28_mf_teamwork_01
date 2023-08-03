type HeroSpriteOptions = SpriteOptions & {
  level: string[]
  setLevel: (value: ((prevState: string[]) => string[]) | string[]) => void
}
