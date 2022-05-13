class Storage {
  getFromStore(key: string, type: string) {
    try {
      const payload: string | any = window.sessionStorage?.getItem(key);
      return JSON?.parse(payload);
    } catch (err) {
      console.error('Error getting item: ', err);
      return type === 'string' ? '' : {};
    }
  }

  pushToStore(key: string, data: unknown) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('Error setting item: ', err);
      return false;
    }
  }

  deleteFromStore(key: string) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Error deleting item: ', err);
      return false;
    }
  }

  clearStorage() {
    try {
      sessionStorage.clear();
      return true;
    } catch (err) {
      console.error('Error clearing storage: ', err);
      return false;
    }
  }
}

export default new Storage();
