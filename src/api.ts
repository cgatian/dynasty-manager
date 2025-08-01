import type { Player } from './types';

const bin = '688cd7b27b4b8670d8ab0b7a';
const key = '$2a$10$I486EoGwUmftVM/wiw9xWOKWy.WyDELvn173NU8BFSzmYgsxBe0Om';

export const getPlayers = async (): Promise<Player[]> => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${bin}/latest`, {
    headers: { 'X-Access-Key': key },
  });
  const data = await res.json();
  return data.record.players;
};

export const updatePlayers = async (updatedPlayers: Player[]) => {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${bin}`, {
    method: 'PUT',
    headers: { 'X-Access-Key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ players: updatedPlayers }),
  });
  const data = await res.json();
  return data.record.players;
};
