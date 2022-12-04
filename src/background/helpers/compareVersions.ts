/**
 * Compare two version represented as a string.
 * The version can be either a single number or follow semantic versioning (version numbers separated by ".")
 *
 * It removes '≤' since in our context only the max version matters.
 * @param versionA first version to compare
 * @param versionB second version to compare
 * @returns a number equal to:
 * * 1 if the first version is greater than the second one.
 * * -1 if the first version is lower than the second one.
 * * 0 if the two version are equal.
 */
const compareVersions = (versionA: string, versionB: string) => {
  const splittedVersionA = versionA
    .replace('≤', '')
    .split('.')
    .map(Number.parseInt)
  const splittedVersionB = versionB
    .replace('≤', '')
    .split('.')
    .map(Number.parseInt)

  for (let index = 0; index < splittedVersionA.length; index++) {
    if (splittedVersionA[index] > splittedVersionB[index]) return 1
    if (splittedVersionA[index] < splittedVersionB[index]) return -1
  }

  if (splittedVersionA.length > splittedVersionB.length) return 1
  if (splittedVersionA.length < splittedVersionB.length) return -1

  return 0
}

export { compareVersions }
