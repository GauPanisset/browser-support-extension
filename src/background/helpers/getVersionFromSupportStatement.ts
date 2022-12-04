import type { SupportStatement, VersionValue } from '@mdn/browser-compat-data'

import { compareVersions } from './compareVersions'

/**
 * Retrieve the oldest version from a given support statement of compatibility data.
 *
 * If a prefix is specified, it keeps the version with the prefix only if the last version is greater.
 * @param supportStatement base support statement
 * @param prefix prefix of the property linked to the support statement
 * @returns the browser oldest version at which the property is supported.
 */
const getVersionFromSupportStatement = (
  supportStatement: SupportStatement,
  prefix = ''
): VersionValue => {
  if (Array.isArray(supportStatement)) {
    const supportStatementWithPrefix = supportStatement.find(
      (statement) => statement?.prefix === prefix
    )
    const lastSupportStatement = supportStatement[0]
    const lastVersion = lastSupportStatement.version_added

    if (supportStatementWithPrefix) {
      const versionWithPrefix = supportStatementWithPrefix.version_added

      if (typeof versionWithPrefix === 'string') {
        if (typeof lastVersion === 'string') {
          const versionCompare = compareVersions(versionWithPrefix, lastVersion)

          return (
            versionCompare === -1 ? versionWithPrefix : lastVersion
          ) as VersionValue
        } else return versionWithPrefix
      } else {
        return lastVersion
      }
    } else {
      return lastVersion
    }
  } else {
    return supportStatement.version_added
  }
}

export { getVersionFromSupportStatement }
