class OPTDesign {
  static async getSelectedDesign() {
    const isBlackmode = await OPTStorageManager.get('blackmode');

    if (isBlackmode) {
      $('#maincontainer').css('background', 'red');
    }
  }

  static async setBlackmode() {
    console.log('change to black mode!');

    const isBlackmode = await OPTStorageManager.get('blackmode');

    if (isBlackmode !== undefined) {
      console.log('change blackmode: ', isBlackmode);
      // if set already turn from true to false or vice versa
      OPTStorageManager.save('blackmode', !isBlackmode);
    } else {
      console.log('set to blackmode for first time!');
      OPTStorageManager.save('blackmode', true);
    }
  }
}
