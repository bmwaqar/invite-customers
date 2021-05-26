import { once } from 'events';
import { createReadStream, createWriteStream } from 'fs';
import { access, open } from 'fs/promises';
import path from 'path';
import { createInterface } from 'readline';
import { ioFolder } from '../constants';
import { error } from '../logger';
import { IFileHelper } from './IFileHelper';
import { IFileReader } from './IFileReader';
import { IFileWriter } from './IFileWriter';

export default class FileProcessor implements IFileReader, IFileWriter, IFileHelper {
  public filePath = (fileName: string) => path.resolve(ioFolder, fileName);
  public exists = async (path: string) => {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  };

  public readLineByLine = async (filePath: string) => {
    try {
      const exist = await this.exists(filePath);
      if (!exist) return undefined;
      return await (async function processLineByLine() {
        const rawData: string[] = [];
        try {
          const rl = createInterface({
            input: createReadStream(filePath),
            crlfDelay: Infinity,
          });

          rl.on('line', (line) => {
            rawData.push(line);
            // const customer: Customer | undefined = validateDataToBeCustomer(line);
            // if (customer && customerInUnder100KmOfDublin(customer)) {
            //   rawData[customer.user_id] = customer;
            // }
          });

          await once(rl, 'close');
          return rawData;
        } catch (err) {
          error(err);
          throw err;
        }
      })();
    } catch (error) {
      error(error);
      throw error;
    }
  };

  public writeLineByLine = async <T>(filePath: string, data: T[]) => {
    try {
      const exist = await this.exists(filePath);
      if (!exist) await open(filePath, 'w');
      const output = createWriteStream(filePath);
      data?.forEach((customer) => {
        output.write(JSON.stringify(customer) + '\n', 'utf-8', (err) => {
          if (err) {
            error({ customer, err });
            throw err;
          }
        });
      });
      output.end();
    } catch (error) {
      error(error);
      throw error;
    }
  };
}
