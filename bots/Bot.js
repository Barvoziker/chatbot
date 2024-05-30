import { displayMessage } from '../components/ui.js';

export class Bot {
    constructor(name, actions, image) {
        this.name = name;
        this.actions = actions;
        this.image = image;
    }

    processMessage(message) {
        const [command, ...args] = message.split(' ');
        const action = this.actions[command];

        if (action) {
            const response = action(args.join(' '));
            if (response instanceof Promise) {
                response.then(res => displayMessage(this.name, res));
            } else {
                displayMessage(this.name, response);
            }
        }
    }
}
