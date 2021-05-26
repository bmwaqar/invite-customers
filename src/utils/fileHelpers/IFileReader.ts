export interface IFileReader {
  readLineByLine(path: string): Promise<string[] | undefined>;
}
