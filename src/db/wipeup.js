"use client"

export function deleteIndexedDB(name) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name);

    request.onerror = (event) => {
      reject(`Error deleting database: ${event.target.error}`);
    };

    request.onsuccess = (event) => {
      resolve(`Database "${name}" successfully deleted`);
    };
  });
}