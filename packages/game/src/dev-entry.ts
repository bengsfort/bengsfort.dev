import { initGame, runGame } from './game';
import './dev-entry.module.css';

async function main() {
  try {
    const el = await initGame();
    document.body.appendChild(el);
    runGame();
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

main();
