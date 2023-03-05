import { AppConfig, AuthOptions } from '@stacks/connect'

export const appConfig = new AppConfig(['store_write', 'publish_data'])

export const appDetails: AuthOptions['appDetails'] = {
  name: 'Stacks-Share Prototype',
  icon: 'https://polybox.ethz.ch/index.php/s/FUxdzZcYLr5sMvJ/download',
}

export const microstacksPerSTX = 1_000_000
