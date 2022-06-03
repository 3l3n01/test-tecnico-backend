import * as Moment from 'moment';

// models
import { Donations } from '../types/service/donations.dto';
import { ResponseDto } from '../types/response.dto';
import { GenericData } from '../types/genericdata.dto';

export class ProcessData {
  /**
   * method to process the data
   * @param data IDonations Data process
   * @returns
   */
  public process(data: Donations[]): ResponseDto {
    let resp: Object = new Object();
    const col: Map<String, GenericData[]> = new Map();
    for (let donation of data) {
      let obj: any = new Object();
      const year: string = Moment(donation.date).format('YYYY');
      obj[donation.organization.name] = parseInt(donation.value);
      const dataReg: { [key: string]: number } = obj;
      if (col.has(year)) {
        let dataPrev: GenericData[] = col.get(year);
        dataPrev.push(dataReg);
        col.set(year, dataPrev);
      } else {
        const reg: GenericData[] = [];
        reg.push(dataReg);
        col.set(year, reg);
      }
    }
    for (let j of col.keys()) {
      resp[j.toString()] = this.Group(col.get(j.toString()));
    }
    return resp as ResponseDto;
  }

  /**
   * Method to group elements based on their key
   * @param data IGenericData[] data group
   * @returns
   */
  public Group(data: GenericData[]): Object {
    let dataResponse: Object = new Object();
    for (let reg of data) {
      const name: string = Object.keys(reg)[0];
      if (dataResponse[name]) {
        dataResponse[name] = dataResponse[name] + reg[name];
      } else {
        dataResponse[name] = reg[name];
      }
    }
    return this.OrderData(dataResponse);
  }

  /**
   * Method to order the elements inside an object
   * @param data Object
   * @returns
   */
  public OrderData(data: Object): Object {
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  }
}
