import { displayMessage } from '../components/ui.js';

export class Bot {
    constructor(name, actions) {
        this.name = name;
        this.actions = actions;
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
        } else {
            displayMessage(this.name, 'Command not recognized.');
        }
    }
}
