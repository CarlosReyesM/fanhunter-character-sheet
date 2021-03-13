const { api } = window;

class backEnd {
  async getUserPref() {
    const prefs = await api.send(
      'SELECT * FROM PREFERENCIAS WHERE PREFERENCIAS_ID = 1;',
    )
      .then((result) => result)
      .catch((err) => console.log(err));
    const [pref] = prefs || [];
    return pref;
  }
}

export default new backEnd();
