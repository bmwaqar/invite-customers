export interface IFileWriter {
  writeLineByLine: <T>(filePath: string, data: T[]) => Promise<void>;
}
