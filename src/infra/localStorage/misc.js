import LocalStorageBase from "./LocalStorageBase";

class Misc extends LocalStorageBase {
  async isFirstSession() {
    const miscData = await this.get();
    const isFirstSession = !(miscData && miscData.hasOpened);
    return isFirstSession;
  }

  updateHasOpened() {
    this.update({ hasOpened: true });
  }
}

export default new Misc("misc");
