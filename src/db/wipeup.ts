export function deleteIndexedDB(name: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name);

    request.onerror = (event: any) => {
      reject(`Error deleting database: ${event.target.error}`);
    };

    request.onsuccess = (event: any) => {
      resolve(`Database "${name}" successfully deleted`);
    };
  });
}