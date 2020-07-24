import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Wooden Chair',
    imageUrl: 'https://source.unsplash.com/random',
    uploadedAt: moment().subtract(2, 'days')
  },
  {
    id: uuid(),
    name: 'Apple Watch 5',
    imageUrl: 'https://source.unsplash.com/random',
    uploadedAt: moment().subtract(2, 'days')
  },
  {
    id: uuid(),
    name: 'Sony Speakers',
    imageUrl: 'https://source.unsplash.com/random',
    uploadedAt: moment().subtract(3, 'days')
  },
  {
    id: uuid(),
    name: 'Apple iPhone 11',
    imageUrl: 'https://source.unsplash.com/random',
    uploadedAt: moment().subtract(5, 'days')
  },
  {
    id: uuid(),
    name: 'Couch',
    imageUrl: 'https://source.unsplash.com/random',
    uploadedAt: moment().subtract(9, 'days')
  }
];
