type HeroSpriteOptions = SpriteOptions & {
  setLevel: (value: ((prevState: string[]) => string[]) | string[]) => void
  successCallback: () => void
  gameOverCallback: () => void
}
