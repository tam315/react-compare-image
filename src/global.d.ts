// Storyでpngファイルをimportするところでエラーが出るので
declare module '*.png' {
  const src: string
  export default src
}
