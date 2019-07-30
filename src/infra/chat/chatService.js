// import { StreamChat } from 'stream-chat';
// import config from '/config';
// import { apiCommand } from '/redux/apiCommands/actions';
// import { setClient, updateUnreadChats } from '/redux/inbox/actions';
// import { get, isNil } from '/infra/utils';

// class ChatService {
//   async init(userId) {
//     const clientUserId = get(this.streamClient, 'user.id');
//     if (!this.streamClient) {
//       this._setClient();
//     }
//     if (userId && clientUserId !== userId) {
//       await this._setUser(userId);
//       this._updateUnreadCount();
//       this._watchUnreadCount();
//     }
//   }

//   resetUser = async () => {
//     if (this.streamClient) {
//       await this.streamClient.disconnect();
//     }
//   };

//   getParticipant({ channel, ownUserId }) {
//     const membersObj = get(channel, 'state.members', {});
//     const participantId = Object.keys(membersObj).filter((id) => id !== ownUserId)[0];
//     const participant = get(membersObj, `[${participantId}].user`, null);
//     return participant;
//   }

//   async getClient(forceInit) {
//     if (forceInit || !this.streamClient) {
//       await this.init();
//     }
//     global.store.dispatch(setClient({ client: this.streamClient }));
//     return this.streamClient;
//   }

//   async getChannelOrCreate(participantId) {
//     await this._ensureClientReady();
//     let channel = await this._getChannel(participantId);
//     if (!channel) {
//       channel = await this._createChannel(participantId);
//     }
//     return channel;
//   }

//   async _getChannel(participantId) {
//     const filters = { type: 'messaging', members: { $in: [participantId] } };
//     const sort = { last_message_at: -1 };
//     const options = { subscribe: true, presence: true };
//     const channels = await this.streamClient.queryChannels(filters, sort, options);
//     return channels && channels[0];
//   }

//   async _createChannel(participantId) {
//     const userId = ChatService._getUserId();
//     const channel = this.streamClient.channel('messaging', { members: [participantId, userId] });
//     await channel.watch();
//     return channel;
//   }

//   _updateUnreadCount() {
//     const unreadChats = get(this.streamClient, 'user.unread_channels');
//     if (!isNil(unreadChats)) {
//       global.store.dispatch(updateUnreadChats({ unreadChats }));
//     }
//   }

//   _watchUnreadCount() {
//     this.streamClient.on((event) => {
//       if (!isNil(event.unread_channels)) {
//         global.store.dispatch(updateUnreadChats({ unreadChats: event.unread_channels }));
//       }
//     });
//   }

//   _setClient() {
//     if (!this.streamClient) {
//       const options = { timeout: 6000 };
//       this.streamClient = new StreamChat(config.providers.stream.apiKey, {}, options);
//     }
//     global.store.dispatch(setClient({ client: this.streamClient }));
//   }

//   async _setUser(userId = ChatService._getUserId()) {
//     if (this.streamClient.userID && this.streamClient.userID !== userId) {
//       await this.resetUser();
//     }
//     if (!this.streamClient.userID && !this.isSettingClient) {
//       this.isSettingClient = true;
//       const res = await global.store.dispatch(apiCommand('inbox.getIdentityToken', {}));
//       const identityToken = get(res, 'data.data.identity_token');
//       await this.streamClient.setUser(
//         {
//           id: userId
//         },
//         identityToken
//       );
//       this.isSettingClient = false;
//     }
//   }

//   async _ensureClientReady() {
//     if (!this.isEnsuringClient && !this.streamClient) {
//       this.isEnsuringClient = true;
//       await this._init();
//       this.isEnsuringClient = false;
//     }
//   }

//   static _getUserId() {
//     const state = global.store.getState();
//     const userId = get(state, 'auth.user.id');
//     return userId;
//   }
// }

// export default new ChatService();
