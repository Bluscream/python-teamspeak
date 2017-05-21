'use babel';

import PythonTeamspeakView from './python-teamspeak-view';
import { CompositeDisposable } from 'atom';

export default {

  pythonTeamspeakView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pythonTeamspeakView = new PythonTeamspeakView(state.pythonTeamspeakViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pythonTeamspeakView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-teamspeak:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pythonTeamspeakView.destroy();
  },

  serialize() {
    return {
      pythonTeamspeakViewState: this.pythonTeamspeakView.serialize()
    };
  },

  toggle() {
    console.log('PythonTeamspeak was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
