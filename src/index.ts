import { get } from 'config';
import { debug } from 'debug';
import { getCustomersIn100KmRangeOfDublin } from './getCustomers';
import { inputFileName, outputFileName } from './utils/constants';
import FileProcessor from './utils/fileHelpers/FileProcessor';
import { error, log } from './utils/logger';
import { RawCustomerMap } from './utils/types';
const debugOptions = get('debug') as string;

debugOptions && debug.enable(`${debugOptions}`);

const moduleName = 'AppStart';
const logger = { log: log.extend(moduleName), error: error.extend(moduleName) };
(async () => {
  try {
    logger.error('test');
    logger.log({ inputFileName, outputFileName });
    const fileProcessor = new FileProcessor();
    const rawData: string[] | undefined = await fileProcessor.readLineByLine(fileProcessor.filePath(inputFileName));
    logger.log({ rawData });
    if (!rawData) return;
    const customers: RawCustomerMap = getCustomersIn100KmRangeOfDublin(rawData);
    console.log(customers);
    fileProcessor.writeLineByLine(fileProcessor.filePath(outputFileName), Object.values(customers));
  } catch (err) {
    logger.error(err);
    throw err;
  }
})();
