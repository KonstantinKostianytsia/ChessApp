import {Buffer} from 'buffer';

const convertStringToBytes = (str: string) => {
  const data = Buffer.from(str);
  return data.toJSON().data;
};

const getStringFromBytes = (data: number[]): string => {
  const buffer = Buffer.from(data);
  const str = buffer.toString('utf8');
  return str;
};

const convertStringToBase64 = (str: string) => {
  const data = Buffer.from(str);
  return data.toString('base64');
};

export default {
  convertStringToBytes,
  getStringFromBytes,
  convertStringToBase64,
};
