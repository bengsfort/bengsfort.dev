import { initGame } from './game';
import './dev-entry.module.css';

async function main() {
  try {
    const game = await initGame(document.body, {
      debugShowPhysicsBodies: true,
    });
    game.run();
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

main();
