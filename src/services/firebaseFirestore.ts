// import firestore from '@react-native-firebase/firestore';
// import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// class firestore {
//   constructor() {
//     return Promise.resolve(this)
//   }
// }
namespace FirebaseFirestoreTypes {
  export type DocumentSnapshot = {
    data: () => void
  }
  export type DocumentData = {
    id: string
  }
}
const firestore = () => {
  class FirestoreInstance {
    constructor() {
      return this
    }
    data = () => {}
    collection(collectionName: string) {
      console.log('collectionName', collectionName)
      return this
    }
    doc(docId: string) {
      console.log('docId', docId)
      return this
    }
    get() {
      return this
    }
    add(newData: unknown) {
      console.log('newData', newData)
      return this
    }
    set(setData: unknown, options: unknown) {
      console.log('setData', setData)
      console.log('options', options)
      return this
    }
    update(updateData: unknown) {
      console.log('updateData', updateData)
      return this
    }
    delete() {
      return this
    }
  }
  return new FirestoreInstance()
}
export interface FirestoreData<T>
  extends Omit<FirebaseFirestoreTypes.DocumentSnapshot, 'data'> {
  data: () => T | undefined;
}
export default class FirestoreModel<
  T extends FirebaseFirestoreTypes.DocumentData,
> {
  public model: string;
  public data: T;

  constructor(modelName: string, data: T) {
    this.model = modelName;
    this.data = data;
    this.getDataById = this.getDataById.bind(this);
    this.createData = this.createData.bind(this);
    this.createDataById = this.createDataById.bind(this);
    this.updateData = this.updateData.bind(this);
    this.removeData = this.removeData.bind(this);
  }
  async getDataById(id: string) {
    try {
      const userData = (await firestore()
        .collection(this.model)
        .doc(id.trim())
        .get()) as FirestoreData<T>;
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async createData(newData: Omit<T, 'id'>) {
    try {
      const createdData = await firestore().collection(this.model).add(newData);
      return createdData;
    } catch (error) {
      throw error;
    }
  }

  async createDataById(newData: T) {
    try {
      const {id, ...otherData} = newData;
      await firestore()
        .collection(this.model)
        .doc(id)
        .set(otherData, {merge: true});
      return newData;
    } catch (error) {
      throw error;
    }
  }

  async updateData(newData: T) {
    try {
      const {id, ...otherData} = newData;
      await firestore().collection(this.model).doc(id).update(otherData);
      return newData;
    } catch (error) {
      throw error;
    }
  }

  async removeData(id: string) {
    await firestore().collection(this.model).doc(id).delete();
  }
}
