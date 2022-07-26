'use babel';

import SobatGamingSlotView from './sobat-gaming-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  sobatGamingSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sobatGamingSlotView = new SobatGamingSlotView(state.sobatGamingSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sobatGamingSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sobat-gaming-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sobatGamingSlotView.destroy();
  },

  serialize() {
    return {
      sobatGamingSlotViewState: this.sobatGamingSlotView.serialize()
    };
  },

  toggle() {
    console.log('SobatGamingSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
