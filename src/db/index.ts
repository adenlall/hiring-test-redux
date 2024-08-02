// src/utils/indexedDB.ts

const DB_NAME = 'misc';
const DB_VERSION = 2; // Ensure this matches your version
const STORE_NAME = 'files';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const saveImage = async (file: any): Promise<string> => {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    
    const uuid = crypto.randomUUID();

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(file.buffer, uuid);

    request.onsuccess = () => {
      resolve(uuid);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = () => {
      console.log('Transaction not opened due to error: ' + transaction.error);
    };

    transaction.onabort = () => {
      console.log('Transaction aborted: ' + transaction.error);
    };
  });
};

export const getImage = async (fileName: string): Promise<Blob | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(fileName);
    

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      console.log('Transaction completed: database read finished.');
    };

    transaction.onerror = () => {
      console.log('Transaction not opened due to error: ' + transaction.error);
    };

    transaction.onabort = () => {
      console.log('Transaction aborted: ' + transaction.error);
    };
  });
};
