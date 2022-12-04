/**
 * Check whether the path points to a `.css` file or not.
 * @param path a path to check
 * @returns `true` if the path points to a `.css` file, `false` otherwise
 */
const isCssFilePath = (path: string): boolean => /.\.css$/iu.test(path)

export { isCssFilePath }
