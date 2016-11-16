export interface IPatient {
  hn: string,
  cid: string,
  fullname: string,
  address: string
}

export interface IService {
  vstdate: string,
  vsttime: string,
  vn: string,
  clinic: string,
  dxCode: string,
  dxName: string
}