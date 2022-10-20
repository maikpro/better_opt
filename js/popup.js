$(document).ready(function () {
  main();
});

async function main() {
  displayCurrentFolge();
  //displayFolgenList();
  updateFolgenlistFromServer();

  //update Folgenliste
  //$("#reload").click(updateFolgenlist);
  $('#reload').click(updateFolgenlistFromServer);

  //after Folge select
  $('#folgenList').change(function () {
    //console.log($(this).val());
    const folgeNr = $(this).val();
    chrome.tabs.create({
      url: 'https://onepiece-tube.com/folge/' + folgeNr,
    });
  });

  // Change Design
  $('#design').click(changeDesign);
}

async function displayCurrentFolge() {
  const currentFolge = await OPTStorageManager.get('currentFolge');
  $('#currentFolgeLink').attr(
    'href',
    'https://onepiece-tube.com/folge/' + currentFolge
  );
  $('#currentFolge').text(currentFolge);

  //previous
  $('#previousFolgeLink').attr(
    'href',
    'https://onepiece-tube.com/folge/' + (parseInt(currentFolge, 10) - 1)
  );

  //next
  $('#nextFolgeLink').attr(
    'href',
    'https://onepiece-tube.com/folge/' + (parseInt(currentFolge, 10) + 1)
  );
}

async function displayFolgenList() {
  const folgenList = await OPTStorageManager.getLocal('folgenList');

  let options = folgenList
    .map((folge) => {
      //markiere Fillerfolgen
      if (folge.isFiller) {
        return `<option class=filler value=${folge.nr}>!! ${folge.nr} - ${folge.name}</option>`;
      }

      return `<option value=${folge.nr}>${folge.nr} - ${folge.name}</option>`;
    })
    .join('\n');

  $('#folgenList').html(options);

  const currentFolge = await OPTStorageManager.get('currentFolge');
  $('#folgenList').val(currentFolge);
}

function updateFolgenlist() {
  chrome.tabs.create({
    url: 'https://onepiece-tube.com/episoden-streams',
  });
}

// Update through REST API
async function updateFolgenlistFromServer() {
  const folgenList = await OPTStorageManager.setFolgenFromServer();
  console.log(folgenList);

  let options = folgenList
    .map((folge) => {
      //markiere Fillerfolgen
      if (folge.isFiller) {
        return `<option class=filler value=${folge.nr}>🔴 ${folge.nr} - ${folge.name}</option>`;
      }

      return `<option value=${folge.nr}>${folge.nr} - ${folge.name}</option>`;
    })
    .join('\n');

  $('#folgenList').html(options);

  const currentFolge = await OPTStorageManager.get('currentFolge');
  $('#folgenList').val(currentFolge);
}

async function changeDesign() {
  await OPTDesign.setBlackmode();
}
