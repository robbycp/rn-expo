import {Share} from 'react-native';
import type {ShareContent} from 'react-native';

function shareLink(content: ShareContent) {
  Share.share(content)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
}

export function shareMessage(message: string) {
  shareLink({title: 'share message', message});
}
