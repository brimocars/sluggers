export async function connectManager(managerName, password) {
  try {
    const url = '/manager/connect';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ managerName, password }),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(`Error connecting player: ${err}`);
    return false;
  }
}

export async function getAllPlayers() {
  try {
    const url = '/data/players';
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`Error getting all players: ${err}`);
  }
}

export async function draftPlayer(playerName, managerName) {
  try {
    const url = '/draft';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName, managerName }),
    });
  } catch (err) {
    console.log(`Error drafting player: ${err}`);
  }
}

export async function startDraft() {
  try {
    const url = '/draft/start';
    await fetch(url, {
      method: 'POST',
    });
  } catch (err) {
    console.log(`Error starting draft: ${err}`);
  }
}

export async function clearManagers() {
  try {
    const url = '/manager/all';
    await fetch(url, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(`Error starting draft: ${err}`);
  }
}
