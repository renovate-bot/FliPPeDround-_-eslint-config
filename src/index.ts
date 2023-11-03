import type { OptionsConfig as AntfuOptionsConfig, ConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { uni } from './config'
import { isPackageExists } from 'local-pkg'

type OptionsConfigOverrides = AntfuOptionsConfig['overrides'] & {
  uni?: ConfigItem['rules']
}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean
  overrides?: OptionsConfigOverrides
}

export function uniHelper(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
  const {
    uni: enableUni = true,
    overrides = {},
  } = options

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest')
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages')
  options.ignores = options.ignores || []

  if (ignoreManifestJSON) {
    options.ignores.push('**/manifest.json')
  }
  if (ignorePagesJSON) {
    options.ignores.push('**/pages.json')
  }

  if (enableUni) {
    userConfigs.unshift(uni({
      overrides: overrides.uni,
    }))
  }

  return antfu(options, ...userConfigs)
}

export default uniHelper
