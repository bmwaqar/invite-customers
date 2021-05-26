import { outputCustomers, rawCustomersData } from '../../mockData/customersMockData';
import {
  corruptFilPath,
  emptyFilPath,
  inputFilePath,
  outputFilePath,
  wrongInputFilePath,
  wrongOutputFilePath,
} from '../../mockData/filesMockData';
import FileProcessor from '../FileProcessor';
describe('FileProcessor', () => {
  let fileProcessor: FileProcessor;
  beforeEach(() => {
    fileProcessor = new FileProcessor();
  });
  describe('exists', () => {
    it('should exist', () => {
      return expect(fileProcessor.exists(inputFilePath)).resolves.toBe(true);
    });
    it('should not exist', () => {
      return expect(fileProcessor.exists(wrongInputFilePath)).resolves.toBe(false);
    });
  });
  describe('readLineByLine', () => {
    it(`should match snapshot of raw data in file ${inputFilePath}`, () => {
      return expect(fileProcessor.readLineByLine(inputFilePath)).resolves.toMatchSnapshot();
    });
    it(`should contain some data in file ${inputFilePath}`, () => {
      return expect(fileProcessor.readLineByLine(inputFilePath)).resolves.toMatchObject(rawCustomersData);
    });
    it(`should not contain some data in file ${wrongInputFilePath}`, () => {
      return expect(fileProcessor.readLineByLine(wrongInputFilePath)).resolves.not.toBeDefined();
    });
    it(`should contain no data in file ${emptyFilPath}`, () => {
      return expect(fileProcessor.readLineByLine(emptyFilPath)).resolves.toMatchObject([]);
    });
    it(`should match snapshot of corrupt data in file ${corruptFilPath}`, () => {
      return expect(fileProcessor.readLineByLine(corruptFilPath)).resolves.toMatchSnapshot();
    });
  });

  describe('writeLineByLine', () => {
    const customers = Object.values(outputCustomers);
    it(`should write customers to file at ${outputFilePath}`, () => {
      return expect(fileProcessor.writeLineByLine(outputFilePath, customers)).resolves.toBeUndefined();
    });
    it(`should not write customers to file with ${wrongOutputFilePath}`, () => {
      return expect(fileProcessor.writeLineByLine(wrongOutputFilePath, customers)).resolves.toBeUndefined();
    });
  });
});

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});

it('should be true', () => {
  expect(true).toBeTruthy();
});
