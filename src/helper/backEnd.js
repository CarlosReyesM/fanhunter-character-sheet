import send from './renderer';

class backEnd {
  async getUserPref() {
    const prefs = await send(
      'SELECT * FROM PREFERENCIAS WHERE PREFERENCIAS_ID = 1;',
    )
      .then((result) => result)
      .catch((err) => console.log(err));
    const [pref] = prefs || [];
    return pref;
  }
}

export default new backEnd();
