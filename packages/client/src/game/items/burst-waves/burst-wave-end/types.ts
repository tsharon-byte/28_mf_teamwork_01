export enum BurstWaveEndAction {
    BoomUp = 'BoomUp',
    BoomDown = 'BoomDown',
    BoomLeft = 'BoomLeft',
    BoomRight = 'BoomRight'
}

export type TBurstWaveEndAction = keyof typeof BurstWaveEndAction
