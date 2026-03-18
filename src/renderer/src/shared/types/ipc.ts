export interface IpcApi {
  app: {
    getVersion(): Promise<string>
    getPlatform(): Promise<string>
    getHomePath(): Promise<string>
  }
  shell: {
    openInBrowser(url: string): Promise<void>
    revealInExplorer(path: string): Promise<void>
  }
}
